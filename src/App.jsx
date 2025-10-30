import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import React from "react";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="bg-white shadow-lg border border-gray-200"
        bodyClassName="text-gray-800"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;