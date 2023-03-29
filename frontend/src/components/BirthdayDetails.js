import React from 'react';

const BirthdayDetails = ({ birthday }) => {

    const dayOfYear = date => {
        const myDate = new Date(date);
        const year = myDate.getFullYear();
        const firstJan = new Date(year, 0, 1);
        const differenceInMillieSeconds = myDate - firstJan;
        return (differenceInMillieSeconds / (1000 * 60 * 60 * 24) + 1);
    };

    const now = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const currYear = new Date().getFullYear();
    const today = dayOfYear(now);

    const daysLeft = (day) => {
        const split = day.split("-");
        const date = `${currYear}-${split[1]}-${split[2]}`;
        const birthdayDay = dayOfYear(date);
        const result = parseInt(birthdayDay) - parseInt(today);
        if (result < 0) {
            return;
        } else if (result === 0) {
            return "today";
        }
        else if (result === 1) {
            return "tomorrow";
        } else if (result > 1) {
            return `${result} days left`;
        }
    };

    return (
        <div className='birthday-output' key={birthday._id}>
            <div>
                <h3>{birthday.name}</h3>
                <p>{birthday.celebration}</p>
                <p>{birthday.day} {birthday.month}</p>
            </div>
            <div className='days-left'>
                <p>{daysLeft(birthday.fullDate)}</p>
            </div>
        </div>
    )
};

export default BirthdayDetails;