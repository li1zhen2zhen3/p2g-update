const TEMP_STATE_KEY = 'temp_state_key';
// const USER_INFO_KEY = 'user_Info_key';
const TOKEN_KEY = 'token_key';

export function saveState(state, key = TEMP_STATE_KEY) {
  sessionStorage.setItem(key, JSON.stringify(state));
}

export function fetchState(key = TEMP_STATE_KEY) {
  const res = JSON.parse(sessionStorage.getItem(key) || '[]');
  return res;
}

export function removeState(key = TEMP_STATE_KEY) {
  sessionStorage.removeItem(key);
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function fetchToken() {
  const res = JSON.parse(localStorage.getItem(TOKEN_KEY) || '[]');
  return res;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}