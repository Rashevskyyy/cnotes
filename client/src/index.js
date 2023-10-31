import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import {CssBaseline} from "@mui/material";
import App from "./App";
import {GlobalStyles} from "@mui/system";
import { ToastContainer } from "react-toastify";
import backgroundImage from './images/background2.jpg'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles styles={{ body: {
          backgroundColor: "#C4AE78",
          backgroundSize: 'contain',
          backgroundImage: `url('${backgroundImage}')`
      }}} />
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
