import axios from 'axios';

//constants
const SET_SONG = 'SET_SONG';

//action creators
const _setSong = (song) => ({
  type: SET_SONG,
  song,
});

//thunk
export const fetchSong = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/songs${id}`);
      dispatch(_setSong(data));
    } catch (error) {
      console.log('cannot get the song');
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_SONG:
      return action.song;
    default:
      return state;
  }
}
