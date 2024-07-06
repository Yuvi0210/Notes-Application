import React from 'react';


const Alert = (props) => {
    return (
        <div className="con">
            {props.alert && <div className="alert alert-primary" role="alert" id='myDiv'>
                {props.alert.message}
            </div>}
        </div>
    )
}



export default Alert
