import { Injectable } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class SecurityHelperService {
  salt: Uint8Array;
  iv: Uint8Array;
  constructor() { }

  getContentEncoding(content: string) {
    let encoder = new TextEncoder();
    return encoder.encode(content);
  }

  getKeyMaterial(password: string) {
    let encoder = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    )
  }

  async encryptUsingAES(content, title): Promise<string> {
    let encoder = new TextEncoder();
    let encoded = encoder.encode(content);
    let iv = encoder.encode(title);
    let key = await window.crypto.subtle.digest({ name:"SHA-256" }, iv);
    let aeskey = await crypto.subtle.importKey(
      "raw",
      key,
      "AES-GCM",
      true,
      ["encrypt","decrypt"]
    );
    let encryptContent = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      aeskey,
      encoded
    );
    return this.ArrayBuffer2Hex(encryptContent);
  }

  async decryptUsingAES(content: string, title: string) {
    if(content !== null){
      let encoder = new TextEncoder();
      let iv = encoder.encode(title);
      let hexContent = this.Hex2ArrayBuffer(content);
      let key = await window.crypto.subtle.digest({ name:"SHA-256" }, iv);
      let aeskey = await crypto.subtle.importKey(
        "raw",
        key,
        "AES-GCM",
        true,
        ["encrypt","decrypt"]
      );
      if(hexContent !== null){
        let decryptContent = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: iv
          },
          aeskey,
          hexContent
        )
        let decoder = new TextDecoder();
        return decoder.decode(decryptContent);
      }
    }    
    return null;
  }

  getKey(keyMaterial, salt) {
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { "name": "AES-GCM", "length": 256 },
      true,
      [
        "encrypt", "decrypt"
      ]
    )
  }

  async encryptUsingPBKDF2(username: string, password: string) {
    let encode = new TextEncoder();
    this.salt = encode.encode(username);
    let keyMaterial = await this.getKeyMaterial(username);
    let key = await this.getKey(keyMaterial, this.salt);
    this.iv = encode.encode(username);
    let encoded = this.getContentEncoding(password);
    let textEncrypt = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: this.iv
      },
      key,
      encoded
    )

    return this.ArrayBuffer2Hex(textEncrypt);
  }

  async decryptUsingFBKDF2(encryptHex: string, username: string) {
    let arrayBuffer = this.Hex2ArrayBuffer(encryptHex);
    let keyMaterial = await this.getKeyMaterial(username);
    let encode = new TextEncoder();
    this.salt = encode.encode(username);
    this.iv = encode.encode(username);
    let key = await this.getKey(keyMaterial, this.salt);
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: this.iv
      },
      key,
      arrayBuffer
    );
    let encoder = new TextDecoder();
    return encoder.decode(decrypted);
  }

  ArrayBuffer2Hex(buffer): string { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }


  Hex2ArrayBuffer(hexString) {
    if(hexString !== ""){
      var typedArray = new Uint8Array(hexString.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
      }));
      return typedArray.buffer;  
    }    
    return null;      
  }
}
