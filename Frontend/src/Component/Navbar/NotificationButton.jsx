import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load notifications from local storage on mount
  useEffect(() => {
    const savedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(savedNotifications);
    getNotifications();

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

  // Fetch new notifications from server
  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/notifications`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // const data = response.data.message.body;
        const data = [
          { type: "review", by: "Saurav Dhakal", userid: 3, post: 12, id: 7 },
          { type: "follow", by: "Saurav Dhakal", userid: 3, id: 8 },
        ];
        // Check for new notifications and merge with stored notifications
        const savedNotifications =
          JSON.parse(localStorage.getItem("notifications")) || [];
        const newNotifications = data.filter(
          (notif) =>
            !savedNotifications.some((savedNotif) => savedNotif.id === notif.id)
        );
        const allNotifications = [...newNotifications, ...savedNotifications];
        setNotifications(allNotifications);
        localStorage.setItem("notifications", JSON.stringify(allNotifications));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark notification as read when clicked
  const handleNotificationClick = (index) => {
    const updatedNotifications = notifications.map((notif, i) =>
      i === index ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  // Toggle dropdown when clicking the button
  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  // Filter unread notifications for count
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleNotification}
        className="relative p-2 h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label={
          unreadCount > 0
            ? `You have ${unreadCount} new notifications`
            : "No new notifications"
        }
      >
        <i className="fas fa-bell text-gray-600 text-[24px]"></i>
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-red-500 rounded-full"
            aria-live="polite"
          >
            {unreadCount}
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
                {unreadCount > 0
                  ? `You have ${unreadCount} new notifications`
                  : "No new notifications"}
              </p>
            </div>
            <section className="overflow-y-auto max-h-96 pb-2">
              {notifications.map((notification, index) => (
                <button
                  key={index}
                  onClick={() => handleNotificationClick(index)}
                  className={`px-4 py-2 hover:bg-gray-200 w-full text-sm text-left ${
                    notification.read ? "text-gray-400" : ""
                  }`}
                >
                  {notification.type === "review" ? (
                    <>
                      <span className="font-bold">{notification.by} </span>
                      reviewed your recipe.
                    </>
                  ) : (
                    <>
                      <span className="font-bold">{notification.by} </span>
                      is now following you.
                    </>
                  )}
                </button>
              ))}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationButton;
