export default async ({limit, offset, href, token,}) => {
    href = href.substring(1, href.length-1);
    href = `${href}?limit=${limit}&offset=${offset}`;
    const res = await fetch(href, {
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
       items
    } = json;
    // const items = json.tracks.items;
    return items.map(item => ({
        id: item.track.id,
        title: item.track.name,
        imageUri: item.track.album.images[0].url,
        popularity: item.track.popularity,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        duration: item.track.duration_ms
    }));
};
