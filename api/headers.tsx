
// const getHeaders = (authToken: string) => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authToken}`,
//   });
//   const getHeadersVersion = (authToken: string) => ({
//     "x-api-version": 1,
//     Authorization: `Bearer ${authToken}`,
//     "Content-Type": "application/json",
//   });
//   { headers: getHeaders(authToken) }
//    { headers: {
//             "x-api-version": 2,
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "multipart/form-data",
//           } }
//   { headers: { Authorization: `Bearer ${authToken}` } }
//   { headers: { Authorization: `Bearer ${authToken}` } }
//   { headers: { Authorization: `Bearer ${authToken}` } }

import { HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES } from "../enums";

//   const getHeaders = (authToken: string) => ({
//     [HTTP_HEADERS_KEYS.AUTHORIZATION]: `${HTTP_HEADERS_VALUES.BEARER} ${authToken}`,
// });
// headers: {
//                     [HTTP_HEADERS_KEYS.ACCEPT]: HTTP_HEADERS_VALUES.APLICATION_JSON,
//                     [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON,
//                 }
// headers: getHeaders(authToken) 
// headers: getHeaders(authToken) }
// headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${accessToken}`,
//                 }
// { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } }
// { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } }
// { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } }
// {
//                     headers: {
//                         "Authorization": `Bearer ${accessToken}`,
//                     }
//                 }

export const getNewHeaders = (authToken: string, content:string, api_version:number) => {
    
    let header = {}

    if (authToken) {
        header[HTTP_HEADERS_KEYS.AUTHORIZATION] = `${HTTP_HEADERS_VALUES.BEARER} ${authToken}`
    }
    if (content) {
        
        if (content == "form_data") {
            header[HTTP_HEADERS_KEYS.CONTENT_TYPE] = HTTP_HEADERS_VALUES.APLICATION_FORMDATA
        }
        // Si no es alguna de las anteriores, va json
        header[HTTP_HEADERS_KEYS.CONTENT_TYPE] = HTTP_HEADERS_VALUES.APLICATION_JSON
    }

    if (api_version){
        header[HTTP_HEADERS_KEYS.API_VERSION] = api_version
    }


    return header
    
};