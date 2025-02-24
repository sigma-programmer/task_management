
const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  OrgId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user (OrgId)
  MeetingDetails: [

            {
            title: { type: String, required: true },
            start: { type: Date, required: true },
            end: { type: Date },
            link: { type: String },
            emails: [{ type: String, required: true }],
        }
 
  ],
});

// Create and export the Event model
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;





// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//     OrgId: { type: String, required: true }, // Unique OrgId for each organization
//     MeetingDetails: [
//         {
//             title: { type: String, required: true },
//             start: { type: Date, required: true },
//             end: { type: Date },
//             link: { type: String },
//             emails: [{ type: String, required: true }],
//         },
//     ],
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;

