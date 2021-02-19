import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import { connect } from "react-redux";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Link } from "react-router-dom";
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  generatePlaylist: (name) =>
    dispatch({
      type: "GENERATE_PLAYLIST",
      payload: { name: name, tracklist: [] },
    }),
  showModal: (load) =>
    dispatch({
      type: "TOGGLE_MODAL",
      payload: load,
    }),
});

class Library extends Component {
  state = {
    name: "",
  };

  submitPlaylist = async (e) => {
    e.preventDefault();
    await this.props.generatePlaylist(this.state.name);
    this.props.showModal(false);
  };

  render() {
    return (
      <Container className="main-page">
        <Row>
          <Col xs={12}>
            <h2 className="libTitle">Liked</h2>
          </Col>
        </Row>
        <Row className="w-100">
          {this.props.user &&
            this.props.user.liked.map((album, index) => (
              //   console.log(album)
              <Row className="albums-wrapper mx-2 my-3" key={index}>
                <Col className="item-wrapper">
                  <Link
                    to={`/album/${album.id}`}
                    style={{ textDecoration: "none", color: "lightgrey" }}
                  >
                    <Image className="album-cover" src={album.cover} />
                    <h4 className="d-flex justify-content-center mt-2 album-title">
                      {album.title}
                    </h4>
                  </Link>
                </Col>
              </Row>
            ))}
        </Row>
        <Row>
          <Col xs={12}>
            <h2 className="libTitle">
              Playlists{" "}
              <PlaylistAddIcon
                fontSize="large"
                className="addPlayIcon"
                onClick={() => this.props.showModal(true)}
              />
            </h2>
          </Col>
        </Row>
        <Row>
          {this.props.user.playlists.length > 0 &&
            this.props.user.playlists.map((playlist, index) => (
              <Col key={index} xs={3}>
                <Card>
                  <Card.Header>{playlist.name}</Card.Header>
                  <ul>
                    {playlist.tracklist.map((song) => (
                      <li>{song.title}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
        </Row>
        <Modal
          show={this.props.user.showModal}
          onHide={() => this.props.showModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                value={this.state.name}
                placeholder="Name of playlist"
                onChange={(e) => this.setState({ name: e.currentTarget.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.showModal(false)}
            >
              Discard
            </Button>
            <Button variant="primary" onClick={(e) => this.submitPlaylist(e)}>
              Create Playlist
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
