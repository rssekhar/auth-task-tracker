import React, { useState, useContext, useEffect } from 'react';
import { store } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import Dashboard from './Dashboard';

const Home = () => {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const [data, setData] = useState(null);
    const [lName, setLName] = useState();

    useEffect(() => {
        const localToken = localStorage.getItem('token');

        if (!token && localToken) {
            setToken(localToken); // Restore token from localStorage on page load
        }

        if (token || localToken) {
            axios.get('http://localhost:5000/home', {
                headers: {
                    'X-Token': token || localToken
                }
            }).then((res) => {
                setData(res.data);
                setLName(res.data.email);
            }).catch((err) => {
                console.log('Token invalid or expired:', err);
                localStorage.removeItem('token');
                setToken(null);
                navigate('/login');
            });
        } else {
            navigate('/login');
        }

        // ✅ Clear token ONLY on tab close, not on refresh
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                const navEntry = performance.getEntriesByType("navigation")[0];
                const isReload = navEntry && navEntry.type === "reload";

                if (!isReload) {
                    console.log("🔥 Tab is being closed. Clearing token...");
                    localStorage.removeItem("token");
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [token, setToken, navigate]);

    return (
        <Layout>
            {
                data ?
                    <Dashboard uName={lName} />
                    :
                    <div className='not_found'>
                        <h1>Session Expired!</h1>
                        <Link to='/' className='no_link'>Go To Login</Link>
                    </div>
            }
        </Layout>
    );
};

export default Home;
