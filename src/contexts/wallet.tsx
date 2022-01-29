import {
  MessageSignerWalletAdapterProps,
  SignerWalletAdapter,
  SignerWalletAdapterProps,
  WalletAdapterProps,
  WalletNotConnectedError,
} from '@solana/wallet-adapter-base';
import {
  useWallet as useWalletBase,
} from '@solana/wallet-adapter-react';
import {
  Wallet,
  WalletName,
} from '@solana/wallet-adapter-wallets';
import {
  createContext,
  useContext,
} from 'react';

export interface WalletContextState extends WalletAdapterProps {
  wallets: Wallet[];
  autoConnect: boolean;

  wallet: Wallet | null;
  adapter: SignerWalletAdapter | MessageSignerWalletAdapterProps | null;
  disconnecting: boolean;

  select(walletName: WalletName): void;

  signTransaction: SignerWalletAdapterProps['signTransaction'];
  signAllTransactions: SignerWalletAdapterProps['signAllTransactions'];

  signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined;
}

export function useWallet(): WalletContextState {
  return useWalletBase() as WalletContextState;
}

export { SignerWalletAdapter, WalletNotConnectedError };

export type WalletSigner = Pick<
  SignerWalletAdapter,
  'publicKey' | 'signTransaction' | 'signAllTransactions'
>;

export interface WalletModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const WalletModalContext = createContext<WalletModalContextState>(
  {} as WalletModalContextState,
);

export function useWalletModal(): WalletModalContextState {
  return useContext(WalletModalContext);
}
