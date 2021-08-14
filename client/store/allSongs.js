import axios from 'axios';

//constants
const SET_SONGS = 'SET_SONGS';

//action creators
const _setSongs = (songs) => ({
  type: SET_SONGS,
  songs,
});

//thunk
export const fetchSongs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/songs');
      dispatch(_setSongs(data));
    } catch (error) {
      console.log('cannot get songs');
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_SONGS:
      return action.songs;
    default:
      return state;
  }
}
