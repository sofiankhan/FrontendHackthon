import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Calendar, MessageSquare } from 'lucide-react';
import Students from '../components/dashboard/Students';
import Schedule from '../components/dashboard/Schedule';
import Messages from '../components/dashboard/Messages';
import { useAuth } from '../context/AuthContext';

function MentorDashboard() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <NavLink to="/dashboard" icon={<Users />} text="Students" end />
                  <NavLink to="/dashboard/schedule" icon={<Calendar />} text="Schedule" />
                  <NavLink to="/dashboard/messages" icon={<MessageSquare />} text="Messages" />
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <Routes>
                <Route path="/" element={<Students />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ to, icon, text, end = false }) {
  const location = useLocation();
  const isActive = end
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {React.cloneElement(icon, {
        className: 'h-5 w-5',
      })}
      <span>{text}</span>
    </Link>
  );
}

export default MentorDashboard;