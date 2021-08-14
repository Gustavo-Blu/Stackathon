import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../store/allPlaylists';

/**
 * COMPONENT
 */
class AllPlaylists extends React.Component {
  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const { playlists } = this.props;
    return (
      <div className="main">
        <h2>All Playlists</h2>

        <div className="homePage">
          {playlists[1] &&
            playlists.map((playlist) => {
              return (
                <div className="container" key={playlist.id}>
                  <img className="containerImage" src={playlist.imageUrl} />
                  <div className="info">
                    <div>{playlist.title}</div>
                    <div>{playlist.songs.length} Songs</div>
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
    playlists: state.playlists,
  };
};

const mapDispatch = (dispatch) => ({
  getSongs: () => dispatch(fetchPlaylists()),
});

export default connect(mapState, mapDispatch)(AllPlaylists);
