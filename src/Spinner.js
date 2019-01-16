import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = (props) => {
    return (
        <div style={{ paddingTop: "150px"}}>
            <Loader
                type="Plane"
                height= "100" 
                width= "100"
                color="#3f3f3f"/>
        </div>
    )
}

export default Spinner;