import axios from 'axios';

//constants
const SET_ARTIST = 'SET_ARTIST';

//action creators
const _setArtist = (artist) => ({
  type: SET_ARTIST,
  artist,
});

//thunk
export const fetchArtist = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/artists/${id}`);
      dispatch(_setArtist(data));
    } catch (error) {
      console.log('cannot get the artist');
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_ARTIST:
      return action.artist;
    default:
      return state;
  }
}
