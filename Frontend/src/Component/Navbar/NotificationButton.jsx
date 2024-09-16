import React, { useState, useRef, useEffect } from "react";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState(2);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown when clicking the button
  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleNotification}
        className="relative p-2 h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label={
          notifications > 0
            ? `You have ${notifications} notifications`
            : "No new notifications"
        }
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
      {/* Notification dropdown */}
      {isOpen && (
        <>
          <div className="absolute top-13 right-3.5 w-5 h-5 z-0 transform rotate-45 bg-white border-t border-l border-white "></div>
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10">
            <div className="p-2 border-b">
              <p className="text-sm text-blue-600 ">
                {notifications > 0
                  ? `You have ${notifications} notifications`
                  : "No new notifications"}
              </p>
            </div>
            <section className="overflow-y-auto max-h-96 pb-2">
              <button className="px-4 py-2 hover:bg-gray-200 w-full text-sm text-left ">
                <span className="font-bold">Saurav Dhakal </span>is now
                following you.
              </button>
              <hr />
              <button className="px-4 py-2 hover:bg-gray-200 w-full text-sm text-left">
                <span className="font-bold">Saurav Dhakal </span>liked your
                recipe.
              </button>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationButton;
