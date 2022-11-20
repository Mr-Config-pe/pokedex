import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import '..//assets/css/inputname.css'


const InputName = () => {

    //Estados

    const [userName, setUserName] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const enterName = () => {
        dispatch(changeName(userName))
        navigate("./pokedex")
    }

    return (
        <div id='inputname'>
            <div className="container-inputname">
                <h1>Input Name</h1>
                <input
                    type="text"
                    placeholder='Player Name'
                    onChange={e => setUserName(e.target.value)}
                    value={userName} />
                <button onClick={enterName}>Enter</button>
            </div>
        </div>
    );
};

export default InputName;