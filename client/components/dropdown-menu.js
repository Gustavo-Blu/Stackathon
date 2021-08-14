import React from 'react';
import { Button } from '@material-ui/core';
import { logout } from '../store';

export default dropDownMenu = (props) => {
    const {isLoggedIn, open} = props
  return(
    <div className={open ? 'visible-cart' : 'hidden-cart'}
  );
};
