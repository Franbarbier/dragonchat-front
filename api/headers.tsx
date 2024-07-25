

import { HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES } from "../enums";
import { getIp } from "../utils/getIp";

type IHeaders = {
    authToken?: string,
    content?:string,
    api_version?:number,
    accept?:string
}


export const getNewHeaders = ({ authToken, content, api_version, accept }: IHeaders) => {
    
    let header = {}

    header['client_ip'] = localStorage.getItem('ip') || getIp()

    if (authToken) {
        header[HTTP_HEADERS_KEYS.AUTHORIZATION] = `${HTTP_HEADERS_VALUES.BEARER} ${authToken}`
    }
    if (content) {
        
        if (content == HTTP_HEADERS_VALUES.APLICATION_FORMDATA) {
            header[HTTP_HEADERS_KEYS.CONTENT_TYPE] = HTTP_HEADERS_VALUES.APLICATION_FORMDATA
        }
        if (content == HTTP_HEADERS_VALUES.APLICATION_JSON) {
            header[HTTP_HEADERS_KEYS.CONTENT_TYPE] = HTTP_HEADERS_VALUES.APLICATION_JSON
            
        }
    }

    if (api_version){
        header[HTTP_HEADERS_KEYS.API_VERSION] = api_version
    }

    console.log(header)
    return header
    
};


export function areObjectsEqual(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    for (let key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
  
    return true;
  }