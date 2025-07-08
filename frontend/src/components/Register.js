import React, { useState } from 'react';
import axios from "axios";
import '../styles/style.css';
import Layout from './Layout';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        cpassword: ""
    });
    const handleInput = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // ------ validate and sumit data in database --------
        let newUser = {
            email: data.email,
            password: data.password,
            cpassword: data.cpassword
        }
        // console.log(newUser);
        axios.post("https://task-tracker-backend-sius.onrender.com/register", newUser).then(
            (res) => {
                alert(res.data.message);
                navigate('/login')
            }
        ).catch(
            (error) => alert(error.response.data.message)
        );
    };
    return (
        <Layout>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <h3 className='text-center'>Register</h3>
                <div>
                    <label htmlFor='email'>Email ID</label>
                    <input type='email' name='email' id='email' placeholder='abc@gmail.com' value={data.email} onChange={handleInput} required />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Abc@12++' value={data.password} onChange={handleInput} required />

                </div>

                <div>
                    <label htmlFor='cpassword'>Confirm Password</label>
                    <input type='password' name='cpassword' id='cpassword' placeholder='Abc@12++' value={data.cpassword} onChange={handleInput} required />

                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
                <div className='text-center'>
                    Already Account ? &nbsp; <Link to='/login' className='no_link'>Login Here</Link>
                </div>
            </form>
        </Layout>
    )
}

export default Register
