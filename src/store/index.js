import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import uiReducers from "../reducers/ui";
import playerReducers from "../reducers/player";
import userReducers from "../reducers/user";
import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  user: {
    liked: [],
    username: "",
    password: "",
    email: "",
    playlists: [],
    showModal: false,
  },
  player: {
    selectedSong: null,
    queue: [],
    currentlyPlaying: false,
  },
  ui: {
    artists: {
      artistList: [],
    },
    albums: [],
    artist: {},
    tracks: [],
    songs: {
      songList: [],
      selectedAlbum: {},
    },
    loading: false,
  },
};

const combinedReducer = combineReducers({
  user: userReducers,
  player: playerReducers,
  ui: uiReducers,
});

export default function configureStore() {
  return createStore(
    combinedReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
