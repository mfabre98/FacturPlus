import { Injectable } from '@angular/core';
import * as forge from 'node-forge';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  // Cookies

  static getCookie(cName) {
    const name = cName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  static setCookie(cname, value) {
    const d = new Date();
    d.setTime(d.getTime() + (400 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + value + ';' + expires + ';path=/';
  }

  static deleteCookie(cname) {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }


  // Storage

  static saveStorage(key_name, value) {
    var jsonText = JSON.stringify(value);
    localStorage.setItem(key_name, jsonText);
  }

  static readStorage(key_name) {
    var value = localStorage.getItem(key_name);
    return JSON.parse(value);
  }

  static deleteStorage(key_name) {
    localStorage.removeItem(key_name);
  }

  static hashJson(json) {
    var md = forge.md.sha256.create();
    md.update(json);
    return md.digest().toHex();
  }

}
