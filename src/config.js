
// const HOST = "apishuttlemedia.herokuapp.com";
const HOST = `${window.location.hostname}:3333`;

export const CONFIG = {
  BASE_URL: `http://${HOST}/`,
  WS_URL: `wss://${HOST}`
};
