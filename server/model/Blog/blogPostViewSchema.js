const mongoose = require('mongoose');

const blogPostViewSchema = new mongoose.Schema({
  blogPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  blogViewDetails: [
    {
      ipAddress: { type: String},
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('BlogPostView', blogPostViewSchema);
