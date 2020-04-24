import HmacMd5 from "crypto-js/hmac-md5";
import Base64 from "crypto-js/enc-base64";
import axios from "axios";

var uri = "https://authservice.priaid.ch/login";
var secret_key = "g6Y2DeCo3s5BWa9c7";
var computedHash = HmacMd5(uri, secret_key);
var computedHashString = computedHash.toString(Base64);
const username ="codegroup23@gmail.com"


let respuesta = axios
  .post(" https://sandbox-authservice.priaid.ch/login", {
    URL: "login",
    method: "POST",
    headers: {
      Authorization: "Bearer " + username + ":" + computedHashString,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
export default respuesta;
