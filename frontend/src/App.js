import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        if (showNotes) {
            fetchNotes();
        }
    }, [showNotes]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const saveNote = async () => {
        try {
            await axios.post('http://localhost:5000/api/notes', { content: note });
            setNote('');
            if (showNotes) {
                fetchNotes();
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            if (showNotes) {
                fetchNotes();
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const toggleNotes = () => {
        setShowNotes(!showNotes);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h1 style={{ color: '#333' }}>Note Taking App</h1>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your note here..."
                style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            />
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={saveNote}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    Save Note
                </button>
                <button
                    onClick={toggleNotes}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {showNotes ? 'Hide Notes' : 'List Notes'}
                </button>
            </div>
            {showNotes && (
                <ul style={{ listStyleType: 'none', padding: 0, width: '300px' }}>
                    {notes.map((note) => (
                        <li
                            key={note._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f9f9f9',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {note.content}
                            <button
                                onClick={() => deleteNote(note._id)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
