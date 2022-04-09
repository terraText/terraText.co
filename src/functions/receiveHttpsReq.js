import axios from 'axios';
export default async function receiveHttpsReq(walletAdd, pin) {
  let msg = null;
  try {
    const res = await axios.put(
      'https://www.terratext.co/api/transfer',
       {
      walletAdd: walletAdd,
      pin: pin,
      memo: "",
     },{
       headers: {
         'Content-type': "application/json"
       }
     })
    
     console.log(res);
      //msg = "ERROR: An issue with...."; 
      //msg = 'Transaction failed'; 
      msg = 'Transaction success'; 
  } catch (err) {
    console.error(err);
    msg = err;
  }
  return msg;
}