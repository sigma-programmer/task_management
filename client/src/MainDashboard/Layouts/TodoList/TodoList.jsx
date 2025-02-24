


// ------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import './TodoList.css';
import axios from 'axios';
import AddTask from './AddTask';
import ForDataUpdate from './ForDataUpdate';

const taskColors = {
  "Pricing page": "#007AFF",
  "Google Chrome Extension Redesign": "#FF9500",
  "Home page": "#FF2D55",
  "Schedule custom reporting": "#FF9500",
  "Billing and Checkout": "#FF2D55",
  "Serp Checker": "#FF9500",
  "Keywords Discovery": "#007AFF"
};

const defaultColor = "#808080";















const initialLists = [
  {
    id: 1,
    title: "Get Started",
    color: "#ef4444",
    tasks: [
      // { id: 1, text: "Welcome to your board 👉", description: "Here you'll submit and manage...", completed: false, icon: "👋" },
      
    ],
  },
  {
    id: 2,
    title: "Requests Backlog",
    color: "#f59e0b",
    // icon: "✏️",
    tasks: [
      // { id: 5, text: "Pricing page", description: "https://whatsmyserp.com/pricing", completed: false, subTasks: "0/4", date: "Friday", comments: 2, tag: "Website +2" },
      ],
  },
  {
    id: 3,
    title: "In Progress",
    color: "#3b82f6",
    // icon: "🛠️",
    tasks: [
      // { id: 11, text: "Home page", description: "https://whatsmyserp.com", completed: false, subTasks: "2/2", date: "Today", comments: 8, tag: "Needs review +1" },
      
    ],
  },
  {
    id: 4,
    title: "Done",
    color: "#10b981",
    tasks: [
   
      // { id: 14, text: "Billing and Checkout", description: "Need higher conversion rates...", completed: true, subTasks: "1/1", date: "Nov 28", comments: 6, tag: "Web app +2" },
    
    ],
  },
];
function TodoList() {
  
  const [lists, setLists] = useState(() =>
    initialLists.map(list => ({
      ...list,
      tasks: list.tasks.map(task => ({
        ...task,
        color: taskColors[task.text] || defaultColor
      }))
    }))
  );

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem('IntaskrUser');
      const response = await axios.get(`${process.env.REACT_APP_API}/api/alltask/${userId}`);
      const fetchedTasks = response.data;

      const updatedLists = initialLists.map(list => {
        // Extract tasks for the current list
        const tasksForList = fetchedTasks.flatMap(task => task.TaskDetails)
          .filter(taskItem => taskItem.status === list.title);

        return {
          ...list,
          tasks: [
            ...list.tasks, // Existing tasks in the list
            ...tasksForList.map((taskItem) => ({
              id: taskItem._id, // Use MongoDB _id as unique ID
              text: taskItem.title,
              description: taskItem.description,
              startDate: taskItem.startDate, // Added startDate
              startTime: taskItem.startTime, // Added startTime
              endDate: taskItem.endDate, // Added endDate
              endTime: taskItem.endTime, // Added endTime
              completed: taskItem.status === "Done", // Determine completion status
              icon: taskItem.icon,
              notifyDuration: taskItem.notifyDuration, // Added notifyDuration
              comments: taskItem.comments.length, // Count comments
              comments1: taskItem.comments.join(', '), // Count comments
              tags: taskItem.tags.join(', '), // Convert tags to a string for display
              color: taskItem.color || "#808080" // Use task color or default gray
            }))
          ],
        };
      });

      setLists(updatedLists);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
useEffect(() => {

  fetchTasks();
}, []);
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  
  const handleShowAddTask = (listId) => {
    setActiveListId(listId);
    setShowAddTask(true);
  };
  
  const handleCloseAddTask = () => {
    setShowAddTask(false);
  };
  
  const addTask = (newTask) => {
    if (activeListId !== 1) return;
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      color: defaultColor
    };
    setLists(prevLists => prevLists.map(list =>
      list.id === activeListId ? { ...list, tasks: [...list.tasks, taskWithId] } : list
    ));
  };

  const toggleTask = (listId, taskId) => {
    setLists(prevLists => prevLists.map(list =>
      list.id === listId ? {
        ...list,
        tasks: list.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      } : list
    ));
  };

  return (
    <div className="Todocontainer d-flex flex-column">
      <h1 className="TodoTitle fw-bold text-start w-100">Task</h1>
      <div className="row">
        {lists.map(list => (
          <>

         

          <ListColumn
            key={list.id}
            list={list}
            addTask={() => handleShowAddTask(list.id)}
            toggleTask={toggleTask}
            fetchTasks={fetchTasks}
          />
          </>
        ))}
      </div>
      <AddTask
        show={showAddTask}
        handleClose={handleCloseAddTask}
        handleAdd={addTask}

        fetchTasks={fetchTasks}
      />
    </div>
  );
}

function ListColumn({ list, addTask, toggleTask ,fetchTasks}) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="ListHeader px-0" style={{ borderColor: list.color }}>
        <div className="d-flex align-items-center gap-2">
          <h2>{list.icon && <span className="ListIcon">{list.icon}</span>}{list.title}</h2>
          <span className="TaskCount">{list.tasks.length}</span>
        </div>
        <div className="header-right">
          <button className="Moreoptions">...</button>
        </div>
      </div>
      <div className="TasksContainer pt-2">
        {list.tasks.map((task) => (
          <Task key={task.id} task={task} fetchTasks={fetchTasks} toggleTask={() => toggleTask(list.id, task.id)} />
        ))}
        {list.id === 1 && (
          <button className="addtask" onClick={addTask}>
            + Add task
          </button>
        )}
      </div>
    </div>
  );
}

function Task({ task, toggleTask ,fetchTasks}) {


  const [showAddTask1, setShowAddTask1] = useState(false);
  const [activeListId1, setActiveListId1] = useState("");


  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    
    // Get day, date, and month
    const day = date.toLocaleString('default', { weekday: 'long' }); // Full name of the day (e.g., "Sunday")
    const dayOfMonth = date.getDate(); // Day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Full name of the month (e.g., "November")
  
    return `${dayOfMonth}, ${day}, ${month}`;
  }
  



const handleDataForUpdate=(task)=>{
console.log("----------------------")
console.log(task)
setActiveListId1(task)
setShowAddTask1(true)
console.log("----------------------")
}


  return (
    <>

    <div className={`task ${task.completed ? 'completed' : ''}`}  onClick={() => handleDataForUpdate(task)}  >

    {/* {task.color} */}
      <div
        className="CustomCheckbox"
        style={{ '--task-color': task.color }}
        onClick={toggleTask}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      <div className="TaskContent">
        <div className="TaskTitle">
          {task.icon} {task.text} 
        </div>
        {task.description && <div className="TaskDescription">{task.description}</div>}


        {task.startDate && <>


        <div className="TaskDate p-0">
       
          <span>Start:   <i className="bx bxs-calendar me-1 fs-6" style={{color:task.color}}></i> {formatDate(task.startDate)}</span>
        </div>
        <div className="TaskDate p-0">
          <span >End:    <i className="bx bxs-calendar me-1 fs-6" style={{color:"red"}}></i> {formatDate(task.endDate)}</span>
        </div>

        </>}

        <TaskMeta task={task} />
      </div>
    </div>
    <ForDataUpdate fetchTasks={fetchTasks} show={showAddTask1} setShowAddTask1={setShowAddTask1} activeListId1={activeListId1} setActiveListId1={setActiveListId1}/>
    </>
  );
}

function TaskMeta({ task }) {
 

  return (
    <div className="TaskMeta">
      {/* {task.subTasks && (
        <span className="TaskSubTask">
          <i className="bx bx-menu-alt-right fs-6 me-1"></i>
          {task.subTasks}
        </span>
      )} */}
      {/* {task.date && (
        <span className="TaskDate" style={getDateStyles()}>
          <i className="bx bxs-calendar me-1 fs-6"></i>
          {task.date}
        </span>
      )} */}
      {task.comments && (
        <span className="TaskComments">
          <i className="bx bx-message me-1"></i>
          {task.comments}
        </span>
      )}
      {task.tags && (
        <span className="TaskTag">
          <i className="bx bx-purchase-tag-alt me-1"></i>
          {task.tags}
        </span>
      )}
    </div>
  );
}

export default TodoList;







// // ------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './TodoList.css';
// import axios from 'axios';
// import AddTask from './AddTask';

// const taskColors = {
//   "Pricing page": "#007AFF",
//   "Google Chrome Extension Redesign": "#FF9500",
//   "Home page": "#FF2D55",
//   "Schedule custom reporting": "#FF9500",
//   "Billing and Checkout": "#FF2D55",
//   "Serp Checker": "#FF9500",
//   "Keywords Discovery": "#007AFF"
// };

// const defaultColor = "#808080";















// const initialLists = [
//   {
//     id: 1,
//     title: "Get Started",
//     color: "#ef4444",
//     tasks: [
//       { id: 1, text: "Welcome to your board 👉", description: "Here you'll submit and manage...", completed: false, icon: "👋" },
//       { id: 2, text: "Find your files", description: "UI Flip keeps a record of all yo...", completed: false, icon: "🔗" },
//       { id: 3, text: "Branding & Assets", description: "Please, attach any relevant do...", completed: false, icon: "🎨" },
//       { id: 4, text: "Manage your subscription", description: "To manage your subscription,...", completed: false, icon: "💳" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Requests Backlog",
//     color: "#f59e0b",
//     icon: "✏️",
//     tasks: [
//       { id: 5, text: "Pricing page", description: "https://whatsmyserp.com/pricing", completed: false, subTasks: "0/4", date: "Friday", comments: 2, tag: "Website +2" },
//       { id: 6, text: "Contact us page", date: "20 April", completed: false },
//       { id: 7, text: "Google Chrome Extension Redesign", completed: false },
//       { id: 8, text: "X/Twitter Cover", completed: false },
//       { id: 9, text: "LinkedIn Covers", completed: false },
//       { id: 10, text: "Facebook Cover", completed: false },
//     ],
//   },
//   {
//     id: 3,
//     title: "In Progress",
//     color: "#3b82f6",
//     icon: "🛠️",
//     tasks: [
//       { id: 11, text: "Home page", description: "https://whatsmyserp.com", completed: false, subTasks: "2/2", date: "Today", comments: 8, tag: "Needs review +1" },
//       { id: 12, text: "Schedule custom reporting", description: "", completed: false, subTasks: "0/1", date: "Tomorrow", comments: 1, tag: "Web app +2" },
//     ],
//   },
//   {
//     id: 4,
//     title: "✅Done",
//     color: "#10b981",
//     tasks: [
//       { id: 13, text: "Search history for Backlinks and Keywords tool", subTasks: "2/2", completed: true },
//       { id: 14, text: "Billing and Checkout", description: "Need higher conversion rates...", completed: true, subTasks: "1/1", date: "Nov 28", comments: 6, tag: "Web app +2" },
//       { id: 15, text: "Backlinks chart", date: "Oct 12", completed: true, comments: 3, tag: "Web app" },
//       { id: 16, text: "Onboarding process", date: "Dec 15", completed: true, comments: 12, tag: "Onboarding" },
//       { id: 17, text: "Serp Checker", completed: true, comments: 3, tag: "Web app" },
//       { id: 18, text: "Keywords Discovery", subTasks: "2/2", completed: true, comments: 3 },
//       { id: 19, text: "Account Settings", completed: true },
//     ],
//   },
// ];
// function TodoList() {
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const userId =localStorage.getItem('IntaskrUser');
//         const response = await axios.get(`${process.env.REACT_APP_API}/api/alltask/${userId}`);
//         const tasks = response.data.map((task, index) => ({
//           ...task,
//           color: taskColors[task.title] || defaultColor,
//           tasks: task.tasks.map(taskItem => ({
//             ...taskItem,
//             color: taskColors[taskItem.text] || defaultColor,
//           }))
//         }));
//         setLists(tasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
  
//     fetchTasks();
//   }, []);
//   const [lists, setLists] = useState(() =>
//     initialLists.map(list => ({
//       ...list,
//       tasks: list.tasks.map(task => ({
//         ...task,
//         color: taskColors[task.text] || defaultColor
//       }))
//     }))
//   );
  
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [activeListId, setActiveListId] = useState(null);
  
//   const handleShowAddTask = (listId) => {
//     setActiveListId(listId);
//     setShowAddTask(true);
//   };
  
//   const handleCloseAddTask = () => {
//     setShowAddTask(false);
//   };
  
//   const addTask = (newTask) => {
//     if (activeListId !== 1) return;
//     const taskWithId = {
//       ...newTask,
//       id: Date.now(),
//       color: defaultColor
//     };
//     setLists(prevLists => prevLists.map(list =>
//       list.id === activeListId ? { ...list, tasks: [...list.tasks, taskWithId] } : list
//     ));
//   };

//   const toggleTask = (listId, taskId) => {
//     setLists(prevLists => prevLists.map(list =>
//       list.id === listId ? {
//         ...list,
//         tasks: list.tasks.map(task =>
//           task.id === taskId ? { ...task, completed: !task.completed } : task
//         )
//       } : list
//     ));
//   };

//   return (
//     <div className="Todocontainer d-flex flex-column">
//       <h1 className="TodoTitle fw-bold text-start w-100">To-do list</h1>
//       <div className="row">
//         {/* {lists.map(list => ( */}
//           <ListColumn
//             key={lists[0].id}
//             list={lists[0]}
//             addTask={() => handleShowAddTask(lists[0].id)}
//             toggleTask={toggleTask}
//           />
//           <ListColumn
//             key={lists[1].id}
//             list={lists[1]}
//             addTask={() => handleShowAddTask(lists[1].id)}
//             toggleTask={toggleTask}
//           />
//           <ListColumn
//             key={lists[2].id}
//             list={lists[2]}
//             addTask={() => handleShowAddTask(lists[2].id)}
//             toggleTask={toggleTask}
//           />
//           <ListColumn
//             key={lists[3].id}
//             list={lists[3]}
//             addTask={() => handleShowAddTask(lists[3].id)}
//             toggleTask={toggleTask}
//           />


          
//           {/* <ListColumn
//             key={list.id}
//             list={list}
//             addTask={() => handleShowAddTask(list.id)}
//             toggleTask={toggleTask}
//           /> */}
//         {/* ))} */}
//       </div>
//       <AddTask
//         show={showAddTask}
//         handleClose={handleCloseAddTask}
//         handleAdd={addTask}
//       />
//     </div>
//   );
// }

// function ListColumn({ list, addTask, toggleTask }) {
//   return (
//     <div className="col-lg-3 col-md-4 col-sm-6">
//       <div className="ListHeader px-0" style={{ borderColor: list.color }}>
//         <div className="d-flex align-items-center gap-2">
//           <h2>{list.icon && <span className="ListIcon">{list.icon}</span>}{list.title}</h2>
//           <span className="TaskCount">{list.tasks.length}</span>
//         </div>
//         <div className="header-right">
//           <button className="Moreoptions">...</button>
//         </div>
//       </div>
//       <div className="TasksContainer pt-2">
//         {list.tasks.map((task) => (
//           <Task key={task.id} task={task} toggleTask={() => toggleTask(list.id, task.id)} />
//         ))}
//         {list.id === 1 && (
//           <button className="addtask" onClick={addTask}>
//             + Add task
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function Task({ task, toggleTask }) {
//   return (
//     <div className={`task ${task.completed ? 'completed' : ''}`}>
//       <div
//         className="CustomCheckbox"
//         style={{ '--task-color': task.color }}
//         onClick={toggleTask}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
//           <path d="M0 0h24v24H0z" fill="none" />
//           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//         </svg>
//       </div>
//       <div className="TaskContent">
//         <div className="TaskTitle">
//           {task.icon} {task.text}
//         </div>
//         {task.description && <div className="TaskDescription">{task.description}</div>}
//         <TaskMeta task={task} />
//       </div>
//     </div>
//   );
// }

// function TaskMeta({ task }) {
//   const getDateStyles = () => {
//     switch (task.text) {
//       case "Pricing page":
//         return { color: "#9F4BC9" };
//       case "Home page":
//         return { color: "#1EC337" };
//       case "Schedule custom reporting":
//         return { color: "#F5C200" };
//       default:
//         return { color: "#808080" };
//     }
//   };

//   return (
//     <div className="TaskMeta">
//       {task.subTasks && (
//         <span className="TaskSubTask">
//           <i className="bx bx-menu-alt-right fs-6 me-1"></i>
//           {task.subTasks}
//         </span>
//       )}
//       {task.date && (
//         <span className="TaskDate" style={getDateStyles()}>
//           <i className="bx bxs-calendar me-1 fs-6"></i>
//           {task.date}
//         </span>
//       )}
//       {task.comments && (
//         <span className="TaskComments">
//           <i className="bx bx-message me-1"></i>
//           {task.comments}
//         </span>
//       )}
//       {task.tag && (
//         <span className="TaskTag">
//           <i className="bx bx-purchase-tag-alt me-1"></i>
//           {task.tag}
//         </span>
//       )}
//     </div>
//   );
// }

// export default TodoList;











// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './TodoList.css';
// // import AddTask from './AddTask';

// // const taskColors = {
// //   "Pricing page": "#007AFF",
// //   "Google Chrome Extension Redesign": "#FF9500",
// //   "Home page": "#FF2D55",
// //   "Schedule custom reporting": "#FF9500",
// //   "Billing and Checkout": "#FF2D55",
// //   "Serp Checker": "#FF9500",
// //   "Keywords Discovery": "#007AFF"
// // };

// // const defaultColor = "#808080";

// // function TodoList() {
// //   const [lists, setLists] = useState([]);
// //   const [showAddTask, setShowAddTask] = useState(false);
// //   const [activeListId, setActiveListId] = useState(null);

// //   useEffect(() => {
// //     const fetchTasks = async () => {
// //       try {
// //         const userId = 'YOUR_USER_ID'; // Replace with actual user ID or context
// //         const response = await axios.get(`/alltask/${userId}`);
// //         const tasks = response.data.map((task, index) => ({
// //           ...task,
// //           color: taskColors[task.title] || defaultColor,
// //           tasks: task.tasks.map(taskItem => ({
// //             ...taskItem,
// //             color: taskColors[taskItem.text] || defaultColor,
// //           }))
// //         }));
// //         setLists(tasks);
// //       } catch (error) {
// //         console.error('Error fetching tasks:', error);
// //       }
// //     };

// //     fetchTasks();
// //   }, []);

// //   const handleShowAddTask = (listId) => {
// //     setActiveListId(listId);
// //     setShowAddTask(true);
// //   };

// //   const handleCloseAddTask = () => {
// //     setShowAddTask(false);
// //   };

// //   const addTask = (newTask) => {
// //     if (activeListId !== 1) return;
// //     const taskWithId = {
// //       ...newTask,
// //       id: Date.now(),
// //       color: defaultColor
// //     };
// //     setLists(prevLists => prevLists.map(list =>
// //       list.id === activeListId ? { ...list, tasks: [...list.tasks, taskWithId] } : list
// //     ));
// //   };

// //   const toggleTask = (listId, taskId) => {
// //     setLists(prevLists => prevLists.map(list =>
// //       list.id === listId ? {
// //         ...list,
// //         tasks: list.tasks.map(task =>
// //           task.id === taskId ? { ...task, completed: !task.completed } : task
// //         )
// //       } : list
// //     ));
// //   };

// //   return (
// //     <div className="Todocontainer d-flex flex-column">
// //       <h1 className="TodoTitle fw-bold text-start w-100">To-do list</h1>
// //       <div className="row">
// //         {lists.map(list => (
// //           <ListColumn
// //             key={list.id}
// //             list={list}
// //             addTask={() => handleShowAddTask(list.id)}
// //             toggleTask={toggleTask}
// //           />
// //         ))}
// //       </div>
// //       <AddTask
// //         show={showAddTask}
// //         handleClose={handleCloseAddTask}
// //         handleAdd={addTask}
// //       />
// //     </div>
// //   );
// // }

// // function ListColumn({ list, addTask, toggleTask }) {
// //   return (
// //     <div className="col-lg-3 col-md-4 col-sm-6">
// //       <div className="ListHeader px-0" style={{ borderColor: list.color }}>
// //         <div className="d-flex align-items-center gap-2">
// //           <h2>{list.icon && <span className="ListIcon">{list.icon}</span>}{list.title}</h2>
// //           <span className="TaskCount">{list.tasks.length}</span>
// //         </div>
// //         <div className="header-right">
// //           <button className="Moreoptions">...</button>
// //         </div>
// //       </div>
// //       <div className="TasksContainer pt-2">
// //         {list.tasks.map((task) => (
// //           <Task key={task.id} task={task} toggleTask={() => toggleTask(list.id, task.id)} />
// //         ))}
// //         {list.id === 1 && (
// //           <button className="addtask" onClick={addTask}>
// //             + Add task
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function Task({ task, toggleTask }) {
// //   return (
// //     <div className={`task ${task.completed ? 'completed' : ''}`}>
// //       <div
// //         className="CustomCheckbox"
// //         style={{ '--task-color': task.color }}
// //         onClick={toggleTask}
// //       >
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
// //           <path d="M0 0h24v24H0z" fill="none" />
// //           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
// //         </svg>
// //       </div>
// //       <div className="TaskContent">
// //         <div className="TaskTitle">
// //           {task.icon} {task.text}
// //         </div>
// //         {task.description && <div className="TaskDescription">{task.description}</div>}
// //         <TaskMeta task={task} />
// //       </div>
// //     </div>
// //   );
// // }

// // function TaskMeta({ task }) {
// //   const getDateStyles = () => {
// //     switch (task.text) {
// //       case "Pricing page":
// //         return { color: "#9F4BC9" };
// //       case "Home page":
// //         return { color: "#1EC337" };
// //       case "Schedule custom reporting":
// //         return { color: "#F5C200" };
// //       default:
// //         return { color: "#808080" };
// //     }
// //   };

// //   return (
// //     <div className="TaskMeta">
// //       {task.subTasks && (
// //         <span className="TaskSubTask">
// //           <i className="bx bx-menu-alt-right fs-6 me-1"></i>
// //           {task.subTasks}
// //         </span>
// //       )}
// //       {task.date && (
// //         <span className="TaskDate" style={getDateStyles()}>
// //           <i className="bx bxs-calendar me-1 fs-6"></i>
// //           {task.date}
// //         </span>
// //       )}
// //       {task.comments && (
// //         <span className="TaskComments">
// //           <i className="bx bx-message me-1"></i>
// //           {task.comments}
// //         </span>
// //       )}
// //       {task.tag && (
// //         <span className="TaskTag">
// //           <i className="bx bx-purchase-tag-alt me-1"></i>
// //           {task.tag}
// //         </span>
// //       )}
// //     </div>
// //   );
// // }

// // export default TodoList;


// // ------------------------------------------

// // import React, { useState, useCallback } from 'react';
// // import './TodoList.css';
// // import AddTask from './AddTask';

// // const taskColors = {
// //   "Pricing page": "#007AFF",
// //   "Google Chrome Extension Redesign": "#FF9500",
// //   "Home page": "#FF2D55",
// //   "Schedule custom reporting": "#FF9500",
// //   "Billing and Checkout": "#FF2D55",
// //   "Serp Checker": "#FF9500",
// //   "Keywords Discovery": "#007AFF"
// // };

// // const defaultColor = "#808080"; // Grey color for other tasks

// // const initialLists = [
// //   {
// //     id: 1,
// //     title: "Get Started",
// //     color: "#ef4444",
// //     tasks: [
// //       { id: 1, text: "Welcome to your board 👉", description: "Here you'll submit and manage...", completed: false, icon: "👋" },
// //       { id: 2, text: "Find your files", description: "UI Flip keeps a record of all yo...", completed: false, icon: "🔗" },
// //       { id: 3, text: "Branding & Assets", description: "Please, attach any relevant do...", completed: false, icon: "🎨" },
// //       { id: 4, text: "Manage your subscription", description: "To manage your subscription,...", completed: false, icon: "💳" },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     title: "Requests Backlog",
// //     color: "#f59e0b",
// //     icon: "✏️",
// //     tasks: [
// //       { id: 5, text: "Pricing page", description: "https://whatsmyserp.com/pricing", completed: false, subTasks: "0/4", date: "Friday", comments: 2, tag: "Website +2" },
// //       { id: 6, text: "Contact us page", date: "20 April", completed: false },
// //       { id: 7, text: "Google Chrome Extension Redesign", completed: false },
// //       { id: 8, text: "X/Twitter Cover", completed: false },
// //       { id: 9, text: "LinkedIn Covers", completed: false },
// //       { id: 10, text: "Facebook Cover", completed: false },
// //     ],
// //   },
// //   {
// //     id: 3,
// //     title: "In Progress",
// //     color: "#3b82f6",
// //     icon: "🛠️",
// //     tasks: [
// //       { id: 11, text: "Home page", description: "https://whatsmyserp.com", completed: false, subTasks: "2/2", date: "Today", comments: 8, tag: "Needs review +1" },
// //       { id: 12, text: "Schedule custom reporting", description: "", completed: false, subTasks: "0/1", date: "Tomorrow", comments: 1, tag: "Web app +2" },
// //     ],
// //   },
// //   {
// //     id: 4,
// //     title: "✅Done",
// //     color: "#10b981",
// //     tasks: [
// //       { id: 13, text: "Search history for Backlinks and Keywords tool", subTasks: "2/2", completed: true },
// //       { id: 14, text: "Billing and Checkout", description: "Need higher conversion rates...", completed: true, subTasks: "1/1", date: "Nov 28", comments: 6, tag: "Web app +2" },
// //       { id: 15, text: "Backlinks chart", date: "Oct 12", completed: true, comments: 3, tag: "Web app" },
// //       { id: 16, text: "Onboarding process", date: "Dec 15", completed: true, comments: 12, tag: "Onboarding" },
// //       { id: 17, text: "Serp Checker", completed: true, comments: 3, tag: "Web app" },
// //       { id: 18, text: "Keywords Discovery", subTasks: "2/2", completed: true, comments: 3 },
// //       { id: 19, text: "Account Settings", completed: true },
// //     ],
// //   },
// // ];

// // const TodoList = () => {
// //   const [lists, setLists] = useState(() =>
// //     initialLists.map(list => ({
// //       ...list,
// //       tasks: list.tasks.map(task => ({
// //         ...task,
// //         color: taskColors[task.text] || defaultColor
// //       }))
// //     }))
// //   );

// //   const [showAddTask, setShowAddTask] = useState(false);
// //   const [activeListId, setActiveListId] = useState(null);

// //   const handleShowAddTask = (listId) => {
// //     setActiveListId(listId);
// //     setShowAddTask(true);
// //   };

// //   const handleCloseAddTask = () => {
// //     setShowAddTask(false);
// //   };
// //   const addTask = useCallback((newTask) => {
// //     if (activeListId !== 1) return; // Only allow adding tasks to "Get Started" list
// //     const taskWithId = {
// //       ...newTask,
// //       id: Date.now(),
// //       color: defaultColor
// //     };
// //     setLists(prevLists => prevLists.map(list =>
// //       list.id === activeListId ? { ...list, tasks: [...list.tasks, taskWithId] } : list
// //     ));
// //   }, [activeListId]);

// //   const toggleTask = useCallback((listId, taskId) => {
// //     setLists(prevLists => prevLists.map(list =>
// //       list.id === listId ? {
// //         ...list,
// //         tasks: list.tasks.map(task =>
// //           task.id === taskId ? { ...task, completed: !task.completed } : task
// //         )
// //       } : list
// //     ));
// //   }, []);


// //   return (
// //     <div className="Todocontainer d-flex flex-column">
// //       <h1 className="TodoTitle fw-bold text-start w-100">To-do list</h1>
// //       <div className="row">
// //         {lists.map(list => (
// //           <ListColumn
// //             key={list.id}
// //             list={list}
// //             addTask={() => handleShowAddTask(list.id)}
// //             toggleTask={toggleTask}
// //           />
// //         ))}
// //       </div>


// //       <AddTask
// //         show={showAddTask}
// //         handleClose={handleCloseAddTask}
// //         handleAdd={addTask}
// //       />
// //     </div>
// //   );
// // };

// // const ListColumn = React.memo(({ list, addTask, toggleTask }) => (
// //   <div className="col-lg-3 col-md-4 col-sm-6">
// //     <div className="ListHeader px-0" style={{ borderColor: list.color }}>
// //       <div className="d-flex align-items-center gap-2">
// //         <h2>{list.icon && <span className="ListIcon">{list.icon}</span>}{list.title}</h2>
// //         <span className="TaskCount">{list.tasks.length}</span>
// //       </div>
// //       <div className="header-right">
// //         <button className="Moreoptions">...</button>
// //       </div>
// //     </div>
// //     <div className="TasksContainer pt-2">
// //       {list.tasks.map((task) => (
// //         <Task key={task.id} task={task} toggleTask={() => toggleTask(list.id, task.id)} />
// //       ))}
// //       {list.id === 1 && (
// //         <button className="addtask" onClick={() => addTask(list.id)}>
// //           + Add task
// //         </button>
// //       )}
// //     </div>
// //   </div>
// // ));

// // const Task = React.memo(({ task, toggleTask }) => (
// //   <div className={`task ${task.completed ? 'completed' : ''}`}>
// //     <div
// //       className="CustomCheckbox"
// //       style={{ '--task-color': task.color }}
// //       onClick={toggleTask}
// //     >
// //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
// //         <path d="M0 0h24v24H0z" fill="none" />
// //         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
// //       </svg>
// //     </div>
// //     <div className="TaskContent">
// //       <div className="TaskTitle">
// //         {task.icon} {task.text}
// //       </div>
// //       {task.description && <div className="TaskDescription">{task.description}</div>}
// //       <TAskMeta task={task} />
// //     </div>
// //   </div>
// // ));

// // const getDateStyles = (task) => {
// //   switch (task.text) {
// //     case "Pricing page":
// //       return { color: "#9F4BC9" };
// //     case "Home page":
// //       return { color: "#1EC337" };
// //     case "Schedule custom reporting":
// //       return { color: "#F5C200" };
// //     default:
// //       return { color: "#808080" };
// //   }
// // };

// // const TAskMeta = React.memo(({ task }) => (
// //   <div className="TAskMeta">
// //     {task.subTasks && (
// //       <span className="TaskSubTask">
// //         <i className="bx bx-menu-alt-right fs-6 me-1"></i>
// //         {task.subTasks}
// //       </span>
// //     )}
// //     {task.date && (
// //       <span className="TaskDate" style={getDateStyles(task)}>
// //         <i className="bx bxs-calendar me-1 fs-6"></i>
// //         {task.date}
// //       </span>
// //     )}
// //     {task.comments && (
// //       <span className="TaskComments">
// //         <i className="bx bx-message me-1"></i>
// //         {task.comments}
// //       </span>
// //     )}
// //     {task.tag && (
// //       <span className="TaskTag">
// //         <i className="bx bx-purchase-tag-alt me-1"></i>
// //         {task.tag}
// //       </span>
// //     )}


// //   </div>
// // ));


// // export default TodoList;