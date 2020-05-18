import axios from 'axios'
import HmacMd5 from "crypto-js/hmac-md5";
import Base64 from "crypto-js/enc-base64";   

    async function consulta() {
        var url = "https://authservice.priaid.ch/login";
        var secret_key = "Et2m9RYz68Xid4A5N";
        var computedHash = HmacMd5(url, secret_key);
        var computedHashString = computedHash.toString(Base64);
        const username = "i5F7P_GMAIL_COM_AUT";
        return await axios({
        'method':'POST',
        'url':'https://authservice.priaid.ch/login',
        'headers': {
            'Authorization': 'Bearer i5F7P_GMAIL_COM_AUT:'+computedHashString,
        }    
        })
        .then((response)=>{
        
            return response.data
        })
       // const token = await respuesta.json();
        
    }
    

export default consulta()