/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Favourites from "./Favourites";
import Home from "./Home";
import Playlists from "./Playlists";
import Search from "./Search";
import { db } from "../config/firebase";
import { ref, child, get } from "firebase/database";

const Main: React.FC = () => {
  const [tab, setTab] = useState<string>("home");
  const [currentSongIsFav, setCurrentSongIsFav] = useState<boolean | undefined>(
    undefined
  );
  const [audio] = useState<HTMLAudioElement>(new Audio());
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string | undefined>("");
  const [currentImage, setCurrentImage] = useState<string | undefined>("");
  const [currentSongID, setCurrentSongID] = useState<string | undefined>("");
  const [isPlaying, setIsPlaying] = useState<boolean | undefined>(false);
  const [playlists, setPlaylists] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const dbRef = ref(db);
  async function fetchFavourites() {
    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const favourites = data.favourites
            ? JSON.parse(data.favourites)
            : favorites;
          setFavorites(favourites);
        } else {
          console.log("No data available");
        }
      })
      // .then(() => setIsLoadingFavourites(false))
      .catch((error) => {
        console.error(error);
      });
  }
  async function fetchPlaylists() {
    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentPlaylists = data.playlists
            ? JSON.parse(data.playlists)
            : playlists;
          setPlaylists(currentPlaylists);
        } else {
          console.log("No data available");
        }
      })
      // .then(() => setIsLoadingPlaylists(false))
      .catch((error) => {
        console.error(error);
      });
  }

  // fetch current favorites and playlists
  useEffect(() => {
    fetchPlaylists();
    fetchFavourites();
  }, [currentSongIsFav]);

  return (
    <div>
      {tab === "home" ? (
        <Home
          setTab={setTab}
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          audioSrc={audioSrc}
          currentTitle={currentTitle}
          currentImage={currentImage}
          currentSongID={currentSongID}
          isPlaying={isPlaying}
          currentSongIsFav={currentSongIsFav}
          setCurrentSongIsFav={setCurrentSongIsFav}
          playlists={playlists}
          setPlaylists={setPlaylists}
          favorites={favorites}
          tab={tab}
        />
      ) : tab === "search" ? (
        <Search
          setTab={setTab}
          tab={tab}
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          audioSrc={audioSrc}
          currentTitle={currentTitle}
          currentImage={currentImage}
          currentSongID={currentSongID}
          isPlaying={isPlaying}
          currentSongIsFav={currentSongIsFav}
          setCurrentSongIsFav={setCurrentSongIsFav}
          playlists={playlists}
          setPlaylists={setPlaylists}
        />
      ) : tab === "favourites" ? (
        <Favourites
          setTab={setTab}
          tab={tab}
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          audioSrc={audioSrc}
          currentTitle={currentTitle}
          currentImage={currentImage}
          currentSongID={currentSongID}
          isPlaying={isPlaying}
          currentSongIsFav={currentSongIsFav}
          setCurrentSongIsFav={setCurrentSongIsFav}
          playlists={playlists}
          setPlaylists={setPlaylists}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ) : (
        <Playlists
          setTab={setTab}
          tab={tab}
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          audioSrc={audioSrc}
          currentTitle={currentTitle}
          currentImage={currentImage}
          currentSongID={currentSongID}
          isPlaying={isPlaying}
          currentSongIsFav={currentSongIsFav}
          setCurrentSongIsFav={setCurrentSongIsFav}
          playlists={playlists}
          setPlaylists={setPlaylists}
        />
      )}
    </div>
  );
};

export default Main;
