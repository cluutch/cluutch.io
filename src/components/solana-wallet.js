import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaWallet = (props) => {
    console.log("props");
    console.log(props);
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    // const network = WalletAdapterNetwork.Mainnet;
    const network = WalletAdapterNetwork.Devnet;


    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const { publicKey, wallet, disconnect } = useWallet();
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ network }),
    ], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                {props.button}
              </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
