import { jwtDecode } from 'jwt-decode'

export function getToken() {
  return localStorage.getItem('token');
}

export function decodeToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    return {
      username: decodedToken.sub,
      exp: decodedToken.exp,
    };
  } catch (error) {
    return {
      username: 'no username',
      exp: 10,
    };
  }
}

export function validateToken(exp) {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const bufferSeconds = 5;
  return currentTimeInSeconds >= exp - bufferSeconds;
}
