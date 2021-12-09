import jwt from 'jsonwebtoken';

const signJWT = (
  user: any,
  callback: (error: Error | null, token: string | null) => void
): void => {
  let timeSinchEpoch = new Date().getTime();
  let expirationTime = timeSinchEpoch + Number(3600) * 100000;
  let expirationTimeInSecons = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      { id: user.id },
      'topsecret',
      {
        issuer: 'contact@firrj.me',
        algorithm: 'HS256',
        expiresIn: expirationTimeInSecons,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    callback(error, null);
  }
};

export default signJWT;
