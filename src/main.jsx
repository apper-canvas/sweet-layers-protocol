import "react-toastify/dist/ReactToastify.css"
import './index.css'
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "@/App";
import store from "@/store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />