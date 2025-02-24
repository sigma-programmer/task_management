


// AddTask.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTask.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom hook for form handling
const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };
    const resetForm = () => {
        setValues(initialValues); // Reset the form to initial values
    };
    return [values, handleChange,resetForm];
};

// Define structured icons
const icons = [
    { name: 'Check', value: 'FaCheck', svg: '✅' },
    { name: 'Cross', value: 'FaTimes', svg: '❌' },
    { name: 'Edit', value: 'FaEdit', svg: '✏️' },
    { name: 'Star', value: 'FaStar', svg: '⭐' },
    { name: 'Facebook', value: 'FaFacebook', svg: '📘' },
    { name: 'Twitter', value: 'FaTwitter', svg: '🐦' },
    { name: 'Instagram', value: 'FaInstagram', svg: '📸' },
    { name: 'LinkedIn', value: 'FaLinkedin', svg: '💼' },
];

// Main AddTask Component
const AddTask = ({ show, handleClose, handleAdd ,fetchTasks}) => {
    const [Task, handleTaskChange,resetTask] = useForm({
        // icon: '',
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        status: 'Get Started',
        comment: '',
        tags: '',
        color: '#ffffff', // Default color
    });

    const handleSubmit = async (e) => {
      const UserId = localStorage.getItem('IntaskrUser');
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API}/api/taskcreate`, {  // Adjust the endpoint if necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: UserId, // Replace with the actual user ID
                TaskDetails: [Task],
            }),
        });
        if (response.ok) {
            // handleAdd(Task);
            fetchTasks()
            resetTask()
            // toast.success('Task Created successfully!');
            handleClose();
        } else {
            console.error('Failed to save task');
            toast.error('Failed to save task.');
        }
    };

    return (
        <>
            {show && <div className="TaskModalBackdrop" onClick={handleClose}></div>}
            <div className={`TaskModal ${show ? 'TaskModalVisible' : ''}`} role="dialog" aria-modal="true">
                <div className="TaskModalContainer">
                    <div className="TaskModalHeader">
                        <h5 className="TaskModalTitle">Add Your Today's Task</h5>
                        <button onClick={handleClose} className="TaskModalCloseBtn" aria-label="Close modal">×</button>
                    </div>
                    <div className="TaskModalBody">
                        <form onSubmit={handleSubmit} noValidate>
                            {/* <div className="TaskFormGroup">
                                <label htmlFor="icon" className="TaskFormLabel">Icon</label>
                                <div className="TaskFormInputWrapper">
                                    <select
                                        id="icon"
                                        name="icon"
                                        value={Task.icon}
                                        onChange={handleTaskChange}
                                        className="TaskFormSelect"
                                    >
                                        <option value="" disabled>Select an icon</option>
                                        {icons.map(({ name, value, svg }) => (
                                            <option key={value} value={svg}>
                                                <span className="icon-option">
                                                    <span className="icon">{svg}</span>
                                                    <span className="icon-name">{name}</span>
                                                </span>
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}

                            <div className="TaskFormGroup">
                                <label htmlFor="title" className="TaskFormLabel">Task <span className="TaskFormRequired">*</span></label>
                                <div className="TaskFormInputWrapper">
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="Set a conference topic before it starts"
                                        name="title"
                                        value={Task.title}
                                        onChange={handleTaskChange}
                                        required
                                        className="TaskFormInput"
                                    />
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="description" className="TaskFormLabel">Description</label>
                                <div className="TaskFormInputWrapper">
                                    <textarea
                                        id="description"
                                        rows={3}
                                        name="description"
                                        value={Task.description}
                                        onChange={handleTaskChange}
                                        placeholder="Add description"
                                        className="TaskFormTextarea"
                                    />
                                </div>
                            </div>

                            {/* Start Date and Time */}
                            <div className="TaskFormGroup">
                                <label htmlFor="start-date-time" className="TaskFormLabel">Start Date and Time <span className="TaskFormRequired">*</span></label>
                                <div className="TaskFormInputWrapper TaskFormDatetimeGroup">
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={Task.startDate}
                                        onChange={handleTaskChange}
                                        required
                                        className="TaskFormDateInput"
                                    />
                                    <input
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        value={Task.startTime}
                                        onChange={handleTaskChange}
                                        required
                                        className="TaskFormTimeInput"
                                    />
                                </div>
                            </div>

                            {/* End Date and Time */}
                            <div className="TaskFormGroup">
                                <label htmlFor="end-date-time" className="TaskFormLabel">End Date and Time <span className="TaskFormRequired">*</span></label>
                                <div className="TaskFormInputWrapper TaskFormDatetimeGroup">
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={Task.endDate}
                                        onChange={handleTaskChange}
                                        required
                                        className="TaskFormDateInput"
                                    />
                                    <input
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        value={Task.endTime}
                                        onChange={handleTaskChange}
                                        required
                                        className="TaskFormTimeInput"
                                    />
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="status" className="TaskFormLabel">Status</label>
                                <div className="TaskFormInputWrapper">
                                    <select
                                        id="status"
                                        name="status"
                                        value={Task.status}
                                        onChange={handleTaskChange}
                                        className="TaskFormSelect"
                                    >
                                        <option value="Get Started">Get Started</option>
                                        <option value="Requests Backlog">Requests Backlog</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="comment" className="TaskFormLabel">Comment</label>
                                <div className="TaskFormInputWrapper">
                                    <textarea
                                        id="comment"
                                        rows={2}
                                        name="comment"
                                        value={Task.comment}
                                        onChange={handleTaskChange}
                                        placeholder="Add comment"
                                        className="TaskFormTextarea"
                                    />
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="tags" className="TaskFormLabel">Tags</label>
                                <div className="TaskFormInputWrapper">
                                    <input
                                        type="text"
                                        id="tags"
                                        placeholder="Add tags (comma-separated)"
                                        name="tags"
                                        value={Task.tags}
                                        onChange={handleTaskChange}
                                        className="TaskFormInput"
                                    />
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="color" className="TaskFormLabel">Select Color</label>
                                <div className="TaskFormInputWrapper">
                                    <input
                                        type="color"
                                        id="color"
                                        name="color"
                                        value={Task.color}
                                        onChange={handleTaskChange}
                                        className="TaskFormColorInput"
                                    />
                                </div>
                            </div>

                            <div className="TaskFormActions">
                                <button type="submit" className="TaskFormButton">Save Task</button>
                                <button type="button" className="TaskFormCancelButton" onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

AddTask.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
};

export default AddTask;


