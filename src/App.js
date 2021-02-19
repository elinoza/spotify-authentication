import React from "react";
import { Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import AlbumPage from "./components/AlbumPage";
import artistPage from "./components/artistPage";
import SignUp from "./components/SignUp";

import LikedAlbums from "./components/LikedAlbums";

import Library from "./components/Library";


class App extends React.Component {
  render() {
    return (
      <div className="main-components d-flex">

        {this.props.location.pathname !== "/signup" && <Sidebar />}

        <Route exact path="/" component={Home} />
        <Route path="/album/:id" component={AlbumPage} />
              <Route exact path="/liked" component={LikedAlbums} />
        <Route extact path="/artist/:id" component={artistPage} />
        {this.props.location.pathname !== "/signup" && <Player />}
        <Route exact path="/library" component={Library} />


        <Route exact path="/signup" component={SignUp} />
      </div>
    );
  }
}

export default withRouter(App);
