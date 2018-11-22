import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRemindersForDate } from 'containers/Reminder/selectors';
import DayView from './DayView';

export default connect(
  createStructuredSelector({
    reminders: makeSelectRemindersForDate(),
  }),
)(DayView);
