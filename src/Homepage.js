import React from 'react';
import { atom, useAtom } from 'jotai';

import Nav from './Nav';
import ProfileWidget from './ProfileWidget';
import ThreadFrame from './ThreadFrame';

import Grid from '@mui/material/Grid';

function Homepage(props) {
    return(
        <>
        <Grid container>
          <Grid item xs={1.85}>
            <Nav />
          </Grid>
          <Grid item xs={4.15}>
            <ThreadFrame />
          </Grid>
          <Grid item xs={6}>
            <ProfileWidget />
          </Grid>
        </Grid>
        </>
    )
}

export default Homepage