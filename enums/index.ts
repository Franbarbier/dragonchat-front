export enum ROUTES {
  QR = '/qr',
  DASH = '/dash',
  PREMIUM = '/premium',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  USER_EDIT = '/user/edit',
  NEW_PASS = '/new_password',
  CANCEL = '/cancel',
  CHECKOUT = '/checkout',
  RECOVER = '/recover_password',
  SYNCING = '/syncing',
};

export enum API_ROUTES {
  WS = '/ws',
  AUTH_ME = '/auth/me',
  DISCONNECT = '/api/whatsapp/disconnect',
  SEND_MSG = '/api/whatsapp/send-message',
  CONNECT = '/api/whatsapp/connect',
  GET_QR = '/api/whatsapp/qr',
  IS_CONNECTED = '/api/whatsapp/check-user-conected?validateqr=false',
  SIGN_UP = '/api/auth/signup',
  GET_DATA = '/api/auth/me',
  LOGIN = '/api/auth/login',
  LOGOUT = '/api/auth/logout',
  UPDATE_PLAN = "/api/user/change-plan",
  SEND_MAIL = "/api/password/send-mail",
  EDIT = "/api/user/edit",
  CHECK_CODE = "/api/password/check-code",
  CHANGE_PASS = "/api/password/change-pass",
};

export enum API_PARAMS {
  VALIDATE_QR = 'validateqr',
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
  CONTACTS_CSV = '/ImportContactsEg.csv',
  MAINTENANCE = 'dragonchat_dragon_tecnico.webp',
};

export enum EVENT_KEY {
  ENTER = 'Enter',
  
};

export enum COOKIES_SETTINGS {
  NUNCA = 'nunca',
  DESP = 'desp'
  
};
