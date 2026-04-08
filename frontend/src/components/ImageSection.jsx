import { motion, AnimatePresence } from "framer-motion";

function ImageSection({ month, currentImage, monthName }) {
  return (
    <div className="image">
      <AnimatePresence mode="wait">
        <motion.img
          key={month}
          src={currentImage}
          alt="calendar"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="month-text">
        <p>2026</p>
        <h2>{monthName.toUpperCase()}</h2>
      </div>
    </div>
  );
}

export default ImageSection;