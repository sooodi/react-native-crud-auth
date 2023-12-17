import { CounterAction, DECREMENT, INCREMENT } from "./auth.action";


export type CounterState = number;

function counterReducer(state: CounterState = 0, action: CounterAction) {
  switch (action.type) {
    case INCREMENT:
      return state + action.amount;
    case DECREMENT:
      return state - action.amount;
    default:
      return state;
  }
}

export default counterReducer;
