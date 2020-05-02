
const USE_GLOBAL_BY_LOCALHOST = true;
const REACT_APP_ENV =  process.env.REACT_APP_ENV;
let HOST = "apishuttlemedia.herokuapp.com";

const HTTP_PROTOCOL = `http${(REACT_APP_ENV === 'production' || USE_GLOBAL_BY_LOCALHOST) ? 's' : ''}`;
const WS_PROTOCOL = `ws${(REACT_APP_ENV === 'production' || USE_GLOBAL_BY_LOCALHOST) ? 's' : ''}`;

switch (REACT_APP_ENV) {
  case 'production':
    HOST = "apishuttlemedia.herokuapp.com";
    break;
  case 'development':
    HOST = USE_GLOBAL_BY_LOCALHOST ? "apishuttlemedia.herokuapp.com" : `${window.location.hostname}:3333`;
    break;
  case 'testing':
    HOST = "apishuttlemediatest.herokuapp.com";
    break;
  default:
    HOST = "apishuttlemedia.herokuapp.com";
}

export const CONFIG = {
  BASE_URL: `${HTTP_PROTOCOL}://${HOST}/`,
  WS_URL: `${WS_PROTOCOL}://${HOST}`
};
