import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { shazam } from "../services/shazam";
import SongToast from "../components/SongToast/SongToast";
import SongListDisplay from "../components/SongListDisplay/SongListDisplay";
import { Button } from "react-bootstrap";
import "./styles.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import Loading from "../components/Loading";
import { ISearch, ITracks } from "../interfaces/Interfaces";

const Search: React.FC<ISearch> = ({
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
  tab,
}) => {
  const [topTracks, setTopTracks] = React.useState<[ITracks] | [null]>([null]);
  const [searchedSongs, setSearchedSongs] = React.useState<[ITracks] | [null]>([
    null,
  ]);
  const [matchingSongs, setMatchingSongs] = useState<any>([]);
  const [searchedSongText, setSearchedSongText] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function handleSearchClicked() {
    const searchedSongs = await shazam.search(searchedSongText);
    const tracks = await searchedSongs?.tracks?.hits?.map(
      (hit: any) => hit.track
    );
    setSearchedSongs(tracks);
    setSearchedSongText("");
  }

  async function getTopTracks(): Promise<void> {
    const topTracks: any = await shazam.getTopTracks();
    setTopTracks(topTracks.tracks);
    setIsLoading(false);
  }

  React.useEffect(() => {
    getTopTracks();
  }, []);

  let timer: any; // Timer identifier
  const waitTime = 1000;

  // call shazam search api after one second
  React.useEffect(() => {
    const input = document.getElementById("inputSearch");
    input?.addEventListener("keyup", (e: any) => {
      const target = e.target as HTMLInputElement;
      const text = target.value;

      // Clear timer
      clearTimeout(timer);

      // Wait for X ms and then process the request
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(async () => {
        if (text !== "") {
          let res = await shazam.searchAutoComplete(text);
          const hints = await res?.hints?.map((hint: any) => hint.term);
          if (res) {
            setMatchingSongs(hints ? hints : []);
          }
        } else {
          setMatchingSongs([]);
        }
      }, waitTime);
    });
  }, [timer]);

  return (
    <Layout setTab={setTab} tab={tab}>
      <div className="input-group mb-3 myMainDivSearch">
        <div className="myDivTypeAhead">
          <Typeahead
            id="typeahed"
            placeholder="search..."
            onChange={(selected) => {
              setSearchedSongText(selected[0]);
            }}
            renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
              <input
                value={searchedSongText}
                placeholder="search..."
                id="inputSearch"
                style={{
                  width: "100%",
                  borderColor: "#FFB6A8",
                  borderRadius: "5px",
                }}
                {...inputProps}
                ref={(input: any) => {
                  inputRef(input);
                  referenceElementRef(input);
                }}
              />
            )}
            options={matchingSongs}
          />
        </div>

        <div>
          <Button
            disabled={searchedSongText === "" ? true : false}
            className="searchButton"
            onClick={() => {
              handleSearchClicked();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {searchedSongs[0] !== null && !isLoading ? (
        <SongListDisplay
          setIsPlaying={setIsPlaying}
          setCurrentImage={setCurrentImage}
          setCurrentTitle={setCurrentTitle}
          setCurrentSongID={setCurrentSongID}
          audio={audio}
          setAudioSrc={setAudioSrc}
          songsList={searchedSongs}
          songListHeader="Top Relevant"
        />
      ) : null}
      {!isLoading ? (
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
      ) : (
        <div className="myLoadingSearch">
          <Loading />
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

export default Search;
