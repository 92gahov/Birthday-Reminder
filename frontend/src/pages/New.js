import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { AuthContext } from '../context/authContext';

const New = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const [name, setName] = useState("");
    const [celebration, setCelebration] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in!");
        }
        const split = date.split("-");
        const day = parseInt(split[2]);
        const monthIndex = parseInt(split[1]);
        const month = months[monthIndex - 1];
        const fullDate = date;
        const birthday = { name, celebration, month, day, fullDate };
        const response = await fetch(`/api/birthdays`, {
            method: "POST",
            body: JSON.stringify(birthday),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setName("");
            setCelebration("");
            setDate("");
            setEmptyFields([]);
            navigate('/');
        }
    };

    return (
        <>
            <Profile />
            <section className='new-birthday'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <p>Name:</p>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className={emptyFields.includes('name') ? 'error' : ''} placeholder="Person Name..." />
                        <p>Celebration:</p>
                        <input type="text"
                            onChange={(e) => setCelebration(e.target.value)}
                            value={celebration}
                            className={emptyFields.includes('title') ? 'error' : ''} placeholder="Birthday, Name Day..." />
                        <p>Date:</p>
                        <input type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className={emptyFields.includes('date') ? 'error' : ''} />
                        <div className='add-new-btn'>
                            <button type='submit'>Add</button>
                        </div>
                        {
                            error && <p style={{ textAlign: 'center', marginTop: '8px', color: 'red' }}>{error}</p>
                        }
                    </form>
                </div>
            </section>
        </>
    )
};

export default New;