import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";


const composeEnhanchers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhanchers(applyMiddleware(reduxThunk)));

const root = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  root
);

// if (process.env.NODE_ENV === "development") {
//   if (module.hot) {
//     module.hot.accept("./App", () => {
//       ReactDOM.render(
//         <BrowserRouter>
//           <Provider store={store}>
//             <App />
//           </Provider>
//         </BrowserRouter>
//       );
//     });
//   }
// }
