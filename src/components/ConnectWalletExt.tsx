import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import Button from "react-bootstrap/Button";
import React from 'react';

export function ConnectWalletExt() {
  const {
    status,
    //network,
    //wallets,
    availableConnectTypes,
    //availableInstallTypes,
    connect,
    //install,
    disconnect,
  } = useWallet();

  const terraExtension = availableConnectTypes[1];
  return (
    <div>
      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <Button variant="outline-dark"
            key={'connect-' + terraExtension}
            onClick={() => connect(terraExtension)}
          >Connect Wallet</Button>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <Button variant="outline-dark"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
         
        )}
      </footer>
    </div>
  );
}
