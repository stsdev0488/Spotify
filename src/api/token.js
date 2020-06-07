import {AUTH_BASE_URL, base64credentials} from '../config';

export default async () => {
  const res = await fetch(`${AUTH_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const json = await res.json();
  const newToken = json.access_token;
  return newToken;
}
