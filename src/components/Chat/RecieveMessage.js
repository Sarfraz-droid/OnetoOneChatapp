import React from 'react'

function RecieveMessage(props) {
    return (
        <div className="RecieveMessage">
            <h4>{props.heading}</h4>
            <p>{props.message}</p>
        </div>
    )
}

export default RecieveMessage
