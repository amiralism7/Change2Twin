import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // This imports default styles of react-calendar
import "./Calendar.css"; // Import custom styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  // eslint-disable-next-line
  const [reminders, setReminders] = useState([
    { date: "2024-03-26", reminder: "Project deadline" },
    { date: "2024-04-01", reminder: "Maintenance" },
    // Add more reminders here
  ]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Function to find reminders for a specific day
  const findRemindersForDay = (date) => {
    return reminders.filter((r) => r.date === formatDate(date));
  };

  return (
    <div className="dashboard">
      <div className="row">
        <div className="section first-row">
          <button id="dashboard-button">Calendar</button>
        </div>
      </div>
      <div className="row">
        <div className="section huge calendar">
          <Calendar
            className="cal"
            onChange={onChange}
            value={date}
            tileContent={({ date, view }) =>
              view === "month" &&
              findRemindersForDay(date).map((reminder, index) => (
                <p key={index} className="reminder">
                  {reminder.reminder}
                </p>
              ))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;

// ! The code with the fetch request is below
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './Calendar.css';

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());
//   const [reminders, setReminders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [reminderText, setReminderText] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     fetch('http://127.0.0.1:4500/api/calendar')
//       .then(response => response.json())
//       .then(data => setReminders(data));
//   }, []);

//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const addReminder = () => {
//     const reminder = { date: formatDate(selectedDate), reminder: reminderText };
//     fetch('http://127.0.0.1:4500/api/calendar', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(reminder),
//     }).then(() => {
//       setReminders([...reminders, reminder]);
//       setShowModal(false);
//       setReminderText('');
//     });
//   };

//   const removeReminder = (reminderToRemove) => {
//     fetch('http://127.0.0.1:4500/api/calendar', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(reminderToRemove),
//     }).then(() => {
//       setReminders(reminders.filter(reminder => reminder !== reminderToRemove));
//     });
//   };

//   return (
//     <div>
//       <Calendar
//         onChange={setDate}
//         value={date}
//         onClickDay={(value) => { setSelectedDate(value); setShowModal(true); }}
//         tileContent={({ date, view }) =>
//           view === 'month' && reminders.filter(r => r.date === formatDate(date)).map((reminder, index) => (
//             <p key={index} className="reminder" onClick={() => removeReminder(reminder)}>
//               {reminder.reminder}
//             </p>
//           ))
//         }
//       />
//       {showModal && (
//         <div className="modal">
//           <input
//             type="text"
//             value={reminderText}
//             onChange={(e) => setReminderText(e.target.value)}
//             placeholder="Add reminder..."
//           />
//           <button onClick={addReminder}>Add</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarComponent;
