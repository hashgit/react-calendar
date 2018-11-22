import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.scss';

const Reminder = ({ reminder, id }) => (
  <div>
    <Link to={`/reminder/${moment(reminder.time).format('DD-MM-YYYY')}/${id}`}>{reminder.title}</Link>
    @ {reminder.time.toLocaleTimeString()}
  </div>
);

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

const DayView = ({ date, reminders }) => (
  <td className="calendarDay">
    <div className="dayView">
      <div className="date">
        {date}
      </div>
      <div className="reminders">
        {
          // eslint-disable-next-line react/no-array-index-key
          reminders ? reminders.map((r, i) => <Reminder reminder={r} key={i} id={i} />)
            : null}
      </div>
    </div>
  </td>
);

DayView.propTypes = {
  date: PropTypes.any.isRequired,
  reminders: PropTypes.array,
};

export default DayView;
