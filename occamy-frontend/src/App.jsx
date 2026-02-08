import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Auth/Login";

import DashboardDistributor from "./pages/Distributor/Dashboard";
import DashboardAdmin from "./pages/Admin/Dashboard";

import CreateMeeting from "./pages/Meetings/CreateMeeting";
import MeetingList from "./pages/Meetings/MeetingList";
import MeetingDetail from "./pages/Meetings/MeetingDetail";

// Attendance pages (admin only)
import AttendanceList from "./pages/Attendance/AttendanceList";
import AttendanceDetail from "./pages/Attendance/AttendanceDetail";
import MarkAttendance from "./pages/Attendance/MarkAttendance";

// Sample pages (admin only)
import CreateSample from "./pages/Samples/CreateSample";
import SampleReport from "./pages/Samples/SampleReport";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* ================= ADMIN ================= */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />

            {/* Meetings */}
            <Route
              path="/admin/meetings"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MeetingList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/meetings/create"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CreateMeeting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/meetings/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MeetingDetail />
                </ProtectedRoute>
              }
            />

            {/* Attendance */}
            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AttendanceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance/mark"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MarkAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AttendanceDetail />
                </ProtectedRoute>
              }
            />

            {/* Samples */}
            <Route
              path="/admin/samples/create"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <CreateSample />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/samples/report"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <SampleReport />
                </ProtectedRoute>
              }
            />

            {/* ================= DISTRIBUTOR ================= */}
            <Route
              path="/distributor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["DISTRIBUTOR"]}>
                  <DashboardDistributor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/distributor/meetings"
              element={
                <ProtectedRoute allowedRoles={["DISTRIBUTOR"]}>
                  <MeetingList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/distributor/meetings/create"
              element={
                <ProtectedRoute allowedRoles={["DISTRIBUTOR"]}>
                  <CreateMeeting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/distributor/meetings/:id"
              element={
                <ProtectedRoute allowedRoles={["DISTRIBUTOR"]}>
                  <MeetingDetail />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Login />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
