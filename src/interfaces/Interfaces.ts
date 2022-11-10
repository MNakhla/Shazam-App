export interface IAudioPlayer {
    audio: HTMLAudioElement;
    imgSrc: string | undefined;
    audioSrc: string | undefined;
    setAudioSrc: (audioSrc: string) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setIsPlaying: (isPlay: boolean) => void;
    title: string | undefined;
    setCurrentSongID: (songID: string | undefined) => void;
    currentSongID: string | undefined;
}

export interface ISideBar {
    setTab: (tab: string) => void;
    tab: string;
}


export interface ILayout {
    children?: React.ReactNode | React.ReactNode[];
    setTab: (tab: string) => void;
    tab: string;
}

interface ISongList {
    images?: { coverart: string };
    hub?: {
        actions: [
            any,
            {
                uri?: string;
            }
        ];
    };
    title: string;
    key: string;
}


export interface ISongListDetails {
    setIsPlaying: (isPlay: boolean) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setCurrentSongID: (songID: string | undefined) => void;
    audio: HTMLAudioElement;
    setAudioSrc: (audioSrc: string) => void;
    songsList: [ISongList] | [null];
    songListHeader: string;
}

export interface ISongToast {
    audioSrc: string;
    currentTitle: string | undefined;
    currentImage: string | undefined;
    currentSongID: string | undefined;
    audio: HTMLAudioElement;
    isPlaying: boolean | undefined;
    setIsPlaying: (isPlay: boolean) => void;
    currentSongIsFav: boolean | undefined;
    setCurrentSongIsFav: (isFav: boolean | undefined) => void;
    playlists: any;
    setPlaylists: (playLists: any) => void;
}

export interface IPrivate {
    children: React.ReactElement<any, any> | null;
}


export interface IFavourites {
    setTab: (tab: string) => void;
    setIsPlaying: (isPlay: boolean | undefined) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setCurrentSongID: (id: string | undefined) => void;
    audio: HTMLAudioElement;
    setAudioSrc: (audioSrc: string) => void;
    audioSrc: string;
    currentTitle: string | undefined;
    currentImage: string | undefined;
    currentSongID: string | undefined;
    isPlaying: boolean | undefined;
    currentSongIsFav: boolean | undefined;
    setCurrentSongIsFav: (isFav: boolean | undefined) => void;
    playlists: any;
    setPlaylists: (playLists: any) => void;
    favorites: any;
    setFavorites: (favorites: any) => void;
    tab: string;
}


export interface IHome {
    setTab: (tab: string) => void;
    setIsPlaying: (isPlay: boolean | undefined) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setCurrentSongID: (id: string | undefined) => void;
    audio: any;
    setAudioSrc: (audioSrc: string) => void;
    audioSrc: string;
    currentTitle: string | undefined;
    currentImage: string | undefined;
    currentSongID: string | undefined;
    isPlaying: boolean | undefined;
    currentSongIsFav: boolean | undefined;
    setCurrentSongIsFav: (isFav: boolean | undefined) => void;
    playlists: any;
    setPlaylists: (playLists: any) => void;
    favorites: any;
    tab: string;
}

export interface ITracks {
    images?: { coverart: string };
    hub?: {
        actions: [
            any,
            {
                uri?: string;
            }
        ];
    };
    title: string;
    key: string;
}


export interface IPlaylists {
    setTab: (tab: string) => void;
    setIsPlaying: (isPlay: boolean | undefined) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setCurrentSongID: (id: string | undefined) => void;
    audio: HTMLAudioElement;
    setAudioSrc: (audioSrc: string) => void;
    audioSrc: string;
    currentTitle: string | undefined;
    currentImage: string | undefined;
    currentSongID: string | undefined;
    isPlaying: boolean | undefined;
    currentSongIsFav: boolean | undefined;
    setCurrentSongIsFav: (isFav: boolean | undefined) => void;
    playlists: any;
    setPlaylists: (playLists: any) => void;
    tab: string;
}



export interface ISearch {
    setTab: (tab: string) => void;
    setIsPlaying: (isPlay: boolean | undefined) => void;
    setCurrentImage: (image: string | undefined) => void;
    setCurrentTitle: (title: string | undefined) => void;
    setCurrentSongID: (id: string | undefined) => void;
    audio: any;
    setAudioSrc: (audioSrc: string) => void;
    audioSrc: string;
    currentTitle: string | undefined;
    currentImage: string | undefined;
    currentSongID: string | undefined;
    isPlaying: boolean | undefined;
    currentSongIsFav: boolean | undefined;
    setCurrentSongIsFav: (isFav: boolean | undefined) => void;
    playlists: any;
    setPlaylists: (playLists: any) => void;
    tab: string;
}