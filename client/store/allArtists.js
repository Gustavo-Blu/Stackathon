import axios from 'axios';

//constants
const SET_ARTISTS = 'SET_ARTISTS';

//action creators
const _setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists,
});

//thunk
export const fetchArtists = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/artists');
      dispatch(_setArtists(data));
    } catch (error) {
      console.log('cannot get artists');
    }
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_ARTISTS:
      return action.artists;
    default:
      return state;
  }
}
