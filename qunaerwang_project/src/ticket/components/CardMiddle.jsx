import React from 'react';

const CardMiddle = (props) => {
    const { trainNumber, showDialog  } = props;
    return (
        <div className="wrapper middle-wrapper">
            <span className="trainNumber">{trainNumber} 高速动车</span>
            <span className="timetable">— <a onClick={showDialog} href="#!">时刻表</a> —</span>
            <span className="duration">耗时4小时18分</span>
        </div>
    );
}

export default CardMiddle;