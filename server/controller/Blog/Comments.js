const Blog = require('../../model/Blog/blogPostModel');
const Comment = require('../../model/Blog/Comment');



exports.getBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).populate('comments');
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { email, content,name ,ipAddressofUser} = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).send('Blog not found');
    const comment = new Comment({ email, content ,name});
    await comment.save();
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// exports.replyToComment = async (req, res) => {
//   const { commentId } = req.params;
//   const { email, content } = req.body;
//   try {
//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).send('Comment not found');
//     comment.replies.push({ email, content });
//     await comment.save();
//     res.status(201).json(comment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// exports.likeOrDislikeBlog = async (req, res) => {
//   const { blogId } = req.params;
//   const { email, action } = req.body;
//   try {
//     const blog = await Blog.findById(blogId);
//     if (!blog) return res.status(404).send('Blog not found');
//     if (action === 'like') {
//       if (!blog.likes.includes(email)) blog.likes.push(email);
//       if (blog.dislikes.includes(email)) blog.dislikes.pull(email);
//     } else if (action === 'dislike') {
//       if (!blog.dislikes.includes(email)) blog.dislikes.push(email);
//       if (blog.likes.includes(email)) blog.likes.pull(email);
//     } else {
//       return res.status(400).send('Invalid action');
//     }
//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };
