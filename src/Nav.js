import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import NavTab from './NavTab';
import Grid from '@mui/material/Grid';

function Nav() {
    const loggedIn = useSelector(state => state.auth.loggedIn);

    return (
        <>
        <div className="outerNav">
            <nav>
                <h2>HSP Company</h2>
                <Link to="/"><NavTab name="Home"/></Link>
                {loggedIn ? <Link to="/"><NavTab name="Watching"/></Link> : null}
                {loggedIn ? <Link to="/"><NavTab name="Follower Feed"/></Link> : null}
            </nav>
            <div className="navHighlight">
                    
            </div>    
        </div>
        </>
    );
}

export default Nav;