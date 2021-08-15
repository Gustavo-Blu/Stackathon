import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaylist } from '../store/playlist';
import { DataGrid } from '@material-ui/data-grid';
import Favorite from '@material-ui/icons/Favorite';

const columns = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'artist', headerName: 'Artist', width: 150 },
  { field: 'genre', headerName: 'Genre', width: 180 },
];
// const rows = [];

class Playlist extends React.Component {
  componentDidMount() {
    this.props.getPlaylist(this.props.match.params.id);
    // rows = this.props.playlist.songs;
  }

  render() {
    console.log(this.props);
    const { playlist } = this.props;
    return (
      <div className="main">
        <img className="singleImage" src={playlist.imageUrl} />

        {playlist.songs && (
          <div style={{ height: 400, width: '100%', color: 'white' }}>
            <DataGrid
              columns={columns}
              rows={playlist.songs.map((song) => {
                return {
                  id: song.id,
                  title: song.title,
                  artist: song.artist.name,
                  genre: song.genre,
                };
              })}
              rowsPerPageOptions={[5]}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              style={{ color: 'white' }}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  playlist: state.selectedPlaylist,
});

const mapDispatch = (dispatch) => ({
  getPlaylist: (id) => dispatch(fetchPlaylist(id)),
});

export default connect(mapState, mapDispatch)(Playlist);
