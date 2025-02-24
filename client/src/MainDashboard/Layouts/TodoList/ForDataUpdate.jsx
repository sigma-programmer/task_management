import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom hook for form handling
const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return [values, handleChange];
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

const ForDataUpdate = ({ show, setShowAddTask1, activeListId1 ,fetchTasks}) => {
    const [Task, handleTaskChange] = useForm({
        icon: '',
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

    // Set the initial task values when the component mounts or activeListId1 changes
    useEffect(() => {
        if (activeListId1) {
            handleTaskChange({
                target: { name: 'icon', value: activeListId1.icon },
            });
            handleTaskChange({
                target: { name: 'title', value: activeListId1.text },
            });
            handleTaskChange({
                target: { name: 'description', value: activeListId1.description },
            });
            handleTaskChange({
                target: { name: 'startDate', value: activeListId1.startDate.split('T')[0] },
            });
            handleTaskChange({
                target: { name: 'startTime', value: activeListId1.startTime },
            });
            handleTaskChange({
                target: { name: 'endDate', value: activeListId1.endDate.split('T')[0] },
            });
            handleTaskChange({
                target: { name: 'endTime', value: activeListId1.endTime },
            });
            handleTaskChange({
                target: { name: 'status', value: activeListId1.status || 'Get Started' },
            });
            // handleTaskChange({
            //     target: { name: 'comment', value: activeListId1.comments || '' },
            // });
            // handleTaskChange({
            //     target: { name: 'tags', value: activeListId1.tags || '' },
            // });
            handleTaskChange({
                target: { name: 'color', value: activeListId1.color },
            });
        }
    }, [activeListId1]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const UserId = localStorage.getItem('IntaskrUser');
        const response = await fetch(`${process.env.REACT_APP_API}/api/updatetask/${UserId}/${activeListId1.id}`, { // Use the taskId to update
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TaskDetails: [{ ...Task }], // Ensure we send the updated Task object
            }),
        });

        if (response.ok) {
            fetchTasks()
            // toast.success('Task Updated successfully!');
            // Optionally, you could fetch the updated task list here or update your local state
            setShowAddTask1(false);
        } else {
            console.error('Failed to update task');
            toast.error('Failed to update task.');
        }
    };

    return (
        <>
            {show && <div className="TaskModalBackdrop" onClick={() => setShowAddTask1(false)}></div>}
            <div className={`TaskModal ${show ? 'TaskModalVisible' : ''}`} role="dialog" aria-modal="true">
                <div className="TaskModalContainer">
                    <div className="TaskModalHeader">
                        <h5 className="TaskModalTitle">Update Your Task</h5>
                        <button onClick={() => setShowAddTask1(false)} className="TaskModalCloseBtn" aria-label="Close modal">×</button>
                    </div>
                    <div className="TaskModalBody">
                        <form onSubmit={handleUpdate} noValidate>
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
                                        <option value="✅Done">✅Done</option>
                                    </select>
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="comment" className="TaskFormLabel">Comments</label>
                                <div className="TaskFormInputWrapper">
                                    <textarea
                                        id="comment"
                                        rows={3}
                                        name="comment"
                                        value={Task.comment}
                                        onChange={handleTaskChange}
                                        placeholder="Add comments"
                                        className="TaskFormTextarea"
                                    />

{
                                        activeListId1.comments1
                                    }
                                </div>


                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="tags" className="TaskFormLabel">Tags</label>
                                <div className="TaskFormInputWrapper">
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={Task.tags}
                                        onChange={handleTaskChange}
                                        placeholder="Add tags"
                                        className="TaskFormInput"
                                    />

{
                                        activeListId1.tags
                                    }
                                </div>
                            </div>

                            <div className="TaskFormGroup">
                                <label htmlFor="color" className="TaskFormLabel">Color</label>
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
                                <button type="submit" className="TaskFormButton">Update Task</button>
                                <button type="button" onClick={() => setShowAddTask1(false)} className="TaskFormCancelButton">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ForDataUpdate;


