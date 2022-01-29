import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { actions, Connection } from '@metaplex/js'

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


export const ButtonMintNft = ({ children, ...props }) => {
  // const { connection } = useConnection();
    const connection = new Connection('devnet');
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

      try {
        console.log(`Public key: ${publicKey}`);
        console.log(`Wallet: ${wallet}`);
        const res = await actions.mintNFT({connection, wallet, uri: 'https://cluutch.io', maxSupply: 1})
        console.log(`Updated feed on`)
        console.log(res.mint);
  
      } catch (error) {
        console.error(error)
      }
  }, [publicKey, wallet, connection]);

    if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>;
    if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

    return (
        <div className="my-4">
          <button onClick={onClick} type="button" className="btn btn-secondary btn-lg">Mint NFT</button><br />
        </div>
    );
};