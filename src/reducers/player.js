import initialState from "../store";
export default function nowPlaying(state = initialState, action) {
  switch (action.type) {
    case "NOW_PLAYING":
      return {
        ...state,
        selectedSong: action.payload,
      };
    case "IN_QUEUE":
      return state.filter((song) => song.id !== action.payload);
    default:
      return state;
  }
}
