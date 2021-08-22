import React from 'react'

function SendMessage(props) {
    return (
        <div className="send-message">
            <h4>You</h4>
            <p>{props.message}</p>
        </div>
    )
}

export default SendMessage
