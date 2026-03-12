import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardPage from "./pages/Dashboard/Dashboard";
import ProfilePage from "./pages/Profile/Profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import CustomLoader from "./components/layout/CustomLoader";
import AppRouter from "./Routes/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <ThemeProvider>
          <AppRouter/>
        </ThemeProvider>
      </AppProvider>
    </Provider>
  );
}

export default App;
