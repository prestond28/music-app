export interface SpotifyTrack {
    name: string;
    id: string;
}

export interface SpotifyPlaylist {
    name: string;
    tracks: SpotifyTrack[];
    // tracks: {
    //     items: {
    //         track: SpotifyTrack;
    //     }[];
    // };
}