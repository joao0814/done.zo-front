import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/Login";
import { ProtectedRoute } from "../components/ProtectedRoute"; // Importe aqui
import TaskList from "../pages/TaskList";
import Metrics from "../pages/Metrics";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/metrics"
        element={
          <ProtectedRoute>
            <Metrics />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
