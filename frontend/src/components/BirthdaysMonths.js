import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import BirthdayDetails from './BirthdayDetails';
import Loader from './Loader';
import { useLogout } from '../hooks/useLogout';

const BirthdaysMonths = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const today = parseInt(new Date().getDate());
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = months[parseInt(new Date().getMonth())];
    const [isLoading, setIsLoading] = useState(false);
    const [currMonth, setCurrMonth] = useState(month);
    const [birthdays, setBirthdays] = useState([]);
    const { logout } = useLogout();

    const options = [
        {
            label: "January",
            value: "January"
        },
        {
            label: "February",
            value: "February"
        },
        {
            label: "March",
            value: "March"
        },
        {
            label: "April",
            value: "April"
        },
        {
            label: "May",
            value: "May"
        },
        {
            label: "June",
            value: "June"
        },
        {
            label: "July",
            value: "July"
        },
        {
            label: "August",
            value: "August"
        },
        {
            label: "September",
            value: "September"
        },
        {
            label: "October",
            value: "October"
        },
        {
            label: "November",
            value: "November"
        },
        {
            label: "December",
            value: "December"
        }
    ];

    const fetchBirthdays = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/birthdays`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (response.ok) {
            const sorted = json.filter(birthday => birthday.month === currMonth)
                .sort((a, b) => (a.day < b.day) ? -1 : (a.day > b.day) ? 1 : 0);
            setBirthdays(sorted);
            setIsLoading(false);
        }
        if (json.error === "Token expired!") {
            logout();
        }
    };

    useEffect(() => {
        if (user) {
            fetchBirthdays();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [user, currMonth]);

    const changeMonth = (e) => {
        setCurrMonth(e.target.value);
        const filtered = birthdays.filter(birthday => birthday.month === e.target.value);
        setBirthdays(filtered);
    };

    return (
        <>
            <section>
                <div className='months'>
                    <div>
                        <p>{today} {month}</p>
                    </div>
                    <div>
                        <select value={currMonth} onChange={changeMonth}>
                            {
                                options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='curr-month'>
                    <h3>{currMonth}</h3>
                </div>
            </section>
            {
                isLoading ? <Loader /> :
                    birthdays.length === 0 ? <p className='empty'>No celebrations for {currMonth}!</p> :
                        <section className='output-main'>
                            {
                                birthdays && birthdays.map((birthday) => (
                                    <BirthdayDetails key={birthday._id} birthday={birthday} />
                                ))
                            }
                        </section>
            }
        </>
    )
};

export default BirthdaysMonths;