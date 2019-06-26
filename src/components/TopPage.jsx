import React from "react";
import { Link } from "react-router-dom";
import "../styles/topPage.css";
import playImage from "../images/WMpic/16873098-active-jumping-and-dancing-young-woman-abstract-music-banner-.jpg";
import record from "../images/WMpic/4788200-turntable-loudspeakers-on-grunge-rainbow-background.jpg";
import playButton from "../images/WMpic/imageedit_8_7907633207.gif";
import recordButton from "../images/WMpic/imageedit_1_4274330351.png";

export default function ButtonBases() {
  return (
    <div className="wrapper">
      <div id="leftPic">
        <Link to="/play">
          <img
            src={playButton}
            style={{
              height: 100,
              width: 100,
              position: "absolute",
              zIndex: 1,
              left: 20,
              bottom: 20
            }}
            alt=""
          />
          <img
            style={{
              position: "absolute",
              left: 30,
              bottom: 20,
              width: 550,
              height: 500
            }}
            src={playImage}
            alt="playImage"
          />
        </Link>
      </div>

      <div id="rightPic">
        <Link to="/record">
          <img
            src={recordButton}
            style={{
              height: 120,
              width: 150,
              position: "absolute",
              zIndex: 1,
              right: "0%",
              bottom: "0%"
            }}
            alt=""
          />
          <img
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 550,
              height: 500
            }}
            src={record}
            alt="record"
          />
        </Link>
      </div>

      <p id="middleText">
        Record dance moves <br />
        to your favorite Youtube Video <br />
        and get scored{" "}
      </p>
    </div>
  );
}
