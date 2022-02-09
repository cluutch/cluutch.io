import {
  Keypair,
  Connection,
  SystemProgram,
  TransactionInstruction,
  Account,
  PublicKey
} from '@solana/web3.js';

import { MintLayout, Token } from '@solana/spl-token';

import { StringPublicKey, toPublicKey } from '../utils/ids';
import { WalletSigner } from '../contexts/wallet';
import { prepPayForFilesTxn } from './prepay-for-files-txn';
import { programIds } from '../utils/ids'
import { createMint, createAssociatedTokenAccountInstruction } from './account';
import { createMetadata, Data, Creator } from './metadata';
import { sendTransactionWithRetry } from '../contexts/connection'

const RESERVED_METADATA = 'metadata.json';

// export class Data {
//   name: string;
//   symbol: string;
//   uri: string;
//   sellerFeeBasisPoints: number;
//   creators: Creator[] | null;
//   constructor(args: {
//     name: string;
//     symbol: string;
//     uri: string;
//     sellerFeeBasisPoints: number;
//     creators: Creator[] | null;
//   }) {
//     this.name = args.name;
//     this.symbol = args.symbol;
//     this.uri = args.uri;
//     this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
//     this.creators = args.creators;
//   }
// }

export const mintNFT = async (
  connection: Connection,
  wallet: WalletSigner | undefined,
  files: File[],
  metadata: {
    name: string;
    symbol: string;
    description: string;
    image: string | undefined;
    animation_url: string | undefined;
    external_url: string;
    properties: any;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
  },
): Promise<{
  metadataAccount: StringPublicKey;
} | void> => {
  console.log('mintNFT enter');
  console.log(wallet);
  console.log(wallet.publicKey);
  
  if (!wallet?.publicKey) return;

  const metadataContent = {
    name: metadata.name,
    symbol: metadata.symbol,
    description: metadata.description,
    seller_fee_basis_points: metadata.sellerFeeBasisPoints,
    image: metadata.image,
    animation_url: metadata.animation_url,
    external_url: metadata.external_url,
    properties: {
      ...metadata.properties,
      creators: metadata.creators?.map(creator => {
        return {
          address: creator.address,
          share: creator.share,
        };
      }),
    },
  };

  const realFiles: File[] = [
    ...files,
    new File([JSON.stringify(metadataContent)], RESERVED_METADATA),
  ];

  console.log("About to prepay")
  const { instructions: pushInstructions, signers: pushSigners } =
    await prepPayForFilesTxn(wallet, realFiles);
  console.log("Finished prepaying")

  const TOKEN_PROGRAM_ID = programIds().token;

  // Allocate memory for the account
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );
  // const accountRent = await connection.getMinimumBalanceForRentExemption(
  //   AccountLayout.span,
  // );

  // This owner is a temporary signer and owner of metadata we use to circumvent requesting signing
  // twice post Arweave. We store in an account (payer) and use it post-Arweave to update MD with new link
  // then give control back to the user.
  // const payer = new Account();
  const payerPublicKey = wallet.publicKey.toBase58();
  const instructions: TransactionInstruction[] = [...pushInstructions];
  const signers: Keypair[] = [...pushSigners];

  // This is only temporarily owned by wallet...transferred to program by createMasterEdition below
  const mintKey = createMint(
    instructions,
    wallet.publicKey,
    mintRent,
    0,
    // Some weird bug with phantom where it's public key doesnt mesh with data encode well
    toPublicKey(payerPublicKey),
    toPublicKey(payerPublicKey),
    signers,
  ).toBase58();
  console.log(`mint key is ${mintKey}`);
  

  const recipientKey = (
    await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        programIds().token.toBuffer(),
        toPublicKey(mintKey).toBuffer(),
      ],
      programIds().associatedToken,
    )
  )[0];
  console.log(`recipient key is ${recipientKey} `);
  

  createAssociatedTokenAccountInstruction(
    instructions,
    toPublicKey(recipientKey),
    wallet.publicKey,
    wallet.publicKey,
    toPublicKey(mintKey),
  );
  console.log(`created associated account instruction`);
  
  
// corresponds to 'metadata copy', which uses code copied from oyster/common
// the alternative is copied from the metaplex starter website
  // const metadataAccount = await createMetadata(
  //   metadata.symbol,
  //   metadata.name,
  //   ' '.repeat(64), // size of url for arweave
  //   false,
  //   toPublicKey(payerPublicKey),
  //   toPublicKey(mintKey),
  //   toPublicKey(payerPublicKey),
  //   instructions,
  //   wallet.publicKey
  // );

  const metadataData = {
    symbol: metadata.symbol,
    name: metadata.name,
    uri: ' '.repeat(64), // size of url for arweave
    sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    creators: metadata.creators,
  }
  console.log(`DATA: ${metadataData}`);
  

  const metadataAccount = await createMetadata(
    new Data(metadataData),
    payerPublicKey,
    mintKey,
    payerPublicKey,
    instructions,
    wallet.publicKey.toBase58(),
  );
  console.log(`metadata created ${metadataAccount}`);
  
  // TODO: enable when using payer account to avoid 2nd popup
  // const block = await connection.getRecentBlockhash('singleGossip');
  // instructions.push(
  //   SystemProgram.transfer({
  //     fromPubkey: wallet.publicKey,
  //     toPubkey: payerPublicKey,
  //     lamports: 0.5 * LAMPORTS_PER_SOL // block.feeCalculator.lamportsPerSignature * 3 + mintRent, // TODO
  //   }),
  // );

  const { txid } = await sendTransactionWithRetry(
    connection,
    wallet,
    instructions,
    signers,
    'single',
  );
  console.log('Sent trancsaction with retry');
  

  try {
    await connection.confirmTransaction(txid, 'max');
    console.log('Transaction confirmed');
    
  } catch {
    // ignore
  }
}