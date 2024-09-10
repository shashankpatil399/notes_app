import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const [loading, setLoading] = useState({ save: false, fetch: false, delete: false });

    useEffect(() => {
        if (showNotes) {
            fetchNotes();
        }
    }, [showNotes]);

    const fetchNotes = async () => {
        setLoading(prev => ({ ...prev, fetch: true }));
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(prev => ({ ...prev, fetch: false }));
        }
    };

    const saveNote = async () => {
        setLoading(prev => ({ ...prev, save: true }));
        try {
            await axios.post('http://localhost:5000/api/notes', { content: note });
            setNote('');
            if (showNotes) {
                fetchNotes();
            }
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            setLoading(prev => ({ ...prev, save: false }));
        }
    };

    const deleteNote = async (id) => {
        setLoading(prev => ({ ...prev, delete: true }));
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            if (showNotes) {
                fetchNotes();
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setLoading(prev => ({ ...prev, delete: false }));
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
                    disabled={loading.save}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading.save ? 'not-allowed' : 'pointer',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {loading.save ? 'Saving...' : 'Save Note'}
                </button>
                <button
                    onClick={toggleNotes}
                    disabled={loading.fetch}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading.fetch ? 'not-allowed' : 'pointer',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {loading.fetch ? 'Loading...' : showNotes ? 'Hide Notes' : 'List Notes'}
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
                                disabled={loading.delete}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: loading.delete ? 'not-allowed' : 'pointer',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {loading.delete ? 'Deleting...' : 'Delete'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
