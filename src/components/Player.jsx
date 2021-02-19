import React from "react";
import { Image } from "react-bootstrap";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { connect } from "react-redux";
import playerIcon from "../logo/playing.png";

const mapStateToProps = (state) => state;

class Player extends React.Component {
  render() {
    return this.props.player.selectedSong ? (
      <div className="player-wrapper">
        <div className="player-left">
          <Image className="player-song-cover" src={playerIcon} alt="" />
          <div className="player-song-info ml-2 my-auto">
            <h4>{this.props.player.selectedSong.artist.name}</h4>
            <p>{this.props.player.selectedSong.title}</p>
          </div>
        </div>

        <div className="player-center">
          <ShuffleIcon className="player-icons mr-3" />
          <SkipPreviousIcon className="player-icons mr-3" />
          <PlayCircleOutlineIcon className="player-icons" />
          <SkipNextIcon className="player-icons ml-3" />
          <RepeatIcon className="player-icons ml-3" />
        </div>
        <div className="player-right">
          <Grid container spacing={2}>
            <Grid item>
              <VolumeUp className="player-icons" />
            </Grid>
            <Grid item xs>
              <Slider
                style={{ width: 170 }}
                className="player-icons"
                aria-labelledby="continuous-slider"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    ) : (
      <div>No song selected</div>
    );
  }
}

export default connect(mapStateToProps)(Player);
