import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import artists from './allArtists';
import selectedArtist from './artist';
import playlists from './allPlaylists';
import selectedPlaylist from './playlist';
import songs from './allSongs';
import selectedSong from './song';

const reducer = combineReducers({
  auth,
  artists,
  selectedArtist,
  playlists,
  selectedPlaylist,
  songs,
  selectedSong,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
