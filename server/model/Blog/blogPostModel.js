
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  // title: { type: String, required: true },
  // content: { type: String, required: true },
  // thumbnail: { type: String, default: null },
  faqs: [{ question: String, answer: String }],
  meta: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    author: { type: String, default: "" },
    robots: { type: String, default: "index, follow" }
  },
  openGraph: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    siteName: { type: String, default: "" }
  },
  twitter: {
    card: { type: String, default: "summary_large_image" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    site: { type: String, default: "" }
  },
  slug: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  likes: [String],
  dislikes: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  pageViewCount: { type: Number, default: 0 },
});

// Indexing the slug field
blogPostSchema.index({ slug: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);


// // models/blogPost.js
// const mongoose = require('mongoose');

// const blogPostSchema = new mongoose.Schema({
//   thumbnail: String,
//   title: String,
//   slug: { type: String, unique: true }, // Ensuring unique index on slug
//   description: String,
//   text: String,
//   isPublic: Boolean,
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: String,
//   ogTitle: String,
//   ogDescription: String,
//   ogImage: String,
//   date: { type: Date, default: Date.now },


// // -----------comment like dislike --------
// likes: [String],
// dislikes: [String],
// comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
// pageViewCount: { type: Number, default: 0 },
// // --------------------------------

// });
// blogPostSchema.index({ slug: 1 }); // Indexing the slug field
// module.exports = mongoose.model('BlogPost', blogPostSchema);
