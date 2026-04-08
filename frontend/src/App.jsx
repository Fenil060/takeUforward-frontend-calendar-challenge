import { useState, useEffect } from "react";
import "./App.css";

import ImageSection from "./components/ImageSection";
import Notes from "./components/Notes";
import Calendar from "./components/Calendar";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [direction, setDirection] = useState("next");

  const monthImages =  [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800",
    "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800"
  ];

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const year = 2026;
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let firstDayOfMonth = new Date(year, month, 1).getDay();
  firstDayOfMonth = (firstDayOfMonth + 6) % 7;

  const nextMonth = () => {
    setDirection("next");
    setCurrentDate(prev => new Date(2026, prev.getMonth() + 1));
    setStartDate(null);
    setEndDate(null);
  };

  const prevMonth = () => {
    setDirection("prev");
    setCurrentDate(prev => new Date(2026, prev.getMonth() - 1));
    setStartDate(null);
    setEndDate(null);
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const handleDateClick = (date) => {
    if (!startDate) setStartDate(date);
    else if (!endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const getKey = () => {
    if (!startDate) return null;
    const end = endDate || startDate;
    return `${year}-${month}-${startDate}-${end}`;
  };

  useEffect(() => {
    const key = getKey();
    setCurrentNote(key && notes[key] ? notes[key] : "");
  }, [startDate, endDate, month]);

  const currentImage = monthImages[month];

  return (
    <div className="container">
      <div className="card">

        <ImageSection
          month={month}
          currentImage={currentImage}
          monthName={monthName}
        />

        <div className="content">
          <Notes
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            getKey={getKey}
            setNotes={setNotes}
          />

          <Calendar
            month={month}
            monthName={monthName}
            direction={direction}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            firstDayOfMonth={firstDayOfMonth}
            daysInMonth={daysInMonth}
            startDate={startDate}
            endDate={endDate}
            handleDateClick={handleDateClick}
          />
        </div>

      </div>
    </div>
  );
}

export default App;