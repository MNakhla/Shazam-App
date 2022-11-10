import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import SongListDisplay from "../components/SongListDisplay/SongListDisplay";
import SongToast from "../components/SongToast/SongToast";
import { IHome, ITracks } from "../interfaces/Interfaces";
import { shazam } from "../services/shazam";

const Home: React.FC<IHome> = ({
  setTab,
  tab,
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
}) => {
  const [topTracks, setTopTracks] = useState<[ITracks] | [null]>([null]);
  const [recommendationTracks, setRecommendationTracks] = useState<
    [ITracks] | [null]
  >([null]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getTracks(): Promise<void> {
    const topTracks: any = await shazam.getTopTracks();
    setTopTracks(topTracks.tracks);
    const recommendedTracks: any = await shazam.getListRecommendations();
    setRecommendationTracks(recommendedTracks.tracks);
    setIsLoading(false);
  }

  React.useEffect(() => {
    getTracks();
  }, []);

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
      ) : null}
      {playlists?.length > 0 ? (
        <div>
          <h3 className="myHeaderHomePlaylist">Playlists</h3>
          {playlists?.map((playlistObj: any, index: number) => (
            <div key={index}>
              <SongListDisplay
                setIsPlaying={setIsPlaying}
                setCurrentImage={setCurrentImage}
                setCurrentTitle={setCurrentTitle}
                setCurrentSongID={setCurrentSongID}
                audio={audio}
                setAudioSrc={setAudioSrc}
                songsList={playlistObj.playlistTracks}
                songListHeader={playlistObj.playlistTitle}
              />
            </div>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <div className="myLoadingHome">
          <Loading />
        </div>
      ) : (
        <div>
          <SongListDisplay
            setIsPlaying={setIsPlaying}
            setCurrentImage={setCurrentImage}
            setCurrentTitle={setCurrentTitle}
            setCurrentSongID={setCurrentSongID}
            audio={audio}
            setAudioSrc={setAudioSrc}
            songsList={recommendationTracks}
            songListHeader="Trending"
          />
          <SongListDisplay
            setIsPlaying={setIsPlaying}
            setCurrentImage={setCurrentImage}
            setCurrentTitle={setCurrentTitle}
            setCurrentSongID={setCurrentSongID}
            audio={audio}
            setAudioSrc={setAudioSrc}
            songsList={topTracks}
            songListHeader="Top Tracks"
          />
        </div>
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

export default Home;
