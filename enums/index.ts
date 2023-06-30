export enum ROUTES {
  QR = '/qr',
  DASH = '/dash',
  PREMIUM = '/premium',
  LOGIN = '/login',
  USER_EDIT = '/user/edit',
  NEW_PASS = '/new_password',
};

export enum API_ROUTES {
  WS = '/ws',
  AUTH_ME = '/auth/me',
  DISCONNECT = '/whatsapp/disconnect',
  SEND_MSG = '/whatsapp/send-message',
  CONNECT = '/whatsapp/connect',
  GET_QR = '/whatsapp/qr',
  IS_CONNECTED = '/whatsapp/check-user-conected',
};

export enum API_RESPONSES {
  UNAUTHORIZED = 'unauthorized',
  OK = 'ok'
};

export enum HTTP_HEADERS_KEYS {
  CONTENT_TYPE = 'Content-Type',
  ACCEPT = 'Accept',
  AUTHORIZATION = 'Authorization',
};

export enum HTTP_HEADERS_VALUES {
  APLICATION_JSON = 'application/json',
  BEARER = 'Bearer',
};
export enum MESSAGE_TYPE {
  DIFUSION = 'difusion',
  CONVERSACION = 'conversacion',
};

export enum SENDING_STATE {
  INIT = 'init',
  SENDING = 'sending',
  PAUSED = 'paused',
  FINISH = 'finish',
};

export enum STATUS {
  ERROR = 'error',
  SUCCESS = 'success',
  ALERT = 'alert',
  PENDING = 'pending'
};

export enum FILE_TYPE {
  CSV = 'text/csv',
};

export enum FILE {
  CONTACTS_CSV = '/Plantilla Ejemplo.numbers',
};

