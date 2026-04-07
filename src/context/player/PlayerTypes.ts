export interface SongListResponse {
    success: boolean;
    songs: Song[] | null;
}

export interface Song {
    _id: string;
    name: string;
    desc: string;
    album: string;
    image: string;
    audio: string;
    duration: string;
}

export interface AlbumListResponse {
    success: boolean;
    albums: Album[] | null;
}

export interface Album {
    _id: string;
    name: string;
    desc: string;
    bgColor: string;
    imageUrl: string;
};

export interface PlayerContextType {
    songsData: Song[];
    albumsData: Album[];
    loading: boolean;
    getSongsData: () => Promise<void>;
    getAlbumsData: () => Promise<void>;
};

 export type AlbumItemProps = {
    name: string;
    desc: string;
    id: string;
    image: string;
};

 export type SongItemProps = {
     _id: string;
     name: string;
     desc: string;
     album: string;
     image: string;
     audio: string;
     duration: string;
 };