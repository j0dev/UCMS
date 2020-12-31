import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import rootReducer, { rootSaga } from "./store/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { tempSetUser, check } from "./store/modules/user";
import { ACCESS_TOKEN } from "./lib/config";
import authMiddleware from "./lib/validation";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__,
  composeWithDevTools(applyMiddleware(sagaMiddleware, authMiddleware))
  // composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token && !user) return;
    if (!token && user) {
      store.dispatch(tempSetUser(user));
    }
    if (token && !user) {
      store.dispatch(check());
    }
  } catch (e) {
    console.log("localStorage is not working");
  }
}
sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
