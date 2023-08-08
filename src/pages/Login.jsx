import React, {useState} from 'react';
import {useLoginAdminMutation} from "../redux/auth/authApiSlice.js";
import {useInput} from "../utils.js";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {auth} from "../redux/auth/authSlice.js";

const Login = () => {
    const [loginn] = useLoginAdminMutation()
    const [login, changeLogin] = useInput('')
    const [error, setError] = useState('')
    const [password, changePassword] = useInput('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {

            const data = await loginn({login, password})
            console.log(data?.token, data)
            if(data?.data?.token){
                dispatch(auth(data.data.token))
                navigate('/')


            }
            if(data?.error){
                setError(data.error?.data?.message)
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div style={{
            width: 300,
            margin: '100px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
        }}>
            <h1 style={{fontWeight: 500, fontSize: 36, letterSpacing:2}}>LOGIN</h1>
            <input style={{padding: '16px',width:"100%"}} value={login} onChange={changeLogin}
                   placeholder={'Login...'} type="text"/>
            <input style={{padding: '16px',width:"100%"}} value={password} onChange={changePassword}
                   placeholder={'Password'} type="password"/>
            <div className={'error'}>
                {error}
            </div>
            <button onClick={handleLogin} style={{
                background: '#212121',
                padding: '16px 32px',
                color: '#fff',
                fontSize: 18,
                width:'100%'
            }}>Войти
            </button>
        </div>
    );
};

export default Login;
