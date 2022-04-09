import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCallback, useState, useRef, useEffect } from 'react';
import { DisplayTransaction } from './DisplayTransaction';

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import receiveHttpsReq from "../functions/receiveHttpsReq.js";

export function ReceiveTx() {
  const [inputValue, setInputValue] = useState('');
  const [transactionMode, setTransactionMode] = useState('');
  const prevInputValue = useRef('');

  useEffect(() => {
    prevInputValue.current = inputValue
  }, [inputValue])

  const connectedWallet = useConnectedWallet();

  const receive = useCallback(async () => {
    setTransactionMode('processing...');
    if (!connectedWallet) {
      return;
    } 

    if (!prevInputValue.current){
      alert(`Invalid PIN \n inputValue is: ${prevInputValue.current}`);
      return;
    }

    const req: any = await receiveHttpsReq(connectedWallet?.terraAddress, prevInputValue.current);
    setTransactionMode(req);
  

    }, [connectedWallet]);
  return (
    <div>
      {connectedWallet?.availablePost && !transactionMode && (
        <>
          <input 
            type="text"
            placeholder="terraText pin"
            onChange={e => setInputValue(e.target.value)}
          />
          <Button 
            onClick={receive} 
            variant="outline-dark">
              Receive
          </Button>
        </>
      )}

      <DisplayTransaction 
        mode={transactionMode}
      />

      {!connectedWallet && <p>Wallet not connected!</p>}
      {connectedWallet && !connectedWallet.availablePost && (
        <p>Can not post Tx</p>
      )}
    </div>
  );
}
