import React from "react";
import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware
} from "redux";
import { Provider, connect, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";

export default {
  title: "02-Redux connect"
};

const subReducer = (state = {}, action) => {
  switch (action.type) {
    case "AN_ACTION":
      return { message: action.payload.message };
  }

  return state;
};

function ConnectedContainer() {
  const message = useSelector(state => state.subReducer.message);

  return <div>Store message {message}</div>;
}

export function simpleStoreSetup() {
  const store = createStore(combineReducers({ subReducer }));

  function triggerStoreDispatch() {
    store.dispatch({
      type: "AN_ACTION",
      payload: { message: "test_action_triggered" }
    });
  }

  return (
    <Provider store={store}>
      <Button onClick={triggerStoreDispatch}>Trigger store dispatch</Button>
      <ConnectedContainer />
    </Provider>
  );
}

export function storeWithThunk() {
  const store = createStore(
    combineReducers({ subReducer }),
    applyMiddleware(thunk)
  );
  const aStoreAction = dispatch => {
    dispatch({
      type: "AN_ACTION",
      payload: { message: "test action with thunk" }
    });
  };

  function triggerStoreDispatch() {
    store.dispatch(aStoreAction);
  }

  return (
    <Provider store={store}>
      <Button onClick={triggerStoreDispatch}>Trigger store dispatch</Button>
      <ConnectedContainer />
    </Provider>
  );
}
