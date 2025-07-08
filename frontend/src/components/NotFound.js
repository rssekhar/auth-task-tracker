import React from 'react'
import Layout from './Layout';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <Layout>
            <div className='not_found'>
                <h1>No Page Found</h1>
                <Link to='/login' className='no_link'>Go Back</Link>
            </div>
        </Layout>
    )
}

export default NotFound;
