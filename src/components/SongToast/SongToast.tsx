/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as AddToFavorites } from "../../assets/AddToFavorites.svg";
import { ReactComponent as RemoveFromFavorites } from "../../assets/RemoveFromFavorites.svg";
import { ReactComponent as PauseIcon } from "../../assets/PauseIcon.svg";
import { ReactComponent as PlayIcon } from "../../assets/PlayIcon.svg";
import { ReactComponent as AddIcon } from "../../assets/AddIcon.svg";
import { db } from "../../config/firebase";
import { ref, set, child, get } from "firebase/database";
import { ISongToast } from "../../interfaces/Interfaces";
import "./styles.css";

const SongToast: React.FC<ISongToast> = ({
  audioSrc,
  currentImage,
  currentTitle,
  audio,
  isPlaying,
  setIsPlaying,
  currentSongID,
  currentSongIsFav,
  setCurrentSongIsFav,
  playlists,
  setPlaylists,
}) => {
  const [openPlaylistsList, setOpenPlaylistsList] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  const dbRef = ref(db);

  async function handleAddToFavorites() {
    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const favourites = JSON.parse(data.favourites);
          const dbPlaylists = data.playlists;
          set(ref(db, "users/" + localStorage.getItem("id")), {
            playlists: dbPlaylists,
            favourites: JSON.stringify([
              ...favourites,
              {
                key: currentSongID,
                title: currentTitle,
                images: { coverart: currentImage },
                hub: { actions: ["", { uri: audioSrc }] },
              },
            ]),
          });
          setCurrentSongIsFav(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleRemoveFromFavorites() {
    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentFavorites = JSON.parse(data.favourites);
          const dbPlaylists = data.playlists;
          set(ref(db, "users/" + localStorage.getItem("id")), {
            playlists: dbPlaylists,
            favourites: JSON.stringify(
              currentFavorites.filter((song: any) => {
                return song?.key !== currentSongID;
              })
            ),
          });
          setCurrentSongIsFav(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddSongToPlaylist() {
    setOpenPlaylistsList(true);
  }

  async function handleSelectPlaylistOption(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSelectedPlaylist(e.target.value);
    const updatedPlaylists = await playlists.map((chosenPlaylist: any) => {
      if (chosenPlaylist.playlistTitle === e.target.value) {
        const uniquePlaylistTracks = chosenPlaylist.playlistTracks.filter(
          (track: any) => track.key !== currentSongID
        );

        return {
          playlistTitle: chosenPlaylist.playlistTitle,
          playlistTracks: [
            ...uniquePlaylistTracks,
            {
              key: currentSongID,
              title: currentTitle,
              images: { coverart: currentImage },
              hub: { actions: ["", { uri: audioSrc }] },
            },
          ],
        };
      }
      return chosenPlaylist;
    });

    setPlaylists(updatedPlaylists);

    await get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const favourites = data.favourites;
          set(ref(db, "users/" + localStorage.getItem("id")), {
            playlists: JSON.stringify(updatedPlaylists),
            favourites: favourites,
          });
          setOpenPlaylistsList(false);
          alert(
            `"${currentTitle}" add successfully to "${e.target.value}" playlist`
          );
          setSelectedPlaylist("");
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    //get current song is fav or not
    get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentFavorites = JSON.parse(data.favourites);
          const included = currentFavorites
            .map((song: any) => {
              if (song.key === currentSongID) {
                return true;
              }
              return false;
            })
            .includes(true);

          if (included) {
            setCurrentSongIsFav(true);
          } else {
            setCurrentSongIsFav(false);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentSongID]);

  useEffect(() => {
    //get playlists
    get(child(dbRef, `users/${localStorage.getItem("id")}`))
      .then((snapshot) => {
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
      .catch((error) => {
        console.error(error);
      });
  }, [openPlaylistsList]);

  return (
    <div>
      <div
        className={openPlaylistsList ? "myMainDivToast" : "modal fade"}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="myDivPopupCloseBut">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setOpenPlaylistsList(false);
                  setSelectedPlaylist("");
                }}
              />
            </div>
            <div className="myDivPopup">
              {playlists?.length !== 0 ? (
                <>
                  <div>
                    <h5>{`Add "${currentTitle}" to`}</h5>
                  </div>
                  <div>
                    <select
                      className="btn btn-secondary dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      value={selectedPlaylist}
                      name="playlists"
                      id="playlists"
                      onChange={async (e) => {
                        handleSelectPlaylistOption(e);
                      }}
                    >
                      <option className="myOption" disabled value="">
                        choose a playlist
                      </option>
                      {playlists?.map((playlist: any) => (
                        <option
                          className="myOption"
                          key={playlist.playlistTitle}
                          value={playlist.playlistTitle.text}
                        >
                          {playlist.playlistTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <h3>{`You have no playlists yet 🙁`}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0 end-0 p-1 myDivToastPosition">
        <div
          id="liveToast"
          className={audioSrc ? "toastDisplay" : "toast hide"}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="myDivToastSpacing">
            <div className="myDivToastLeft">
              <img
                src={currentImage}
                width="50px"
                height="50px"
                className="rounded me-2"
                alt="..."
              />
              <strong>{currentTitle}</strong>
            </div>
            <div className="myDivToastMiddle">
              {!isPlaying ? (
                <Button
                  className="toastButton"
                  onClick={() => {
                    audio.play();
                    setIsPlaying(true);
                  }}
                >
                  <PlayIcon />
                </Button>
              ) : (
                <Button
                  className="toastButton"
                  onClick={() => {
                    audio.pause();
                    setIsPlaying(false);
                  }}
                >
                  <PauseIcon />
                </Button>
              )}
            </div>
            <div className="myDivToastRight">
              {currentSongIsFav ? (
                <Button
                  className="toastButton"
                  onClick={() => {
                    handleRemoveFromFavorites();
                  }}
                >
                  <RemoveFromFavorites />
                </Button>
              ) : (
                <Button
                  className="toastButton"
                  onClick={() => {
                    handleAddToFavorites();
                  }}
                >
                  <AddToFavorites />
                </Button>
              )}

              <div>
                <Button
                  className="toastButton"
                  onClick={() => {
                    handleAddSongToPlaylist();
                  }}
                >
                  <AddIcon className="myToastAddToPlaylist" />
                  Add to a playlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongToast;
