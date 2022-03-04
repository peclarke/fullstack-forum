import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import { buttonTheme } from './util/themes';

import { authUser, logoutUser } from './redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { SettingsOutlined as Settings,
         NotificationsActiveOutlined as Notification,
         EmailOutlined as Email,
         Logout} from '@mui/icons-material';


function ProfileWidget(props) {
    const [threads, setThreads] = useState(props.threads);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // redux state 
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const f_name = useSelector(state => state.auth.f_name);
    const l_name = useSelector(state => state.auth.l_name);
    const usern = useSelector(state => state.auth.username);

    const dispatch = useDispatch();

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleAvatarClose = () => {
    setAnchorEl(null);
    };

    return (
        <div className="right-column">
            <div className="profWidget">
                <div className="triangle"></div>
                { // If they are logged in, display user info
                loggedIn ?
                <div className="profDetails">
                    <div className="profButtons">
                        <Tooltip id="notif_tooltip" title="Notifications">
                            <IconButton><Notification fontSize="large" sx={{ color: grey[50] }}/></IconButton>
                        </Tooltip>
                        <br></br><br></br>
                        <Tooltip id="msg_tooltip" title="Messages">
                            <IconButton><Email fontSize="large" sx={{ color: grey[50] }}/></IconButton>
                        </Tooltip>
                    </div>

                    <div className="profNames">
                        <span id="name">{f_name} {l_name}</span>
                        <span>@{usern}</span>
                    </div>

                    <Tooltip id="avatar_tooltip" title="Account Settings">
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar id="avatar" sx={{ bgcolor: "#EF8354" }}>
                                {f_name.charAt(0)}{l_name.charAt(0)}
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleAvatarClose}
                        onClick={handleAvatarClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(logoutUser())}>
                            <Logout /> Logout
                        </MenuItem>

                    </Menu>

                </div> : <div className="profDetails">
                    <div className="auth-buttons">
                        <ThemeProvider theme={buttonTheme}>
                            <Link to="/register">
                                <Button id="sign-up-btn" variant="contained">Sign Up</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="contained">Log In</Button>
                            </Link>
                        </ThemeProvider>
                    </div>
                </div>
                }
            </div>
            <div className="column-break"></div>
            {/*<div className="favourite-threads">
                <span id="fav-thread-title">FAVOURITED</span>
                
                    Object.keys(threads).map((key, i) => {
                        var thread = threads[key];
                        return thread['fav'] ? <p key={i}>{thread['title']}</p> : <span key={i}></span>
                    })*/
                    /*favs.map((key, i) => {
                        var info = props.getThread(key);
                        return <p>{info['title']}</p>
                    })
                
                </div>*/}
        </div>
    )
}



export default ProfileWidget;