const CryptoJS = require('crypto-js');

export function cryptJSON(data: string) {
  return CryptoJS.AES.encrypt(data, 'secret key 123').toString();
}

export function decryptJSON(data: string | any) {
  const bytes  = CryptoJS.AES.decrypt(data, 'secret key 123');
  const encData = bytes.toString(CryptoJS.enc.Utf8);
  return encData;
}
