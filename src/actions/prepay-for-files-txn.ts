import {
  TransactionInstruction,
  Keypair,
  SystemProgram,
  Account
} from '@solana/web3.js';
import crypto from 'crypto';

import { calculate } from '@metaplex/arweave-cost';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import { WalletSigner } from '../contexts/wallet';
import { programIds, AR_SOL_HOLDER_ID } from '../utils/ids'

export const LAMPORT_MULTIPLIER = LAMPORTS_PER_SOL;

export const ARWEAVE_UPLOAD_ENDPOINT =
  'https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile';

export async function getAssetCostToStore(files: { size: number }[]) {
  const sizes = files.map(f => f.size);
  const result = await calculate(sizes);

  return LAMPORTS_PER_SOL * result.solana;
}


export const prepPayForFilesTxn = async (
  wallet: WalletSigner,
  files: File[]
): Promise<{
  instructions: TransactionInstruction[];
  signers: Keypair[];
}> => {
  console.log('prepPayForFilesTxn Enter');
  
  const memo = programIds().memo;

  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [];

  if (wallet.publicKey) {
    const lamports = await getAssetCostToStore(files);
    console.log(`${lamports} lamports to store ${files.length} files`)
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: AR_SOL_HOLDER_ID,
        lamports: await getAssetCostToStore(files),
      }),
    );
  }

  for (let i = 0; i < files.length; i++) {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(await files[i].text());
    const hex = hashSum.digest('hex');
    instructions.push(
      new TransactionInstruction({
        keys: [],
        programId: memo,
        data: Buffer.from(hex),
      }),
    );
  }

  return {
    instructions,
    signers,
  };
};
