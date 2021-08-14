import React from 'react';
import { Button } from '@material-ui/core';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DropDownMenu = (props) => {
  const { open, handleClick, closeMenu } = props;
  return (
    <div className="menu" id={open ? 'visible-menu' : 'hidden-menu'}>
      <Link to="/playlists">
        <Button onClick={closeMenu} variant="outlined">
          Playlists
        </Button>
      </Link>
      <Link to="/songs">
        <Button onClick={closeMenu} variant="outlined">
          Songs
        </Button>
      </Link>
      <Link to="/artists">
        <Button onClick={closeMenu} variant="outlined">
          Artists
        </Button>
      </Link>
      <Button
        onClick={() => handleClick(closeMenu)}
        variant="outlined"
        style={{ color: 'red' }}
        color="secondary"
      >
        Logout
      </Button>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(callBack) {
      dispatch(logout());
      callBack();
    },
  };
};

export default connect(null, mapDispatch)(DropDownMenu);
