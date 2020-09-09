import { ToDoConst } from './type';

export function showCounter() {
  return {
    type: ToDoConst.SHOW_COUNTER,
  };
}

export function hideCounter() {
  return {
    type: ToDoConst.HIDE_COUNTER,
  };
}
