
import React, { useState, useEffect } from 'react';
import './Note.css';
import { FaChevronRight, FaPlus, FaTrash } from "react-icons/fa";
import Editor from './Editor';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Note = () => {
    const [showNotePreview, setShowNotePreview] = useState(true);
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({
        title: '',
        date: new Date().toLocaleDateString(),
        content: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [isCopied, setIsCopied] = useState(false); // State for copy status
    const [emailInput, setEmailInput] = useState('');
    const [shareEmails, setShareEmails] = useState([]);
    
    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    };
    
    const addEmail = () => {
        const trimmedEmail = emailInput.trim();
        if (trimmedEmail && /^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            setShareEmails((prevEmails) => [...prevEmails, trimmedEmail]);
            setEmailInput(''); // Clear the input after adding
        }
    };
    
// Inside your React component
const sendEmails = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/send-bulk-emails`, {
            emails: shareEmails, // Ensure shareEmails is an array
            subject: "Note", 
            url: `${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}` // Your URL logic
        });
        console.log('Emails sent:', response.data);
        setShareEmails([]); // Clear the list after sending
        setShowSharePopup(false); // Close the popup
    } catch (error) {
        console.error('Error sending emails:', error);
        // Optionally display an error message to the user
    }
};

    const removeEmail = (index) => {
        setShareEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}`);
        setIsCopied(true); // Set copied status to true
        setTimeout(() => {
            setIsCopied(false); // Reset after 2 seconds
        }, 2000);
    };
    
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const UserId = localStorage.getItem('IntaskrUser');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/notes/${UserId}`);
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        }
    };

    const toggleNotePreview = () => {
        setShowNotePreview(!showNotePreview);
    };

    const openNewNoteForm = () => {
        setCurrentNote({
            title: '',
            date: new Date().toLocaleDateString(),
            content: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentNote(prevNote => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const saveNote = async () => {
        const UserId = localStorage.getItem('IntaskrUser');
        try {
            if (currentNote?._id) {
                await axios.put(`${process.env.REACT_APP_API}/api/notes/${currentNote._id}`, {
                    ...currentNote,
                    UserId,
                });
                toast.success('Updated successfully!');
                fetchNotes();
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API}/api/notes`, {
                    ...currentNote,
                    UserId,
                });
                setNotes([...notes, response.data]);
                toast.success('Note Created successfully!');
                setCurrentNote(response.data);
            }
        } catch (error) {
            console.error("Failed to save note", error);
            toast.error('Failed to save note.');
        }
    };

    const handleEditorChange = (value) => {
        setCurrentNote(prevNote => ({
            ...prevNote,
            content: value,
        }));
    };

    const loadNote = (note) => {
        setCurrentNote(note);
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShare = () => {
        setShowSharePopup(true);
    };



    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/api/notes/${noteId}`);
            fetchNotes();
            toast.success('Note deleted successfully!');
        } catch (error) {
            console.error('Failed to delete note:', error);
            toast.error('Failed to delete note.');
        }
    };
    const stripHtmlTags = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };
    return (
        <main>
            <div className='main-section'>
                <div className='note-container'>
                    <div className='sidebar'>
                        <h3 className='section-title TextOfPersonal' onClick={toggleNotePreview}>
                            <FaChevronRight /> Notes
                        </h3>

                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="search-barww"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {showNotePreview && (
                            <div className='note-preview'>
                                {filteredNotes.map((note) => (
                                    <div 
                                        key={note._id} 
                                        className={`note-item ${currentNote?._id === note._id ? 'selected1111ss' : ''}`} 
                                        onClick={() => loadNote(note)}
                                    >
                                    <div>

                                        <h5 className='note-title'>{note.title}</h5>
                                        <p className='note-date'>{note.date} <span>{stripHtmlTags(note.content).slice(0, 30)}{stripHtmlTags(note.content).length > 30 && '...'}</span>
</p>
                                    </div>

                                        {/* <button 
                                            className='delete-icon111' 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNote(note._id);
                                            }}
                                        > */}
                                                    <FaTrash   className='delete-icon111' 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNote(note._id);
                                            }} /> 

                                        {/* </button> */}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='add-note' onClick={openNewNoteForm}>
                            <FaPlus /> Add Note
                        </div>
                    </div>

                    <div className='editor-section'>
                        <div className='editor-header'>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Enter title..."
                                value={currentNote?.title || ''}
                                onChange={handleInputChange}
                                className='editor-title HeadingsOfNotes'
                            />
                            {currentNote?._id ? (
                                <>
                                    <button className='update-button ButtonOfNoteShare' onClick={saveNote}>Update</button>
                                    <button className='share-button ButtonOfNoteShare' onClick={handleShare}>Share</button>
                                </>
                            ) : (
                                <button className='save-button ButtonOfNoteShare' onClick={saveNote}>Save</button>
                            )}
                        </div>

                        <Editor 
                            content={currentNote?.content || ''}
                            onChange={handleEditorChange} 
                        />
                    </div>
                </div>
            </div>

            {showSharePopup && (
    <div className='BaackShareScreen'>
        <div className='share-bUILKsHARE'>
                        {/* Close Icon */}
                        <span className='close-iconffff' onClick={() => setShowSharePopup(false)}>
                ✖ {/* You can replace this with an actual icon if needed */}
            </span>
            <h4>Share Note</h4>

            <div className='url-container'>
                <input 
                    type="text" 
                    value={`${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}`} 
                    readOnly // Make it read-only
                    className='url-input'
                />
                   <span 
                            className='copy-button' 
                            onClick={handleCopy} // Call handleCopy function
                        >
                            {isCopied ? '✅' : '📋'} {/* Change icon based on isCopied */}
                        </span>
            </div>

            <input 
                type="text" 
                placeholder="Enter emails separated by commas" 
                value={emailInput}
                onChange={handleEmailInput}
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        addEmail(); // Add email on space key
                    }
                }}
                className={`email-inputBuilShare ${/^\S+@\S+\.\S+$/.test(emailInput) ? 'valid' : 'invalid'}`}
            />
            <div className='email-bULKsHARE'>
    {shareEmails.map((email, index) => (
        <span key={index} className='email-itemBulkShare'>
            {email}
            <span 
                className='delete-button11' 
                onClick={() => removeEmail(index)} // Call the removeEmail function
            >
                ✖ {/* Cross icon for deleting */}
            </span>
        </span>
    ))}
</div>

            
            <button onClick={sendEmails}>Send</button>
        </div>
    </div>
)}

            <ToastContainer />
        </main>
    );
};

export default Note;


// import React, { useState, useEffect } from 'react';
// import './Note.css';
// import { FaChevronRight, FaPlus, FaTrash } from "react-icons/fa";
// import Editor from './Editor';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Note = () => {
//     const [showNotePreview, setShowNotePreview] = useState(true);
//     const [notes, setNotes] = useState([]);
//     const [currentNote, setCurrentNote] = useState({
//         title: '',
//         date: new Date().toLocaleDateString(),
//         content: '',
//     });
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showSharePopup, setShowSharePopup] = useState(false);
//     const [emails, setEmails] = useState([]);
//     const [shareUrl, setShareUrl] = useState('');

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const fetchNotes = async () => {
//         const UserId = localStorage.getItem('IntaskrUser');
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API}/api/notes/${UserId}`);
//             setNotes(response.data);
//         } catch (error) {
//             console.error("Failed to fetch notes", error);
//         }
//     };

//     const toggleNotePreview = () => {
//         setShowNotePreview(!showNotePreview);
//     };

//     const openNewNoteForm = () => {
//         setCurrentNote({
//             title: '',
//             date: new Date().toLocaleDateString(),
//             content: '',
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             [name]: value,
//         }));
//     };

//     const saveNote = async () => {
//         const UserId = localStorage.getItem('IntaskrUser');
//         try {
//             if (currentNote?._id) {
//                 // Update existing note
//                 await axios.put(`${process.env.REACT_APP_API}/api/notes/${currentNote._id}`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 toast.success('Updated successfully!');
//                 fetchNotes();
//             } else {
//                 // Save new note
//                 const response = await axios.post(`${process.env.REACT_APP_API}/api/notes`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 setNotes([...notes, response.data]);
//                 toast.success('Note Created successfully!');
//                 setCurrentNote(response.data); // Set current note to the saved note
//             }
//         } catch (error) {
//             console.error("Failed to save note", error);
//             toast.error('Failed to save note.');
//         }
//     };

//     const handleEditorChange = (value) => {
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             content: value,
//         }));
//     };

//     const loadNote = (note) => {
//         setCurrentNote(note);
//     };

//     const filteredNotes = notes.filter(note =>
//         note.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleShare = () => {
//         const url = `${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}`;
//         setShareUrl(url);
//         setShowSharePopup(true);
//     };

//     const handleEmailChange = (e) => {
//         const value = e.target.value;
//         const emailList = value.split(',').map(email => email.trim());
//         setEmails(emailList);
//     };

//     const handleSendEmails = async () => {
//         const validEmails = emails.filter(email => validateEmail(email));
        
//         if (validEmails.length) {
//             try {
//                 await axios.post(`${process.env.REACT_APP_API}/api/sendNote`, {
//                     emails: validEmails,
//                     url: shareUrl,
//                 });
//                 toast.success("Emails sent successfully!");
//             } catch (error) {
//                 console.error("Failed to send emails:", error);
//                 toast.error("Failed to send emails.");
//             }
//         } else {
//             toast.error("Please enter valid emails.");
//         }
//     };

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(shareUrl).then(() => {
//             toast.success("Link copied to clipboard!");
//         });
//     };

//     const handleDeleteNote = async (noteId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_API}/api/notes/${noteId}`);
//             fetchNotes();
//             toast.success('Note deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete note:', error);
//             toast.error('Failed to delete note.');
//         }
//     };

//     return (
//         <main>
//             <div className='main-section'>
//                 <div className='note-container'>
//                     <div className='sidebar'>
//                         <h3 className='section-title TextOfPersonal' onClick={toggleNotePreview}>
//                             <FaChevronRight /> Notes
//                         </h3>

//                         <input
//                             type="text"
//                             placeholder="Search notes..."
//                             className="search-barww"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />

//                         {showNotePreview && (
//                             <div className='note-preview'>
//                                 {filteredNotes.map((note) => (
//                                     <div
//                                         key={note._id}
//                                         className={`note-item ${currentNote?._id === note._id ? 'selected1111ss' : ''}`}
//                                         onClick={() => loadNote(note)}
//                                     >
//                                         <div>
//                                             <h5 className='note-title'>{note.title}</h5>
//                                             <p className='note-date'>{note.date} <span>{stripHtmlTags(note.content).slice(0, 30)}{stripHtmlTags(note.content).length > 30 && '...'}</span></p>
//                                         </div>
//                                         <FaTrash className='delete-icon111' onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleDeleteNote(note._id);
//                                         }} />
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div className='add-note' onClick={openNewNoteForm}>
//                             <FaPlus /> Add Note
//                         </div>
//                     </div>

//                     <div className='editor-section'>
//                         <div className='editor-header'>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 placeholder="Enter title..."
//                                 value={currentNote?.title || ''}
//                                 onChange={handleInputChange}
//                                 className='editor-title HeadingsOfNotes'
//                             />
//                             {currentNote?._id ? (
//                                 <>
//                                     <button className='update-button ButtonOfNoteShare' onClick={saveNote}>Update</button>
//                                     <button className='share-button ButtonOfNoteShare' onClick={handleShare}>Share</button>
//                                 </>
//                             ) : (
//                                 <button className='save-button ButtonOfNoteShare' onClick={saveNote}>Save</button>
//                             )}
//                         </div>

//                         <Editor
//                             content={currentNote?.content || ''}
//                             onChange={handleEditorChange}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Share Popup */}
//             {showSharePopup && (
//                 <div className="share-popup">
//                     <div className="popup-content">
//                         <h3>Share Note</h3>
//                         <p>URL to share:</p>
//                         <input type="text" value={shareUrl} readOnly />
//                         <button onClick={copyToClipboard}>Copy Link</button>
//                         <div>
//                             <p>Enter emails (comma-separated):</p>
//                             <input
//                                 type="text"
//                                 placeholder="Enter emails..."
//                                 onChange={handleEmailChange}
//                                 className="email-input"
//                                 style={{
//                                     border: emails.some(email => !validateEmail(email)) ? '2px solid red' : '2px solid green'
//                                 }}
//                             />
//                         </div>
//                         <button onClick={handleSendEmails}>Send Link</button>
//                         <button onClick={() => setShowSharePopup(false)}>Close</button>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </main>
//     );
// };

// export default Note;



// import React, { useState, useEffect } from 'react';
// import './Note.css';
// import { FaChevronRight, FaPlus ,FaTrash } from "react-icons/fa";
// import Editor from './Editor';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Note = () => {
//     const [showNotePreview, setShowNotePreview] = useState(true);
//     const [notes, setNotes] = useState([]);
//     const [currentNote, setCurrentNote] = useState({
//         title: '',
//         date: new Date().toLocaleDateString(),
//         content: '',
//     });
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const fetchNotes = async () => {
//         const UserId = localStorage.getItem('IntaskrUser');
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API}/api/notes/${UserId}`);
//             setNotes(response.data);
//         } catch (error) {
//             console.error("Failed to fetch notes", error);
//         }
//     };

//     const toggleNotePreview = () => {
//         setShowNotePreview(!showNotePreview);
//     };

//     const openNewNoteForm = () => {
//         setCurrentNote({
//             title: '',
//             date: new Date().toLocaleDateString(),
//             content: '',
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             [name]: value,
//         }));
//     };

//     const saveNote = async () => {
//         const UserId = localStorage.getItem('IntaskrUser');

//         try {
//             if (currentNote?._id) {
//                 // Update existing note
//                 await axios.put(`${process.env.REACT_APP_API}/api/notes/${currentNote._id}`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 toast.success('Updated successfully!');
//                 fetchNotes();
//             } else {
//                 // Save new note
//                 const response = await axios.post(`${process.env.REACT_APP_API}/api/notes`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 setNotes([...notes, response.data]);
//                 toast.success('Note Created successfully!');
//                 setCurrentNote(response.data); // Set current note to the saved note
//             }
//         } catch (error) {
//             console.error("Failed to save note", error);
//             toast.error('Failed to save note.');
//         }
//     };

//     const handleEditorChange = (value) => {
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             content: value,
//         }));
//     };

//     const loadNote = (note) => {
//         setCurrentNote(note);
//     };

//     const filteredNotes = notes.filter(note => 
//         note.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleShare = () => {
//         const shareUrl = `${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}`;
//         if (navigator.share) {
//             navigator.share({
//                 title: currentNote.title,
//                 text: 'Check out this note!',
//                 url: shareUrl,
//             })
//             .then(() => console.log('Share successful'))
//             .catch((error) => console.error('Error sharing:', error));
//         } else {
//             navigator.clipboard.writeText(shareUrl).then(() => {
//                 alert('Link copied to clipboard: ' + shareUrl);
//             }).catch(err => {
//                 console.error('Failed to copy: ', err);
//             });
//         }
//     };

//     const stripHtmlTags = (html) => {
//         const tmp = document.createElement("DIV");
//         tmp.innerHTML = html;
//         return tmp.textContent || tmp.innerText || "";
//     };

//     const handleDeleteNote = async (noteId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_API}/api/notes/${noteId}`);
//             fetchNotes();

//             toast.success('Note deleted successfully!');
            
//         } catch (error) {
//             console.error('Failed to delete note:', error);
//             toast.error('Failed to delete note.');
            
//         }
//     };

//     return (
//         <main>
//             <div className='main-section'>
//                 <div className='note-container'>
//                     <div className='sidebar'>
//                         <h3 className='section-title TextOfPersonal' onClick={toggleNotePreview}>
//                             <FaChevronRight /> Notes
//                         </h3>

//                         <input
//                             type="text"
//                             placeholder="Search notes..."
//                             className="search-barww"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />

//                         {showNotePreview && (
//                             <div className='note-preview'>
//                                 {filteredNotes.map((note) => (
//                                     <div 
//                                         key={note._id} 
//                                         className={`note-item ${currentNote?._id === note._id ? 'selected1111ss' : ''}`} 
//                                         onClick={() => loadNote(note)}
//                                     >
//                                     <div>

//                                         <h5 className='note-title'>{note.title}</h5>
//                                         <p className='note-date'>{note.date} <span>{stripHtmlTags(note.content).slice(0, 30)}{stripHtmlTags(note.content).length > 30 && '...'}</span>
// </p>
//                                     </div>

//                                         {/* <button 
//                                             className='delete-icon111' 
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleDeleteNote(note._id);
//                                             }}
//                                         > */}
//                                                     <FaTrash   className='delete-icon111' 
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleDeleteNote(note._id);
//                                             }} /> 

//                                         {/* </button> */}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div className='add-note' onClick={openNewNoteForm}>
//                             <FaPlus /> Add Note
//                         </div>
//                     </div>

//                     <div className='editor-section'>
//                         <div className='editor-header'>
//                             <input 
//                                 type="text" 
//                                 name="title"
//                                 placeholder="Enter title..."
//                                 value={currentNote?.title || ''}
//                                 onChange={handleInputChange}
//                                 className='editor-title HeadingsOfNotes'
//                             />
//                             {currentNote?._id ? (
//                                 <>
//                                     <button className='update-button ButtonOfNoteShare' onClick={saveNote}>Update</button>
//                                     <button className='share-button ButtonOfNoteShare' onClick={handleShare}>Share</button>
//                                 </>
//                             ) : (
//                                 <button className='save-button ButtonOfNoteShare' onClick={saveNote}>Save</button>
//                             )}
//                         </div>

//                         <Editor 
//                             content={currentNote?.content || ''}
//                             onChange={handleEditorChange} 
//                         />
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </main>
//     );
// };

// export default Note;


// import React, { useState, useEffect } from 'react';
// import './Note.css';
// import { FaChevronRight, FaPlus } from "react-icons/fa";
// import Editor from './Editor';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Note = () => {
//     const [showNotePreview, setShowNotePreview] = useState(true);
//     const [notes, setNotes] = useState([]);
//     const [currentNote, setCurrentNote] = useState({
//         title: '',
//         date: new Date().toLocaleDateString(),
//         content: '',
//     });
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const fetchNotes = async () => {
//         const UserId = localStorage.getItem('IntaskrUser'); // Retrieve UserId from localStorage
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API}/api/notes/${UserId}`);
//             setNotes(response.data);
//         } catch (error) {
//             console.error("Failed to fetch notes", error);
//         }
//     };

//     const toggleNotePreview = () => {
//         setShowNotePreview(!showNotePreview);
//     };

//     const openNewNoteForm = () => {
//         setCurrentNote({
//             title: '',
//             date: new Date().toLocaleDateString(),
//             content: '',
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             [name]: value,
//         }));
//     };

//     const saveNote = async () => {
//         const UserId = localStorage.getItem('IntaskrUser'); // Retrieve UserId from localStorage

//         try {
//             if (currentNote?._id) {
//                 // Update existing note
//                 await axios.put(`${process.env.REACT_APP_API}/api/notes/${currentNote._id}`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 toast.success('Updated successfully!');
//                 fetchNotes();
//             } else {
//                 // Save new note
//                 const response = await axios.post(`${process.env.REACT_APP_API}/api/notes`, {
//                     ...currentNote,
//                     UserId,
//                 });
//                 setNotes([...notes, response.data]);
//                 toast.success('Note Created successfully!');
//             }
//             openNewNoteForm(); // Reset form after saving
//         } catch (error) {
//             console.error("Failed to save note", error);
//             toast.error('Failed to save note.');
//         }
//     };

//     const handleEditorChange = (value) => {
//         setCurrentNote(prevNote => ({
//             ...prevNote,
//             content: value,
//         }));
//     };

//     const loadNote = (note) => {
//         setCurrentNote(note);
//     };

//     // Filter notes based on search term
//     const filteredNotes = notes.filter(note => 
//         note.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleShare = () => {
//         const shareUrl = `${process.env.REACT_APP_URL_FRONTEND}/notes/${currentNote._id}`; // Assuming this is your sharing URL structure
//         if (navigator.share) {
//             navigator.share({
//                 title: currentNote.title,
//                 text: 'Check out this note!',
//                 url: shareUrl,
//             })
//             .then(() => console.log('Share successful'))
//             .catch((error) => console.error('Error sharing:', error));
//         } else {
//             // Fallback for browsers that don't support the Web Share API
//             navigator.clipboard.writeText(shareUrl).then(() => {
//                 alert('Link copied to clipboard: ' + shareUrl);
//             }).catch(err => {
//                 console.error('Failed to copy: ', err);
//             });
//         }
//     };
    // const stripHtmlTags = (html) => {
    //     const tmp = document.createElement("DIV");
    //     tmp.innerHTML = html;
    //     return tmp.textContent || tmp.innerText || "";
    // };

//      // Function to handle deleting a note
//      const handleDeleteNote = async (noteId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_API}/api/notes/${noteId}`);
//             // Remove the deleted note from the list
//             fetchNotes()
//             alert('Note deleted successfully');
//         } catch (error) {
//             console.error('Failed to delete note:', error);
//             alert('Failed to delete note');
//         }
//     };

    
//     return (
//         <main>
//             <div className='main-section'>
//                 <div className='note-container'>
//                     <div className='sidebar'>
//                         <h3 className='section-title TextOfPersonal' onClick={toggleNotePreview}>
//                             <FaChevronRight /> Notes
//                         </h3>

//                         {/* Search Bar */}
//                         <input
//                             type="text"
//                             placeholder="Search notes..."
//                             className="search-barww"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />

//                         {showNotePreview && (
//                             <div className='note-preview'>
//                                 {filteredNotes.map((note) => (
//                                     <div 
//                                         key={note._id} 
//                                         className={`note-item ${currentNote?._id === note._id ? 'selected1111ss' : ''}`} 
//                                         onClick={() => loadNote(note)}
//                                     >
//                                         <h5 className='note-title'>{note.title}</h5>
//                                         <p className='note-date'>{note.date} <span>{stripHtmlTags(note.content).slice(0, 30)}{stripHtmlTags(note.content).length > 30 && '...'}</span>
// </p>


// <button 
//                                 className='delete-icon111' 
//                                 onClick={(e) => {
//                                     e.stopPropagation(); // Prevent triggering loadNote
//                                     handleDeleteNote(note._id);
//                                 }}
//                             >
//                                 🗑️
//                             </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div className='add-note' onClick={openNewNoteForm}>
//                             <FaPlus /> Add Note
//                         </div>
//                     </div>

//                     <div className='editor-section'>
//                         <div className='editor-header'>
//                             <input 
//                                 type="text" 
//                                 name="title"
//                                 placeholder="Enter title..."
//                                 value={currentNote?.title || ''} // Ensure title is not null
//                                 onChange={handleInputChange}
//                                 className='editor-title HeadingsOfNotes'
//                             />
//                             {currentNote?._id ? (
//                                 <>
//                                     <button className='update-button ButtonOfNoteShare' onClick={saveNote}>Update</button>
//                                     <button className='share-button ButtonOfNoteShare' onClick={handleShare}>Share</button>
//                                 </>
//                             ) : (
//                                 <button className='save-button ButtonOfNoteShare' onClick={saveNote}>Save</button>
//                             )}
//                         </div>

//                         <Editor 
//                             content={currentNote?.content || ''} // Default to empty string if null
//                             onChange={handleEditorChange} 
//                         />
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </main>
//     );
// };

// export default Note;

