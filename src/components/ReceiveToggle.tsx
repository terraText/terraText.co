import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

//export function ReceiveToggle({currentState, toggle }) {
interface Props {
  toggle: Function;
  currentState: boolean;
}
export const ReceiveToggle: React.FC<Props> = ({ toggle, currentState }) =>{



  const handleClick = () => {
    if(currentState === true) {
      toggle(false);
      return;
    }
    toggle(true);
  }

  return (
    <Button 
      variant="outline-dark"
      onClick={handleClick}
    >
      {currentState? 
        <div>Send</div>:
        <div>Receive</div>}
    </Button>
  );
}
