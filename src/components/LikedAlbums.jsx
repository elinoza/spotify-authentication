import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  selectedAlbum: (album) =>
    dispatch({ type: "ADD_TO_FAVOURITE", payload: album }),
});

class LikedAlbums extends Component {
  render() {
    return (
      <Container className="mr-5">
        <Row className="LikedAlbums">
          <Col xs={12} lg={6} className="listCol">
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LikedAlbums)
);
