import React, { useState, useContext } from 'react';
import { store } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';
import Layout from './Layout';

const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loginUser,setLoginUser] = useState("");
    const handleInput = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        // ------ validate and sumit data in database --------
        let newUser = {
            email: data.email,
            password: data.password
        }
        // console.log(newUser);
        axios.post("http://localhost:5000/login", newUser).then(
            (res) => {
                // console.log(res);
                setToken(res.data.token);
                setLoginUser(res.data.email);
            }
        ).catch(
            (error) => alert(error.response.data.message)
        );

    };
    // console.log(token);
    if (token) {
        navigate('/home');
    }
    return (
        <Layout login_user = {loginUser}>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <h3 className='text-center'>Login</h3>
                <div>
                    <label htmlFor='email'>Email ID</label>
                    <input type='email' name='email' id='email' placeholder='abc@gmail.com' value={data.email} onChange={handleInput} required />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Abc@12++' value={data.password} onChange={handleInput} required />

                </div>

                <div>
                    <button type='submit'>Login</button>
                </div>
                <div className='text-center'>
                    No Account ? &nbsp;<Link to='/register' className='no_link'>Register Here</Link>
                </div>
            </form>
        </Layout>
    )
}

export default Login;
