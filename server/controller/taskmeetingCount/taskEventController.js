// controllers/taskEventController.js
const Task = require('../../model/Task/Task');
const Event = require('../../model/MeetingCalender/eventModel');

// Controller function to fetch tasks and events for a specific OrgId
const getTasksAndEvents = async (req, res) => {
  try {
    const { OrgId } = req.query;  // Expecting OrgId to be passed as a query parameter

    // Fetch tasks for the OrgId
    const tasks = await Task.find({ UserId: OrgId });

    // Fetch events for the OrgId
    const events = await Event.find({ OrgId });

    // Process task counts based on status
    let scheduledCount = 0, completedCount = 0, notCompletedCount = 0, inProgressCount = 0;

    tasks.forEach(task => {
      task.TaskDetails.forEach(detail => {
        switch (detail.status) {
          case 'Get Started':
            scheduledCount++;
            break;
          case 'Requests Backlog':
            notCompletedCount++;
            break;
          case 'In Progress':
            inProgressCount++;
            break;
          case '✅Done':
            completedCount++;
            break;
          default:
            break;
        }
      });
    });

    // Prepare the response with both tasks and events data
    const response = {
      tasks: {
        scheduled: scheduledCount,
        completed: completedCount,
        notCompleted: notCompletedCount,
        inProgress: inProgressCount,
      },
      events: events.length, // Count of meetings
    };

    // Send the data back as JSON
    res.json(response);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasksAndEvents,
};
