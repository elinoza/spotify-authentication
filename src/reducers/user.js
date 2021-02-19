import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      return {
        ...state,
        liked: state.liked.concat(action.payload),
      };
    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        liked: state.liked.filter((album) => album.id !== action.payload),
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        showModal: action.payload,
      };
    case "GENERATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.concat(action.payload),
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.payload.index),
          {
            ...state.playlists[action.payload.index],
            tracklist: state.playlists[action.payload.index].tracklist.concat(
              action.payload.song
            ),
          },
          ...state.playlists.slice(action.payload.index + 1),
        ],
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, action.payload.index),
          {
            ...state.playlists[action.payload.index],
            tracklist: state.playlists[action.payload.index].tracklist.filter(
              (song) => song.id !== action.payload.id
            ),
          },
          ...state.playlists.slice(action.payload.index + 1),
        ],
      };
    default:
      return state;
  }
}
