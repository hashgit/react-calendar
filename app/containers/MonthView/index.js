import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMetadata } from 'containers/MonthView/selectors';
import MonthView from './MonthView';
import injectReducer from '../../utils/injectReducer';
import calendarReducer from './reducer';
import { loadNext, loadPrev } from './actions';

const withReducer = injectReducer({
  key: 'calendar',
  reducer: calendarReducer,
});

const mapDispatchToProps = (dispatch) => ({
  prev: () => dispatch(loadPrev()),
  next: () => dispatch(loadNext()),
});

const withConnect = connect(
  createStructuredSelector({
    metadata: makeSelectMetadata(),
  }),
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect,
)(MonthView);
