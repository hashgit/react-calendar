import React from 'react';
import PropTypes from 'prop-types';
import DayView from 'containers/DayView';
import './style.scss';

const WeekRow = ({ weekStart, weekStartDate, maxDate }) => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    let date = i >= weekStart ? (weekStartDate + (i - weekStart)) : '';
    if (date > maxDate) {
      date = '';
    }

    days.push(<DayView date={date} key={i} />);
  }

  return (
    <tr>
      {days}
    </tr>
  );
};

WeekRow.propTypes = {
  weekStart: PropTypes.number.isRequired,
  weekStartDate: PropTypes.number.isRequired,
  maxDate: PropTypes.number.isRequired,
};

const Calendar = ({ metadata }) => {
  const weekRows = [];
  let weekStartDate = 1;
  for (let i = 0; i < metadata.weeksInMonth; i += 1) {
    const firstDayOfWeek = i === 0 ? metadata.firstDayOfMonth : 0;
    if (i > 0) {
      weekStartDate += i === 1 ? (7 - metadata.firstDayOfMonth) : 7;
    }
    weekRows.push(<WeekRow weekStart={firstDayOfWeek} weekStartDate={weekStartDate} maxDate={metadata.daysInMonth} key={i} />);
  }

  return (
    <table className="calendar">
      <thead>
        <tr>
          <td>Sun</td>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td>Sat</td>
        </tr>
      </thead>
      <tbody>
        {weekRows}
      </tbody>
    </table>
  );
};

Calendar.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Calendar;
