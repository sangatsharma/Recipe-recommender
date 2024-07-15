import React, { useState } from 'react';

const NotificationButton = () => {
  const [notifications, setNotifications] = useState(0);

  // Simulate receiving a new notification
  const handleNewNotification = () => {
    setNotifications(prevNotifications => prevNotifications + 1);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleNewNotification}
        className="relative p-2 h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label={notifications > 0 ? `You have ${notifications} notifications` : 'No new notifications'}
      >
        <i className="fas fa-bell text-gray-600 text-[24px]"></i>
        {notifications > 0 && (
          <span
            className="absolute top-0 right-0 inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-red-500 rounded-full"
            aria-live="polite"
          >
            {notifications}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
