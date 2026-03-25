const DisplayData = ({ items, onDelete }: any) => {
  return (
    <div className="notes-grid">
      {items.map((note: any) => (
        <div key={note.id} className="note-card">
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{note.content}</p>
          <div style={{ marginTop: '15px', fontSize: '0.75rem', opacity: 0.4 }}>
            {note.date}
          </div>
          <button 
            onClick={() => onDelete(note.id)} 
            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.8rem', marginTop: '10px', padding: '0' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default DisplayData;