import { initState, ToDoActionType, ToDoConst, ToDoStates } from './type';

export const todo = (state = initState, action: ToDoActionType): ToDoStates => {
  switch (action.type) {
    case ToDoConst.SHOW_COUNTER: {
      return {
        ...state,
        visible: true,
      };
    }
    case ToDoConst.HIDE_COUNTER: {
      return {
        ...state,
        visible: false,
      };
    }
    default:
      return state;
  }
};
