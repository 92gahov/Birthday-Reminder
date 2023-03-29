import React from 'react';
import loading from '../icon/loading.gif';

const Loader = () => {
    return (
        <section className='loader'>
            <div>
                <img src={loading} alt="loading..." />
            </div>
        </section>
    )
};

export default Loader;