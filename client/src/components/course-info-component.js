import React from 'react';
import "./course-info-component.css"
import {useSelector} from "react-redux";

const CourseInfoComponent = () => {
    const date = useSelector(state => state.tradingReducer.currentDate)
    const course = useSelector(state => state.tradingReducer.currentCourse)
    return (
        <div className="info-wrap">
            <h1 style={{textAlign:"center", marginTop: "70px", fontSize: "40px"}}>Курсы</h1>
            <div className="current-date">
                Дата: <span>{date}</span>
            </div>
            <div className="current-course">
                {
                    course.map(item => (
                        <div className="share-course-info" key={item[0]}>
                            <div className="share-name">
                                Акция: {item[0].toUpperCase()}
                            </div>
                            <div className="share-course">
                                Курс: {item[1]}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CourseInfoComponent;