import React from 'react';

import Comment from './Imgs/bubble-chat.png';

function Comments(props) {
    return (
        <div className="comment">
            <img className="comment-img" src={Comment} alt="Number of comments background" />
            <span className="comment-num">{props.num}</span>
        </div>
    )
}

export default Comments