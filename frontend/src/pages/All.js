import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trash from '../icon/trash.png';
import search from '../icon/search.png';
import Profile from '../components/Profile';
import { AuthContext } from '../context/authContext';
import Loader from '../components/Loader';

const All = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [birthdays, setBirthdays] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const fetchBirthdays = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/birthdays`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (response.ok) {
            const sorted = json.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA > nameB) {
                    return 1;
                }
                if (nameA < nameB) {
                    return -1;
                }
                return 0;
            })
            setBirthdays(sorted);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBirthdays();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [user]);

    const handleClick = async (id) => {
        setIsLoading(true);
        if (!user) {
            return;
        }
        const response = await fetch(`/api/birthdays/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.ok) {
            const result = birthdays.filter(birthday => birthday._id !== id);
            setBirthdays(result);
            setIsLoading(false);
            setSearchValue("");
        }
    };

    return (
        <>
            <Profile />
            <div className='search-field'>
                <div>
                    <input type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        placeholder='Search by name...' />
                </div>
                <div>
                    <img src={search} alt="search" />
                </div>
            </div>
            {
                isLoading ? <Loader /> :
                    birthdays.length === 0 ? <p className='empty'>No celebrations yet!</p> :
                        <section className='output-main'>
                            {
                                birthdays.filter((birthday) => {
                                    return searchValue.toLowerCase() === "" ? birthday :
                                        birthday.name.toLowerCase().includes(searchValue.toLowerCase());
                                }).map((birthday) => {
                                    return (
                                        <div className='birthday-output' key={birthday._id}>
                                            <div>
                                                <h3>{birthday.name}</h3>
                                                <p>{birthday.celebration}</p>
                                                <p>{birthday.day} {birthday.month}</p>
                                            </div>
                                            <div>
                                                <img onClick={() => handleClick(birthday._id)} src={trash} alt="trash" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
            }
        </>
    )
};

export default All;