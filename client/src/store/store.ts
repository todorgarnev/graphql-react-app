import { createStore } from "redux";
import { ActionTypes, ADD_USER, REMOVE_USER } from "./actions"
import { Store } from "./types"

const initialStore: Store = {
  user: null
}

const userReducer = (state: Store = initialStore, action: ActionTypes) => {
  switch (action.type) {
    case ADD_USER:
      return {
        user: action.payload
      };
    case REMOVE_USER:
      return {
        user: null
      };
    default:
      return state;
  }
};

const store = createStore(
  userReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;