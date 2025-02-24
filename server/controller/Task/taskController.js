// controller/Task/taskController.js
const Task = require('../../model/Task/Task'); // Adjust the path as necessary

// // Create a new task
// const createTask = async (req, res) => {
//     try {
//         const { UserId, TaskDetails } = req.body;

//         // Ensure each comment and tags field is saved as an array, even if given as a single string
//         const formattedTaskDetails = TaskDetails.map(detail => ({
//             ...detail,
//             comments: Array.isArray(detail.comment) ? detail.comment : (detail.comment ? [detail.comment] : []),
//             tags: Array.isArray(detail.tags) ? detail.tags : (detail.tags ? [detail.tags] : []),
//         }));

//         const task = new Task({ UserId, TaskDetails: formattedTaskDetails });
//         await task.save();
//         res.status(201).json(task);
//     } catch (error) {
//         console.error('Error creating task:', error);
//         res.status(500).json({ message: 'Failed to create task', error });
//     }
// };
// Create a new task
const createTask = async (req, res) => {
    try {
        const { UserId, TaskDetails } = req.body;

        // Format TaskDetails to ensure each comment and tags field is an array
        const formattedTaskDetails = TaskDetails.map(detail => ({
            ...detail,
            comments: Array.isArray(detail.comment) ? detail.comment : (detail.comment ? [detail.comment] : []),
            tags: Array.isArray(detail.tags) ? detail.tags : (detail.tags ? [detail.tags] : []),
        }));

        // Check if a task document exists for the given UserId
        let task = await Task.findOne({ UserId });

        if (task) {
            // If task exists, push new TaskDetails into the existing array
            task.TaskDetails.push(...formattedTaskDetails);
        } else {
            // If no task exists for this UserId, create a new task
            task = new Task({ UserId, TaskDetails: formattedTaskDetails });
        }

        // Save the task document
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task', error });
    }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
    const { userId } = req.params;
    try {
        const tasks = await Task.find({ UserId: userId });

        console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Failed to retrieve tasks', error });
    }
};

// Update a task by ID
// const updateTask = async (req, res) => {
//     const { userId, taskId } = req.params;
//     const { TaskDetails } = req.body; // This should contain the updated details of the task

//     try {
//         // Find the task by userId
//         const task = await Task.findOne({ UserId: userId });

//         if (!task) {
//             return res.status(404).json({ message: 'Task not found for this user' });
//         }
// console.log(task)
//         // Find the specific task detail to update
//         const taskDetailIndex = task.TaskDetails.findIndex(detail => detail._id.toString() === taskId);

//         if (taskDetailIndex === -1) {
//             return res.status(404).json({ message: 'Task detail not found' });
//         }

//         // Update the specific task detail
//         task.TaskDetails[taskDetailIndex] = {
//             ...task.TaskDetails[taskDetailIndex], // Keep existing data
//             ...TaskDetails[0], // Update with new data from request
//             comments: Array.isArray(TaskDetails[0].comments) ? TaskDetails[0].comments : (TaskDetails[0].comments ? [TaskDetails[0].comments] : []),
//             tags: Array.isArray(TaskDetails[0].tags) ? TaskDetails[0].tags : (TaskDetails[0].tags ? [TaskDetails[0].tags] : [])
//         };

//         // Save the updated task document
//         const updatedTask = await task.save();

//         res.status(200).json(updatedTask);
//     } catch (error) {
//         console.error('Error updating task:', error);
//         res.status(500).json({ message: 'Failed to update task', error });
//     }
// };
const updateTask = async (req, res) => {
    const { userId, taskId } = req.params;
    const { TaskDetails } = req.body; // This should contain the updated details of the task

    try {
        // Find the task by userId
        const task = await Task.findOne({ UserId: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found for this user' });
        }

        // Find the specific task detail to update
        const taskDetailIndex = task.TaskDetails.findIndex(detail => detail._id.toString() === taskId);

        if (taskDetailIndex === -1) {
            return res.status(404).json({ message: 'Task detail not found' });
        }

        // Get the existing task detail
        const existingTaskDetail = task.TaskDetails[taskDetailIndex];

        // Update the specific task detail
        task.TaskDetails[taskDetailIndex] = {
            ...existingTaskDetail, // Keep existing data
            ...TaskDetails[0], // Update with new data from request
            comments: Array.isArray(existingTaskDetail.comments) 
                ? [...existingTaskDetail.comments, ...(Array.isArray(TaskDetails[0].comment) ? TaskDetails[0].comment : [TaskDetails[0].comment]) ] 
                : (TaskDetails[0].comment ? [TaskDetails[0].comment] : []),
            tags: Array.isArray(existingTaskDetail.tags) 
                ? [...existingTaskDetail.tags, ...(Array.isArray(TaskDetails[0].tags) ? TaskDetails[0].tags : [TaskDetails[0].tags]) ] 
                : (TaskDetails[0].tags ? [TaskDetails[0].tags] : []),
        };

        // Save the updated task document
        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task', error });
    }
};


// Delete a task by ID
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).json();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task', error });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
