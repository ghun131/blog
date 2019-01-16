import React from 'react';
import Button from '@material-ui/core/Button';

const PageNumber = (props) => {
    return (
        <div>
            {props.pageNumbers.map(num => 
                <Button
                    key={num}
                    style={{fontWeight: "700", fontSize: "17px"}}
                    variant="outlined"
                    onClick={() => props.clicked(num)}>
                    {num}
                </Button>
            )}
        </div>
    )
}

export default PageNumber;