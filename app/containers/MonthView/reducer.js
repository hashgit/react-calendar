import { fromJS } from 'immutable';
import moment from 'moment';
import {
  LOAD_PREV,
  LOAD_NEXT,
} from './constants';


const currentDate = new Date();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (date) => {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
};

const getMonthStartDay = (date) => new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`).getDay();

const weekCount = (year, month) => {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const used = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil(used / 7);
};

const getCalendarMetaForDate = (date) => ({
  daysInMonth: getDaysInMonth(date),
  startDayInWeek: getMonthStartDay(date),
  weeksInMonth: weekCount(date.getFullYear(), date.getMonth()),
  month: monthNames[date.getMonth()],
  firstDayOfMonth: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
});

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentDate,
  meta: getCalendarMetaForDate(currentDate),
});

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NEXT:
    {
      let date = state.get('currentDate');
      date = moment(date).add(1, 'month').toDate();
      const meta = getCalendarMetaForDate(date);

      return state
        .set('currentDate', date)
        .set('meta', fromJS(meta));
    }
    case LOAD_PREV:
    {
      let date = state.get('currentDate');
      date = moment(date).subtract(1, 'month').toDate();
      const meta = getCalendarMetaForDate(date);

      return state
        .set('currentDate', date)
        .set('meta', fromJS(meta));
    }
    default:
      return state;
  }
}

export default calendarReducer;
