import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import Reminder from './Reminder';
import injectReducer from '../../utils/injectReducer';
import reminderReducer from './reducer';
import { saveReminder, resetSaved, getSaved, deleteReminder } from './actions';
import { makeSelectSaved, makeSelectWorking } from './selectors';

const withReducer = injectReducer({
  key: 'reminder',
  reducer: reminderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  save: (payload) => dispatch(saveReminder(payload)),
  reset: () => dispatch(resetSaved()),
  getSaved: (payload) => dispatch(getSaved(payload)),
  deleteReminder: (payload) => dispatch(deleteReminder(payload)),
  push: (location) => dispatch(push(location))
});

const withConnect = connect(
  createStructuredSelector({
    saved: makeSelectSaved(),
    working: makeSelectWorking()
  }),
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect,
)(Reminder);
