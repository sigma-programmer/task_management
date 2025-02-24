import React, { useEffect, useState } from 'react';

const Counter = ({ endValue }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(endValue, 10);
        const duration = 2000; // duration of the animation in ms
        const incrementTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [endValue]);

    return <h3 className='NumberOfMember'>{count}+</h3>;
};

export default Counter;
