import { createSelector } from 'reselect';

const selectCalendar = (state) => state.get('calendar');

const makeSelectMetadata = () => createSelector(
  selectCalendar,
  (globalState) => globalState.get('meta').toJS()
);

const makeSelectCurrentDate = () => createSelector(
  selectCalendar,
  (state) => state.get('currentDate')
);

export {
  selectCalendar,
  makeSelectMetadata,
  makeSelectCurrentDate
};
