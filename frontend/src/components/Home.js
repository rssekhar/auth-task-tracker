import React, { useState, useContext, useEffect } from 'react';
import { store } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import Dashboard from './Dashboard';
// console.log(store);
const Home = () => {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const [data, setData] = useState(null);
    const [lName,setLName] = useState();
    // console.log('home token', store);
    useEffect(() => {
        axios.get('http://localhost:5000/home', { headers: { 'X-Token': token } }).then((res) => {
            setData(res.data);
            // console.log('in token', res.data);
            // console.log(res.data.email);
            setLName(res.data.email);
        }).catch((err) => console.log(err))
    }, [token]);

    // console.log('test home data', data);
    if (!token) {
        navigate('/login');
        setToken(null);
    }
    // console.log(lName);
    return (
        <Layout>
            {
                data ?
                    <Dashboard uName={lName}/>
                    :
                    <div className='not_found'>
                        <h1>Session Expired !</h1>
                        <Link to='/' className='no_link'>Go To Login</Link>
                    </div>
            }

        </Layout>
    )
}

export default Home;
