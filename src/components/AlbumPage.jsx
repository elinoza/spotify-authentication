import React from "react";
import { connect } from "react-redux";
import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  toggleLoad: (load) =>
    dispatch({
      type: "TOGGLE_LOADING",
      payload: load,
    }),
  showModal: (load) =>
    dispatch({
      type: "TOGGLE_MODAL",
      payload: load,
    }),
  assignAlbum: (id) =>
    dispatch(async (dispatch, getState) => {
      const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
      const resp = await fetch(url + id, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      let album = await resp.json();
      dispatch({
        type: "ASSIGN_CURRENT_ALBUM",
        payload: album,
      });
    }),
  populateSongs: (album) =>
    dispatch({
      type: "POPULATE_SONGS",
      payload: album.tracks.data,
    }),
  addFavorite: (album) =>
    dispatch({ type: "ADD_TO_FAVOURITE", payload: album }),
  removeFavorite: (id) =>
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: id }),
  nowPlaying: (song) => dispatch({ type: "NOW_PLAYING", payload: song }),
});

class AlbumPage extends React.Component {
  state = {
    selectedSong: null,
  };

  async componentDidMount() {
    this.props.toggleLoad(true);

    await this.props.assignAlbum(this.props.match.params.id);
    await this.props.populateSongs(this.props.ui.songs.selectedAlbum);
    this.props.toggleLoad(false);
  }

  submitToPlaylist = async (index) => {};

  render() {
    const { selectedAlbum, songList } = this.props.ui.songs;

    return (
      <>
        {!this.props.ui.loading && (
          <div className="album-page">
            <Container>
              <img
                style={{ marginLeft: 100, width: 400, height: 400 }}
                src={selectedAlbum.cover_big}
                alt=""
              />

              <Row>
                {this.props.user.liked.find(
                  (album) => album.id === selectedAlbum.id
                ) ? (
                  <Button
                    style={{ marginLeft: 220 }}
                    className="btn btn-lg mt-3 mb-1 "
                    variant="danger"
                    size="small"
                    onClick={() => this.props.removeFavorite(selectedAlbum.id)}
                  >
                    Remove favorite
                  </Button>
                ) : (
                  <Button
                    style={{ marginLeft: 220 }}
                    className="btn btn-lg mt-3 mb-1 "
                    variant="success"
                    size="small"
                    onClick={() => this.props.addFavorite(selectedAlbum)}
                  >
                    Add to favorite
                  </Button>
                )}
              </Row>
            </Container>

            <div className="track-list ml-5">
              <h2 style={{ color: "white", marginBottom: 30 }}>
                {selectedAlbum.title}
              </h2>
              <ul>
                {songList.map((track, index) => (
                  <li
                    key={index}
                    onClick={() => this.props.nowPlaying(track)}
                    id="track"
                    className="d-flex justify-content-between"
                  >
                    {track.title}{" "}
                    <span>
                      <PlaylistAddIcon
                        fontSize="small"
                        onClick={() => this.props.showModal(true)}
                      />
                      {track.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Modal
              show={this.props.user.showModal}
              onHide={() => this.props.showModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Select a playlist</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.props.user.playlists.length > 0 ? (
                  this.props.user.playlists.map((playlist, index) => (
                    <strong key={index}>
                      {playlist.name}{" "}
                      <PlaylistAddIcon
                        fontSize="small"
                        onClick={() => this.submitToPlaylist(index)}
                      />
                    </strong>
                  ))
                ) : (
                  <span>You have no playlists</span>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.props.showModal(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        {this.props.ui.loading && <h1>Loading...</h1>}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
