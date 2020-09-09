import { Enum } from '../../ulti';

export const ToDoConst = Object.freeze({
  SHOW_COUNTER: 'SHOW_COUNTER' as 'SHOW_COUNTER',
  HIDE_COUNTER: 'HIDE_COUNTER' as 'HIDE_COUNTER',
});
export type ToDoConst = Enum<typeof ToDoConst>;

interface IShowCounterAction {
  type: typeof ToDoConst.SHOW_COUNTER;
}

interface IHideCounterAction {
  type: typeof ToDoConst.HIDE_COUNTER;
}

export type ToDoActionType = IShowCounterAction | IHideCounterAction;

export const initState = Object.freeze<ToDoStates>({
  visible: true,
});

export type ToDoStates = {
  visible: boolean;
};
