import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Image, Col, Spinner, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  toggleLoad: (load) =>
    dispatch({
      type: "TOGGLE_LOADING",
      payload: load,
    }),
  populateArtists: (genre) =>
    dispatch(async (dispatch, getState) => {
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/genre/` + genre + `/artists`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let artists = await response.json();
      // console.log(artists.data);
      dispatch({
        type: "POPULATE_ARTISTS",
        payload: artists.data,
      });
    }),
});

class Home extends React.Component {
  async componentDidMount() {
    this.genreSelect(152);
  }

  genreSelect = async (genre) => {
    this.props.toggleLoad(true);
    await this.props.populateArtists(genre);
    this.props.toggleLoad(false);
  };

  render() {
    const { loading } = this.props.ui;
    return (
      <div className="Home">
        <div className="main-page row mt-5">
          {loading ? (
            <h4>
              {" "}
              <Spinner
                className="albums-wrapper mx-2 my-3"
                animation="border"
                variant="success"
              />
            </h4>
          ) : (
            <>
              <Row className="align-items-center justify-content-center genreSelect">
                <ListGroup horizontal>
                  <ListGroup.Item onClick={() => this.genreSelect(152)}>
                    Rock
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => this.genreSelect(132)}>
                    Pop
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => this.genreSelect(116)}>
                    Rap
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => this.genreSelect(129)}>
                    Jazz
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {this.props.ui.artists.artistList.map((artist, key) => (
                <Row className="albums-wrapper mx-2 my-3" key={key}>
                  <Col className="item-wrapper">
                    <Link
                      to={`/artist/${artist.id}`}
                      style={{ textDecoration: "none", color: "lightgrey" }}
                    >
                      <Image className="album-cover" src={artist.picture} />
                      <h4 className="d-flex justify-content-center mt-2 album-title">
                        {artist.name}
                      </h4>
                    </Link>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
