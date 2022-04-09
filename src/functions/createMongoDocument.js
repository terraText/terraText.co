import axios from 'axios';
export default function createMongoDocument(dataObj) {
  axios
  .post(
    'https://www.terratext.co/api/transfer',
    dataObj)
  .then(function (res){
    console.log(`res: ${JSON.stringify(res)}`);
  })
  .catch(function (err) {
    console.log(`POST REQ ERROR`);
    console.log(err.response);
  })
}