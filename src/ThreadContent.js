import React, {useState} from 'react';

import Post from './Post';

function ThreadContent(props) {
    const [posts, setPosts] = useState(props.post_list);

    return (
        <div className="threadContent">
            <h1>{props.title}</h1>
            <div className="all-posts">
                {
                    Object.keys(posts).map((el, id) => {
                        const pst = posts[el];
                        // unpack info
                        const body = pst.body;
                        const date = pst.created_at.toDate();
                        const likes = pst.likes;
                        const authorObj = pst.author;
                        return <Post key={pst.id+id} body={body} date={date} likes={likes} author={authorObj}/>
                    })
                }
            </div>
        </div>
    )
}

export default ThreadContent