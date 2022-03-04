import React from 'react';

//import Home from '@mui/icons-material/Home';

function NavTab(props) {

    return (
        <div className="tab">
            <h4 id="tab-title">{props.name}</h4>
            {/*props.icon === "Home" ? Home : null*/}
        </div>
    )
}

export default NavTab;