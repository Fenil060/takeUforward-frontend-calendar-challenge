import { motion, AnimatePresence } from "framer-motion";

const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();

function Calendar({
  month,
  monthName,
  direction,
  prevMonth,
  nextMonth,
  firstDayOfMonth,
  daysInMonth,
  startDate,
  endDate,
  handleDateClick,
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={month}
        initial={{ x: direction === "next" ? 40 : -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === "next" ? -40 : 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="calendar"
      >
        <div className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <h2>{monthName} 2026</h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className="days">
          {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="dates">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={"empty-" + i}></div>
          ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {

                const dayIndex = (firstDayOfMonth + i) % 7;

                 const isToday = i + 1 === todayDate && month === todayMonth && 2026 === todayYear;


                return (
                    <motion.div
                    key={i}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.05 }}
                    className={`date
                        ${dayIndex === 5 ? 'saturday' : ''}
                        ${dayIndex === 6 ? 'sunday' : ''}
                        ${isToday ? 'today' : ''}
                        ${startDate === i+1 ? 'start' : ''}
                        ${endDate === i+1 ? 'end' : ''}
                        ${startDate && endDate && i+1 > startDate && i+1 < endDate ? 'in-range' : ''}
                    `}
                    onClick={() => handleDateClick(i+1)}
                    >
                    {i+1}
                    </motion.div>
                );
            })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Calendar;