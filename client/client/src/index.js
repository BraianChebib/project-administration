import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="242773704687-gsdbi6u0td4j9nqm1iucb5r8686d0u01.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      ;
    </BrowserRouter>
  </Provider>
);
