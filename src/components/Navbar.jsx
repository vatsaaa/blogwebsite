import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    setInput,
    setSignedIn,
    setUserData,
} from "../features/userSlice";
import Profile from './Profile';
import OPLSettings from './OPLSettings.jsx';

import '../styling/Navbar.css';

const Navbar = () => {
    const [inputValue, setInputValue] = useState("");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);
    const [anchorEl, setAnchorEl] = useState(null);


    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    };

    const handleClick = (e) => {
        e.preventDefault(); // prevent page reload
        dispatch(setInput(inputValue));
    };

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = (event) => {
        setAnchorEl(null);
    };

    return(
        <div className="navbar">
            <h1 className="navbar__header">OPL</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input 
                        placeholder="Search phrases separated with semi-colon ';'" 
                        className="search" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="submit" onClick={handleClick}>
                        <i class="fa-solid fa-magnifying-glass fa-2x"></i>
                    </button>
                </div>
            )}

            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar                         
                        className="user"
                        src={userData ? userData.imageUrl : null}
                        alt={userData ? userData.name : null}
                        onClick={handleOpenMenu}
                        aria-controls='menu'
                    />
                    <Menu 
                        style={{ marginTop: '10px' }}
                        id='menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}><Profile /></MenuItem>
                        <MenuItem onClick={handleCloseMenu}><OPLSettings /></MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <GoogleLogout 
                                clientId="641688470754-q7l7t87eo9nnu8q52338kitlapk2on30.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="logout__button"
                                    >Logout <span role="img" aria-label="Bye">👋🏻</span>
                                    </button>
                                )}
                                onLogoutSuccess={logout}
                            />
                            </MenuItem>
                    </Menu>
                    <h1 className="signedIn">{userData ? userData.givenName : ""}</h1>
                    
                </div>
            ) : (
                <h1 className="notSignedIn">User not available</h1>
            )}
        </div>
    );
};

export default Navbar;