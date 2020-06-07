import {API_BASE_URL} from '../config';

export default async ({offset, limit, q, token,}) => {
    const uri = `${API_BASE_URL}/search?type=playlist&market=BG&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}`;
    const res = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await res.json();
    if (!res.ok) {
        return [];
    }

    const {
        playlists: {
            items,
        },
    } = json;
    // const items = json.tracks.items;
    return items.map(item => ({
        id: item.id,
        title: item.name,
        imageUri: item.images[0].url,
        trackCount: item.tracks.total,
        trackHref: item.tracks.href
    }));
};
