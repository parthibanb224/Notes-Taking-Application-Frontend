import React, { useEffect, useState } from 'react';

const TimeDateDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return date.toLocaleTimeString(undefined, options);
    };

    return (
        <div className="text-center pt-2 pb-2">
            <p className="text-lg font-semibold mb-2">
                {formatDate(currentTime)}
            </p>
            <p className="text-xl font-bold">
                {formatTime(currentTime)}
            </p>
        </div>
    );
};

export default TimeDateDisplay;
