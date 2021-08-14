import axios from 'axios';

//constants
const SET_PLAYLISTS = 'SET_PLAYLISTS';

//action creators
const _setPlaylists = (playlists) => ({
  type: SET_PLAYLISTS,
  playlists,
});

//thunk
export const fetchPlaylists = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/playlists');
      dispatch(_setPlaylists(data));
    } catch (error) {
      console.log('cannot get playlists');
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_PLAYLISTS:
      return action.playlists;
    default:
      return state;
  }
}
