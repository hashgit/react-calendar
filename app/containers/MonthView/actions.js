import {
  LOAD_PREV,
  LOAD_NEXT,
} from './constants';

export function loadPrev() {
  return {
    type: LOAD_PREV,
  };
}

export function loadNext() {
  return {
    type: LOAD_NEXT,
  };
}
