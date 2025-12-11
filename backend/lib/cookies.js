import { serialize } from 'cookie';

export function setRefreshTokenCookie(res, token) {
  const cookie = serialize('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/api/auth',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  res.setHeader('Set-Cookie', cookie);
}

export function clearRefreshTokenCookie(res) {
  const cookie = serialize('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/api/auth',
    sameSite: 'lax',
    expires: new Date(0),
  });
  res.setHeader('Set-Cookie', cookie);
}
