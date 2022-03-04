import React, { useState, useEffect } from 'react';

import { getInitials } from './util/helpers';

import Avatar from '@mui/material/Avatar';
import Comments from './Comments';
import Heart from './Heart';


function Thread(props) {

    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [replies, setReplies] = useState(props.replies);
    const [seen, setSeen] = useState(props.seen);
    const [fav, setFav] = useState(props.fav);

    let status = 'status' // probably should use a hook here
    seen ? status += ' status-seen' : status += ' status-not-seen';
    
    let threadStatus = 'thread';
    let statStatus = 'stats';
    seen ? threadStatus += ' thread-seen' : threadStatus += ' thread-not-seen';
    seen ? statStatus += ' thread-seen' : statStatus += ' thread-not-seen';

    return (
        <>
        <div className="thread-contents">
            {<div className={status}></div>} 
                {<div className={threadStatus}>
                    <Avatar id="threadAvatar" sx={{ bgcolor: "#EF8354" }}>{getInitials(author)}</Avatar>
                    <span id="threadName">{title}</span>
                </div>
                }
                {
                <div className={statStatus}>
                    <Heart selected={fav}/>
                    <Comments num={replies} />
                </div>
                }
        </div>  
        </>
    )
}

export default Thread