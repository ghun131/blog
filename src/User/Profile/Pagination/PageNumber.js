import React from 'react';
import Button from '@material-ui/core/Button';

const PageNumber = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {props.pageNumbers.map(num => 
                <Button
                    key={num}
                    style={{display: "block", fontWeight: "strong", fontSize: "17px"}}
                    variant="outlined"
                    onClick={() => props.clicked(num)}>
                    {num}
                </Button>
            )}
        </div>
    )
}

export default PageNumber;