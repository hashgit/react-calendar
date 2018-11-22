import { SAVE_REMINDER, RESET_SAVED, GET_SAVED, DELETE_REMINDER } from './constants';

export function saveReminder(payload) {
  return {
    type: SAVE_REMINDER,
    payload
  };
}

export function resetSaved() {
  return {
    type: RESET_SAVED,
  };
}

export function getSaved(payload) {
  return {
    type: GET_SAVED,
    payload
  };
}

export function deleteReminder(payload) {
  return {
    type: DELETE_REMINDER,
    payload
  };
}
