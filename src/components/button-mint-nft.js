import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';

import {
  WalletConnectButton,
  WalletModalButton
} from '@solana/wallet-adapter-react-ui';


import {
  Account,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram
} from "@solana/web3.js";

import {
  updateFeed
} from "@switchboard-xyz/switchboard-api";

export const ButtonMintNft = ({ children, ...props }) => {
  const { connection } = useConnection();
    const { publicKey, wallet, sendTransaction } = useWallet();
    const [copied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);

    const closeDropdown = useCallback(() => setActive(false), [setActive]);

    useEffect(() => {
        const listener = (event) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target)) return;

            closeDropdown();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);


    const onClick = useCallback(async () => {
      if (!publicKey) throw new WalletNotConnectedError();

      const intermediateKeypair = Keypair.generate();
      let intermediateAccount = new Account(intermediateKeypair.secretKey);
      console.log(intermediateKeypair.secretKey)
      let dataFeedPubkey = new PublicKey("GvNzEWX3hV9aowJbRvjw3Avnp6ynP9XKVC2SFTRCJ3fv");
      let updateAuthPubkey = new PublicKey("2LRYNyofDe8XiMpkYqKFVNTr3oDmVFjEEhMZwuoEh8BU");

      const transaction = new Transaction({feePayer: publicKey}).add(
          SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: intermediateKeypair.publicKey,
              lamports: 10000,
          })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log(`10000 lamport sent from ${publicKey} to ${intermediateKeypair.publicKey}`)

      await connection.confirmTransaction(signature, 'processed');
      console.log("Transfer processed")
      await connection.confirmTransaction(signature, 'finalized');
      console.log("Transfer finalized")

      try {
        let updateSignature = await updateFeed(
          connection,
          intermediateAccount, 
          dataFeedPubkey,
          updateAuthPubkey
        );

        console.log(`Updated feed on ${updateSignature}`)
  
      } catch (error) {
        console.error(error)
      }
  }, [publicKey, sendTransaction, connection]);

    if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>;
    if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

    return (
        <div className="my-4">
          <button onClick={onClick} type="button" className="btn btn-secondary btn-lg">Mint NFT</button><br />
        </div>
    );
};