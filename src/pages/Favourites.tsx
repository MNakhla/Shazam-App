import React from "react";
import Layout from "../components/Layout/Layout";
import SongListDisplay from "../components/SongListDisplay/SongListDisplay";
import SongToast from "../components/SongToast/SongToast";
import { IFavourites } from "../interfaces/Interfaces";

const Favourites: React.FC<IFavourites> = ({
  setTab,
  setIsPlaying,
  setCurrentImage,
  setCurrentTitle,
  setCurrentSongID,
  audio,
  setAudioSrc,
  audioSrc,
  currentTitle,
  currentImage,
  currentSongID,
  isPlaying,
  currentSongIsFav,
  setCurrentSongIsFav,
  playlists,
  setPlaylists,
  favorites,
  tab,
}) => {
  return (
    <Layout setTab={setTab} tab={tab}>
      {favorites?.length !== 0 ? (
        <SongListDisplay
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          songsList={favorites}
          songListHeader="Favourites"
        />
      ) : (
        <h2 className="myHeaderFav">No Favorites Yet!</h2>
      )}
      <SongToast
        audio={audio}
        audioSrc={audioSrc}
        currentTitle={currentTitle}
        currentImage={currentImage}
        currentSongID={currentSongID}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSongIsFav={currentSongIsFav}
        setCurrentSongIsFav={setCurrentSongIsFav}
        playlists={playlists}
        setPlaylists={setPlaylists}
      />
    </Layout>
  );
};

export default Favourites;
