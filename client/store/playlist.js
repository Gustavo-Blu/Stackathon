import axios from 'axios';

//constants
const SET_PLAYLIST = 'SET_PLAYLIST';

//action creators
const _setPlaylist = (playlist) => ({
  type: SET_PLAYLIST,
  playlist,
});

//thunk
export const fetchPlaylist = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/playlists/${id}`);
      dispatch(_setPlaylist(data));
    } catch (error) {
      console.log('cannot get the playlist');
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return action.playlist;
    default:
      return state;
  }
}
