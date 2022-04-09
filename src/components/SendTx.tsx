import { MsgSend, StdFee } from '@terra-money/terra.js';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import createMongoDocument from "../functions/createMongoDocument.js";

const toAddress = 'terra10mz00mpncqy5sqgmm4we9vnhs2p6jr4dl90sal';


export function SendTx() {

  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [inputAmountValue, setInputAmountValue] = useState('');
  const prevInputAmountValue = useRef('');

  const [inputContactValue, setInputContactValue] = useState('');
  const prevInputContactValue = useRef('');

  useEffect(() => {
    prevInputAmountValue.current = inputAmountValue
  }, [inputAmountValue])

  useEffect(() => {
    prevInputContactValue.current = inputContactValue
  }, [inputContactValue])

  const connectedWallet = useConnectedWallet();

  const send = useCallback(() => {
    if (!connectedWallet) {
      return;
    } 

    if (!prevInputAmountValue.current){
      alert(`Invalid send amount \n inputValue is: ${prevInputAmountValue.current}`);
      return;
    }

    setTxResult(null);
    connectedWallet
    .post({
        msgs: [
          new MsgSend(connectedWallet.walletAddress, toAddress, {
            uusd: prevInputAmountValue.current,
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        setTxResult(nextTxResult);
        const sendObj = {
          contact: prevInputContactValue.current,
          tx: nextTxResult,
          currency: "uust",
          amount: prevInputAmountValue.current,
        }
        createMongoDocument(sendObj);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError(
            'Unknown Error: ' +
              (error instanceof Error ? error.message : String(error)),
          );
        }
      });
    }, [connectedWallet]);

  return (
    <div>
      {connectedWallet?.availablePost && !txResult && !txError && (
        <>
          <input 
            type="text"
            placeholder="+1 111-222-3333"
            onChange={e => setInputContactValue(e.target.value)}
          />
          <input 
            type="text"
            placeholder="uUST amount to send"
            onChange={e => setInputAmountValue(e.target.value)}
          />
          <Button 
          onClick={send} variant="outline-dark"
          >
            Send
            </Button>
          <div>sending: {~~inputAmountValue/1000000} UST</div>
        </>
      )}
      {txResult && (
        <>
          <div>Keep the following tx for your records: {txResult.result.txhash}</div>
          <Button onClick={() => setTxResult(null)}
          variant="outline-dark">New transfer</Button>
        </>
      )}
      {txError && (
        <>
          <pre>{txError}</pre>
          <button onClick={() => setTxError(null)}>Clear Tx Error</button>
        </>
      )}

      {!connectedWallet && <p>Wallet not connected!</p>}
      {connectedWallet && !connectedWallet.availablePost && (
        <p>Can not post Tx</p>
      )}
    </div>
  );
}
