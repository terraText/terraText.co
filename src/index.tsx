import React, { useState } from 'react';
import { NetworkInfo, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectWalletExt } from 'components/ConnectWalletExt';
import { ReceiveToggle } from 'components/ReceiveToggle';
import { ReceiveTx } from 'components/ReceiveTx';
import { SendTx } from 'components/SendTx';
import ReactDOM from 'react-dom';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";


const mainnet = {
  name: 'mainnet',
  chainID: 'columbus-4',
  lcd: 'https://lcd.terra.dev',
};

const testnet = {
  name: 'testnet',
  chainID: 'tequila-0004',
  lcd: 'https://tequila-lcd.terra.dev',
};

const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
};

function App() {
  const [receiveToggle, setReceiveToggle] = useState(true);
  return (
    <main className="container">
      <section id="header">
        <div>terraText</div>
        <span id="right-cluster">
          <div>
            <ReceiveToggle 
              toggle={setReceiveToggle}
              currentState={receiveToggle}
            />
          </div>
          
          <div><ConnectWalletExt />
          </div>
        </span>
      </section>
      <div className="main-container">
        {receiveToggle ? 
          <ReceiveTx />:
          <SendTx />
        }
      </div>   
    </main>
  );
}

ReactDOM.render(
  <WalletProvider
    defaultNetwork={mainnet}
    walletConnectChainIds={walletConnectChainIds}
  >
    <App />
  </WalletProvider>,
  document.getElementById('root'),
);
