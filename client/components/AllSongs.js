import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../store/allSongs';

/**
 * COMPONENT
 */
class AllSongs extends React.Component {
  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const { songs } = this.props;
    return (
      <div className="main">
        <h2>All Songs</h2>

        <div className="homePage">
          {songs[1] &&
            songs.map((song) => {
              return (
                <div className="container" key={song.id}>
                  <img className="containerImage" src={song.imageUrl} />
                  <div className="info">
                    <div>{song.title}</div>
                    <div>By: {song.artist.name}</div>
                    <div>Genre: {song.genre}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // user: state.auth,
    songs: state.songs,
  };
};

const mapDispatch = (dispatch) => ({
  getSongs: () => dispatch(fetchSongs()),
});

export default connect(mapState, mapDispatch)(AllSongs);
