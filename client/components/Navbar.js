import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import DropdownMenu from './Dropdown-menu';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuIsOpen: false,
    };
    this.setMenuIsOpen = this.setMenuIsOpen.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  setMenuIsOpen() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  closeMenu() {
    this.setMenuIsOpen();
  }

  render() {
    const { handleClick, isLoggedIn, user } = this.props;
    return (
      <div id="navbar">
        <Link to="/home">
          <h1 style={{ color: 'lightblue', margin: '10px' }}>Nano</h1>
        </Link>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <img id="profile-pic" src={user.imageUrl} />
              {/* <Link to="/home">Home</Link> */}
              <div
                id="menu-btn"
                style={{ display: 'inline-block' }}
                onClick={this.setMenuIsOpen}
              >
                <img id="dropdown" src="/menu-btn.svg" />
              </div>
              {/* <a href="#" onClick={handleClick}>
                Logout
              </a> */}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <img id="dropdown" src="/menu-btn.svg" />
            </div>
          )}
          {
            <DropdownMenu
              open={this.state.menuIsOpen}
              closeMenu={this.closeMenu}
            />
          }
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
