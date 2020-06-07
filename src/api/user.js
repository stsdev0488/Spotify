import {API_BASE_URL} from '../config';

export default async (token) => {
    const res = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await res.json();
    const newToken = json.access_token;
    return json;
}
