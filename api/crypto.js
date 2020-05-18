import HmacMd5 from "crypto-js/hmac-md5";
import Base64 from "crypto-js/enc-base64";
import axios from "axios";



const Autenticacion =()=>{
  var url = "https://authservice.priaid.ch/login";
  var secret_key = "Et2m9RYz68Xid4A5N";
  var computedHash = HmacMd5(url, secret_key);
  var computedHashString = computedHash.toString(Base64);
  const username = "i5F7P_GMAIL_COM_AUT";
  //console.log(computedHashString)
  //JL0xoM/RpvpPx1gr6DLZnw==
  /*const [{Token},executePut]=useAxios({
      url: 'https://authservice.priaid.ch/login',
      method: 'POST',
      headers: {
        Authorization: "Bearer " + username + ":" + computedHashString,
      }
  });*/
  /*const headers = {
    'Authorization': "Bearer " + username + ":" + computedHashString,
  }*/

  const respuesta = axios.post(url, {
    headers: {
      'Authorization': "Bearer " + username + ":" + computedHashString,
    }
  })
  
  console.log(respuesta);
  return respuesta
}

export default Autenticacion();
