import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'

function App() {

  const [currentDate, setCurrentDate] = useState(new Date(2026, 0 )); // January 2026
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const year = 2026;
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week for the first day of the month
  firstDayOfMonth = (firstDayOfMonth + 6) % 7; // Adjust to make Monday the first day of the week

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const next = new Date(2026, prev.getMonth() + 1);
      if(next.getFullYear() > 2026) {
        return prev; // Prevent going beyond December 2026
      }
      return next;
    });

    setStartDate(null);
    setEndDate(null);
  };

  const prevMonth = () => {
    setCurrentDate((prev) => {
      const prevMon = new Date(2026, prev.getMonth() - 1);
      if(prevMon.getFullYear() < 2026) {
        return prev; // Prevent going before January 2026
      }
      return prevMon;
    });

    setStartDate(null);
    setEndDate(null);
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const handleDateClick = (date) => {
    if(!startDate) {
      setStartDate(date);
    }else if(!endDate) {
      if(date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      }else{
        setEndDate(date);
      }
    }else{
      setStartDate(date);
      setEndDate(null);
    }
  }

  const getKey = () => {
    if (!startDate) return null;

    const start = startDate;
    const end = endDate || startDate;

    return `${year}-${month}-${start}-${end}`;
  };

  useEffect(() => {
    const key = getKey();

    if (key && notes[key]) {
      setCurrentNote(notes[key]);
    } else {
      setCurrentNote("");
    }
  }, [startDate, endDate, month]);

  return (
    <div className="container">
      <div className="card">

        <div className="image">
          Hero image
        </div>

            <div className="content">
              <div className="notes">
                <textarea value={currentNote}
                    onChange={(e) => {
                    const value = e.target.value;
                    setCurrentNote(value);

                    const key = getKey();
                    if (!key) return;

                    setNotes((prev) => ({
                      ...prev,
                      [key]: value,
                    }));
                  }}
                  placeholder="Write note for selected range...">
                </textarea>
              </div>

              <div className="calendar">
                  <div className="calendar-header">
                    <button onClick={prevMonth}>◀</button>
                    <h2>{monthName} 2026</h2>
                    <button onClick={nextMonth}>▶</button>
                  </div>

                  <div className="days">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                      <div key={day}> {day} </div>
                    ))}
                  </div>
              
                  <div className="dates">
                    
                    {/* empty spaces */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={"empty-" + i}></div>
                    ))}

                    {/* //Actual dates of the month */}
                    {Array.from({length: daysInMonth}).map((_, i) => (
                      <div key={i} className={`date ${startDate === i+1 ? 'start' : ''} ${endDate === i+1 ? 'end' : ''} ${startDate && endDate && i+1 > startDate && i+1 < endDate ? 'in-range' : ''}`

                      } onClick={() => handleDateClick(i+1)} >
                        {i+1}
                      </div>
                    ))}
                  </div>
              </div>
            </div>
      </div>
    </div>
      
  )
}

export default App
