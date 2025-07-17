import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Menu from "@/components/pages/Menu";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
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
      </div>
    </Router>
  );
}

export default App;