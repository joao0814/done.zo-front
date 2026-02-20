import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import TaskList from "./pages/TaskList";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/tasks" element={<TaskList />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
