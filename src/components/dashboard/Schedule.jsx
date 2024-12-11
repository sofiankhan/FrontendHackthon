import React, { useState } from 'react';
import { format } from 'date-fns';

const mockSchedule = [
  {
    id: 1,
    course: 'Web Development',
    time: '10:00 AM - 11:30 AM',
    days: ['Monday', 'Wednesday'],
    students: 5,
  },
  {
    id: 2,
    course: 'React Fundamentals',
    time: '2:00 PM - 3:30 PM',
    days: ['Tuesday', 'Thursday'],
    students: 3,
  },
  {
    id: 3,
    course: 'JavaScript Advanced',
    time: '11:00 AM - 12:30 PM',
    days: ['Friday'],
    students: 4,
  },
];

function Schedule() {
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    course: '',
    time: '',
    days: [],
    duration: 60,
  });
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const meeting = {
      ...newMeeting,
      id: Date.now(),
      students: 0,
    };
    setScheduledMeetings([...scheduledMeetings, meeting]);
    setSuccessMessage('Meeting scheduled successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    setShowNewMeetingForm(false);
    setNewMeeting({ course: '', time: '', days: [], duration: 60 });
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
        <button
          onClick={() => setShowNewMeetingForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Schedule New Meeting
        </button>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {showNewMeetingForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Schedule New Meeting
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newMeeting.course}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, course: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newMeeting.time}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, time: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="15"
                step="15"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newMeeting.duration}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, duration: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days
              </label>
              <div className="space-y-2">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      checked={newMeeting.days.includes(day)}
                      onChange={(e) => {
                        const updatedDays = e.target.checked
                          ? [...newMeeting.days, day]
                          : newMeeting.days.filter((d) => d !== day);
                        setNewMeeting({ ...newMeeting, days: updatedDays });
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowNewMeetingForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {[...mockSchedule, ...scheduledMeetings].map((session) => (
            <li key={session.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-600">
                    {session.course}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {session.students} students
                  </p>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {session.time}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {session.days.join(', ')}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Schedule;