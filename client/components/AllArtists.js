import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArtists } from '../store/allArtists';

/**
 * COMPONENT
 */
class AllArtists extends React.Component {
  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const { artists } = this.props;
    return (
      <div className="main">
        <h2>All Artists</h2>

        <div className="homePage">
          {artists[1] &&
            artists.map((artist) => {
              return (
                <div className="container" key={artist.id}>
                  <img className="containerImage" src={artist.imageUrl} />
                  <div className="info">
                    <div>{artist.name}</div>
                    <div>{artist.songs.length} Songs</div>
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
    artists: state.artists,
  };
};

const mapDispatch = (dispatch) => ({
  getSongs: () => dispatch(fetchArtists()),
});

export default connect(mapState, mapDispatch)(AllArtists);
