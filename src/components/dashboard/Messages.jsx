import React, { useState } from 'react';

const mockMessages = [
  {
    id: 1,
    student: 'Alice Johnson',
    message: 'Hi, I have a question about the latest assignment.',
    timestamp: '2024-03-10T10:30:00',
    unread: true,
  },
  {
    id: 2,
    student: 'Bob Smith',
    message: "Could we reschedule tomorrow's session?",
    timestamp: '2024-03-09T15:45:00',
    unread: false,
  },
  {
    id: 3,
    student: 'Carol Williams',
    message: 'Thank you for the feedback on my project!',
    timestamp: '2024-03-09T09:15:00',
    unread: false,
  },
];

function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    // Update the message status
    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id 
        ? { ...msg, unread: false }
        : msg
    ));

    // Show success message
    setSuccessMessage('Reply sent successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);

    // Reset form
    setReply('');
    setSelectedMessage(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message List */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`cursor-pointer p-4 rounded-lg border ${
                message.unread
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'bg-white border-gray-200'
              } hover:border-indigo-300 transition-colors`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-900">
                  {message.student}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{message.message}</p>
            </div>
          ))}
        </div>

        {/* Reply Section */}
        {selectedMessage && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Reply to {selectedMessage.student}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedMessage.message}
              </p>
            </div>
            <form onSubmit={handleSendReply}>
              <textarea
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              ></textarea>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;