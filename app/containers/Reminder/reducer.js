import { fromJS } from 'immutable';
import moment from 'moment';
import { SAVE_REMINDER, RESET_SAVED, GET_SAVED, DELETE_REMINDER } from './constants';

// The initial state of the App
const initialState = fromJS({
  saved: false,
  working: null,
  reminders: {},
});

function reminderReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_REMINDER:
    {
      const { when, title, id } = action.payload;
      const dateTime = new Date(when);
      const date = moment(dateTime).format('DD-MM-YYYY');
      const reminder = { time: dateTime, title };
      return state
        .updateIn(['reminders', date],
          fromJS([]),
          (rem) => {
            const js = rem.toJS();
            if (id) {
              js[id] = reminder;
            } else {
              js.push({ time: dateTime, title });
            }

            return fromJS(js.sort((a, b) => a.time - b.time));
          })
        .set('saved', true)
        .set('working', fromJS(reminder));
    }
    case RESET_SAVED:
    {
      return state
        .set('saved', false)
        .set('working', null);
    }
    case GET_SAVED:
    {
      const { payload: { date: payloadDate, id } } = action;
      const reminders = state.get('reminders').toJS();
      const workingDate = reminders[payloadDate];
      const working = workingDate ? workingDate[id] : null;
      return state
        .set('working', fromJS(working));
    }
    case DELETE_REMINDER:
    {
      const { id, date } = action.payload;
      return state
        .updateIn(['reminders', date],
          fromJS([]),
          (rem) => {
            const js = rem.toJS();
            if (id && js.length > id) {
              js.splice(id, 1);
            }

            return fromJS(js);
          })
        .set('saved', true)
        .set('working', null);
    }
    default:
      return state;
  }
}

export default reminderReducer;
