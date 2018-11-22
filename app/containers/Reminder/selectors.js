import { createSelector } from 'reselect';
import { makeSelectCurrentDate } from 'containers/MonthView/selectors';

const selectReminder = (state) => state.get('reminder');

const makeSelectReminders = () => createSelector(
  selectReminder,
  (state) => (state ? state.get('reminders').toJS() : null)
);

const makeSelectRemindersForDate = () => createSelector(
  makeSelectReminders(),
  (state, props) => props.date,
  makeSelectCurrentDate(),
  (reminders, date, currentDate) => (reminders && date ? reminders[`${date}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`] : null)
);

const makeSelectSaved = () => createSelector(
  selectReminder,
  (state) => (state ? state.get('saved') : false)
);

const makeSelectWorking = () => createSelector(
  selectReminder,
  (state) => {
    const working = (state ? state.get('working') : null);
    return working ? working.toJS() : null;
  }
);

export {
  selectReminder,
  makeSelectReminders,
  makeSelectRemindersForDate,
  makeSelectSaved,
  makeSelectWorking,
};
