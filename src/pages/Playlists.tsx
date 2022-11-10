/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { ReactComponent as AddIcon } from "../assets/AddIcon.svg";
import SongListDisplay from "../components/SongListDisplay/SongListDisplay";
import SongToast from "../components/SongToast/SongToast";
import { db } from "../config/firebase";
import { ref, set, child, get } from "firebase/database";
import Loading from "../components/Loading";
import { IPlaylists } from "../interfaces/Interfaces";

const Playlists: React.FC<IPlaylists> = ({
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
  const [newPlaylistName, setNewPlaylistName] = useState<string | undefined>();
  const dbRef = ref(db);

  async function createNewPlaylist() {
    const newPlaylist = [
      ...playlists,

      {
        playlistTitle: newPlaylistName,
        playlistTracks: [],
      },
    ];
    const uniquePlaylists = newPlaylist.filter(
      (currentPlaylist: any, pos: any, selfPlaylist: any) => {
        return (
          selfPlaylist
            .map((mapObj: any) => mapObj["playlistTitle"].toLowerCase())
            .indexOf(currentPlaylist["playlistTitle"].toLowerCase()) === pos
        );
      }
    );

    setPlaylists(uniquePlaylists);
    setNewPlaylistName("");

    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const favourites = data.favourites;
          set(ref(db, "users/" + localStorage.getItem("id")), {
            playlists: JSON.stringify(uniquePlaylists),
            favourites: favourites,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (!playlists) return <Loading />;
  return (
    <Layout setTab={setTab} tab={tab}>
      <div>
        <div className="myDivCreatePlaylist">
          <div className="myPlaylistNameInput">
            <input
              onChange={(e: any) => {
                setNewPlaylistName(e.target.value);
              }}
              value={newPlaylistName}
              placeholder="new playlist name..."
              maxLength={10}
              type="text"
              className="form-control input"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <Button
            disabled={
              newPlaylistName === "" ||
              newPlaylistName === undefined ||
              newPlaylistName === null
            }
            className="playListButton"
            onClick={async () => {
              createNewPlaylist();
            }}
          >
            <AddIcon className="myIconCreatePlaylist" />
            Create a New playlist
          </Button>
        </div>

        {playlists?.length !== 0 ? (
          <div>
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
        ) : (
          <h2 className="myPlaylistNoRes">Create Your First Playlist Now!</h2>
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
      </div>
    </Layout>
  );
};

export default Playlists;
