function Notes({ currentNote, setCurrentNote, getKey, setNotes }) {
  return (
    <div className="notes">
      <h4>Notes</h4>
      <textarea
        value={currentNote}
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
        placeholder="Add notes for selected dates..."
      />
    </div>
  );
}

export default Notes;