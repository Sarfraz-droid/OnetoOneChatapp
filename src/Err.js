import React,{useState,useEffect} from 'react'

import {useHistory} from 'react-router-dom'
import {useSelector , useDispatch } from 'react-redux'
function Err(props) {

    const history = useHistory();

    const error = useSelector((state) => state.Login); 

    return (
        <div className="err">
            <h1>ERROR!</h1>

            <p>
                {error.message}
            </p>

            <button onClick={() => history.push("/")}>GO BACK</button>

        </div>
    )
}

export default Err
