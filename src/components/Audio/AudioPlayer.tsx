import React from "react";
import { IAudioPlayer } from "../../interfaces/Interfaces";
import "./styles.css";

const AudioPlayer: React.FC<IAudioPlayer> = ({
  audio,
  imgSrc,
  audioSrc,
  setAudioSrc,
  setCurrentImage,
  setCurrentTitle,
  setIsPlaying,
  setCurrentSongID,
  title,
  currentSongID,
}) => {
  const toggleAudio = (audioSrc: any) => {
    setCurrentImage(imgSrc);
    setCurrentTitle(title);
    setAudioSrc(audioSrc);
    audio.src = audioSrc;
    audio.play();
    setIsPlaying(true);
    setCurrentSongID(currentSongID);
  };

  return (
    <div
      data-toggle="tooltip"
      data-placement="right"
      className="myDiv"
      title={title}
    >
      <img
        className="myImage"
        width="120"
        height="120"
        src={imgSrc}
        alt=""
        onClick={() => toggleAudio(audioSrc)}
      />

      <h6 className="myHeader">{title}</h6>
    </div>
  );
};

export default AudioPlayer;
