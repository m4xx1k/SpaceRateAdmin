import React from 'react';
import {useLoginAdminMutation} from "../redux/auth/authApiSlice.js";
import {useInput} from "../utils.js";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {auth} from "../redux/auth/authSlice.js";

const Login = () => {
    const [loginn] = useLoginAdminMutation()
    const navigate = useNavigate()
    const [login, changeLogin] = useInput('')
    const [password, changePassword] = useInput('')
    const dispatch = useDispatch()
    const handleLogin = async () => {
        try {
            if (login === 'admin' && password === 'nimda') {
                const user = {login, password}
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(auth({user}))
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div style={{
            width: 600,
            maxWidth: '90vw',
            border: '1px solid blue',
            borderRadius: 8,
            margin: '200px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 24,
            gap:8,
            background:'#ddd'
        }}>
            <h1 style={{fontWeight:700, fontSize:24}}>LOGIN</h1>
            <input style={{padding:'8px 12px', borderRadius:4}} value={login} onChange={changeLogin} placeholder={'Login...'} type="text"/>
            <input  style={{padding:'8px 12px', borderRadius:4}} value={password} onChange={changePassword} placeholder={'Password'} type="password"/>
            <button onClick={handleLogin} style={{background: 'blue', padding: '10px 32px', borderRadius: 8, color:'#fff', fontSize:18}}>Войти
            </button>
        </div>
    );
};

export default Login;
