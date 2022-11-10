import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/RightArrow.svg";
import AudioPlayer from "../Audio/AudioPlayer";
import { ISongListDetails } from "../../interfaces/Interfaces";
import "./styles.css";

const SongListDisplay: React.FC<ISongListDetails> = ({
  setIsPlaying,
  setCurrentImage,
  setCurrentTitle,
  setCurrentSongID,
  audio,
  setAudioSrc,
  songsList,
  songListHeader,
}) => {
  const slide = (shift: number): void => {
    scrollRef.current.scrollLeft += shift;
    setScrollX(scrollX + shift); // Updates the latest scrolled postion
  };

  const [scrollX, setScrollX] = useState<number>(0); // For detecting start scroll postion
  const scrollRef = useRef<any>(null);
  return (
    <div className="myDivMainSongList">
      <div className="myDivSongList">
        <h6 className="mySongHeader">{songListHeader}</h6>
        <hr className="hr myHr" />
        <div className="myDivSong">
          <Button onClick={() => slide(-1100)} className="myScrollBut">
            <LeftArrow />
          </Button>
          <Button onClick={() => slide(+1100)} className="myScrollBut">
            <RightArrow />
          </Button>
        </div>
      </div>
      <div ref={scrollRef} className="myDivScroll">
        {songsList[0] != null ? (
          songsList.map((audioDetails, index) => (
            <div key={index}>
              <AudioPlayer
                setAudioSrc={setAudioSrc}
                audio={audio}
                imgSrc={audioDetails?.images?.coverart}
                audioSrc={audioDetails?.hub?.actions[1].uri}
                title={audioDetails?.title}
                setCurrentTitle={setCurrentTitle}
                setCurrentImage={setCurrentImage}
                setIsPlaying={setIsPlaying}
                setCurrentSongID={setCurrentSongID}
                currentSongID={audioDetails?.key}
              />
            </div>
          ))
        ) : (
          <h4>No Songs Found...</h4>
        )}
      </div>
    </div>
  );
};

export default SongListDisplay;
