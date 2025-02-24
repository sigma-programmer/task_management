import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NoteDetail.css'; // Import your CSS for styling
import Navbar from '../../../Component/Static/Navbar/Navbar';
import Footer from '../../../Component/Static/Footer/Footer';
const NoteDetail = () => {
    const { noteId } = useParams(); // Get the note ID from the URL
    const [note, setNote] = useState(null); // State to hold the note data
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchNote = async () => {
            try {
                // const UserId = localStorage.getItem('IntaskrUser'); 
                const response = await axios.get(`${process.env.REACT_APP_API}/api/notessingle/${noteId}`);
                // const response = await axios.get(`${process.env.REACT_APP_API}/api/notes/${noteId}/${UserId}`);
                setNote(response.data); // Set the fetched note data
                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.error("Error fetching note:", error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchNote();
    }, [noteId]); // Fetch the note whenever noteId changes

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching
    }

    if (!note) {
        return <div>Note not found.</div>; // Show a message if the note is not found
    }

    return (

        <>
<Navbar/>
<div className='container p-3'>

        <div className="NoteDetailContainer">
            <h1 className="NoteTitle">{note.title}</h1>
            <p className="NoteDate">{note.date}</p>
            <div className="NoteContent" dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
</div>

        <Footer/>
        </>
    );
};

export default NoteDetail;
