import React, { useState } from 'react';

import Unselected from './Imgs/heart.png';
import Selected from './Imgs/heart_click.png'; // this needs to change later

function Heart(props) {
    const [clicked, setClicked] = useState(props.selected);

    const click = (e) => {
        setClicked(!clicked);
    }
    return (
        <div className="heart">
            <img onClick={() => setClicked(!clicked)} className="heart-img" src={clicked ? Selected : Unselected} alt="heart" />
        </div>
    )
}

export default Heart