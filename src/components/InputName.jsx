import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import '..//assets/css/inputname.css'
import backgroundinputname from '../assets/images/background-login.avif'


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
                <h1>Hello Trainer!</h1>
                <div className="container-text-playername">
                    <input
                        type="text"
                        placeholder='Player Name'
                        onChange={e => setUserName(e.target.value)}
                        value={userName} className="box-inputname"/>
                    <button onClick={enterName} className="btn-inputname">Enter</button>
                </div>
            </div>
        </div>
    );
};

export default InputName;