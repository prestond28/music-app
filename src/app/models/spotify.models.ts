export interface SpotifyTrack {
    album: {
        images: {
            height: number;
            url: string;
            width: number;
        }[];
    };
    artists: {
        name: string;
    }[];
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