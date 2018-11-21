import { createSelector } from 'reselect';

const selectCalendar = (state) => state.get('calendar');

const makeSelectMetadata = () => createSelector(
  selectCalendar,
  (globalState) => globalState.get('meta').toJS()
);

export {
  selectCalendar,
  makeSelectMetadata,
};
