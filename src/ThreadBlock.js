import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { connect, useSelector, useDispatch } from 'react-redux';

import { getMonthName, getDaySuffix, dateToStr } from './util/helpers';

import Thread from './Thread';
import { threads } from './App';

function ThreadBlock(props) {
    //const [dateTyp, setDate] = useState(props.group[0].created_at.toDate());
    //const [dateForm, setDateForm] = useState(dateTyp.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}));

    const [threads, setThreads] = useState(props.group);
    const dates = useSelector(state => state.thread.dates);

    const [month, setMonth] = useState(getMonthName(props.date.getUTCMonth()));
    const [day, setDay] = useState(props.date.getUTCDate() + getDaySuffix(props.date.getUTCDate()));
    const [year, setYear] = useState(props.date.getUTCFullYear());

    const [fullDate, setFullDate] = useState(props.date.toDateString());

    return (
        <div className="thread-block">
            <span className="date">{month} {day} {year}</span>
            <div>
                {
                    threads.map((el, i) => {
                        return <Link to={"/threads/"+el.id}>
                            <Thread
                                key={fullDate+i}
                                title={el.title}
                                author={el.author}
                                replies={el.replies}
                                seen={false}
                            />
                        </Link>
                    })
                }         
            </div>
        </div>
    )
}

export default ThreadBlock