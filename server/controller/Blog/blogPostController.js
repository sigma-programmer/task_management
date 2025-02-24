// controller/Blog/blogPostController.js
const BlogPost = require('../../model/Blog/blogPostModel');
const BlogPostView = require('../../model/Blog/blogPostViewSchema');

exports.createPost = async (req, res) => {
  try {
    // Parse the JSON string from FormData
    const data = JSON.parse(req.body.data);
console.log(data)
    // Extract data from the parsed object
    const {
      title,
      content,
      faqs,
      meta,
      openGraph,
      twitter,
      slug
    } = data;

    // Handle optional thumbnail file
    const thumbnail = req.file ? req.file.path : null;

    // Create a new blog post
    const newPost = await BlogPost.create({
      title,
      content,
      thumbnail,
      faqs,
      meta,
      openGraph,
      twitter,
      slug,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch all posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await BlogPost.find({}).lean();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update view count and save IP address
exports.updateViewCount = async (req, res) => {
  const { blogPostId } = req.params;
  const { ipAddressofUser } = req.body;

  try {
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Find the view record for this blog post
    let blogPostView = await BlogPostView.findOne({ blogPostId: blogPostId });

    if (!blogPostView) {
      // If no view record exists, create a new one and increment the view count
      blogPostView = new BlogPostView({
        blogPostId: blogPostId,
        blogViewDetails: [{ ipAddress: ipAddressofUser }],
      });
      blogPost.pageViewCount += 1;
      await blogPost.save();
      await blogPostView.save();
    } else {
      // Check if the IP address is already in the view details
      const ipExists = blogPostView.blogViewDetails.some(view => view.ipAddress === ipAddressofUser);
      if (!ipExists) {
        // If IP address is new, increment the view count and update the view record
        blogPost.pageViewCount += 1;
        blogPostView.blogViewDetails.push({ ipAddress: ipAddressofUser });
        await blogPost.save();
        await blogPostView.save();
      }
    }

    res.json({ pageViewCount: blogPost.pageViewCount });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// const BlogPost = require('../../model/Blog/blogPostModel');
// const BlogPostView = require('../../model/Blog/blogPostViewSchema');

// exports.createPost = async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       title,
//       content,
//       thumbnail,
//       faqs,
//       meta,
//       openGraph,
//       twitter,
//       slug
//     } = req.body;
// console.log(title)
//     // Create a new blog post
//     const newPost = await BlogPost.create({
//       title,
//       content,
//       thumbnail,
//       faqs,
//       meta,
//       openGraph,
//       twitter,
//       slug,
//     });

//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch all posts
// exports.getAllPosts = async (req, res) => {
//   try {
//     const allPosts = await BlogPost.find({}).lean();
//     res.status(200).json(allPosts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch a post by slug
// exports.getPostBySlug = async (req, res) => {
//   try {
//     const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update view count and save IP address
// exports.updateViewCount = async (req, res) => {
//   const { blogPostId } = req.params;
//   const { ipAddressofUser } = req.body;

//   try {
//     const blogPost = await BlogPost.findById(blogPostId);
//     if (!blogPost) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }

//     // Find the view record for this blog post
//     let blogPostView = await BlogPostView.findOne({ blogPostId: blogPostId });

//     if (!blogPostView) {
//       // If no view record exists, create a new one and increment the view count
//       blogPostView = new BlogPostView({
//         blogPostId: blogPostId,
//         blogViewDetails: [{ ipAddress: ipAddressofUser }],
//       });
//       blogPost.pageViewCount += 1;
//       await blogPost.save();
//       await blogPostView.save();
//     } else {
//       // Check if the IP address is already in the view details
//       const ipExists = blogPostView.blogViewDetails.some(view => view.ipAddress === ipAddressofUser);
//       if (!ipExists) {
//         // If IP address is new, increment the view count and update the view record
//         blogPost.pageViewCount += 1;
//         blogPostView.blogViewDetails.push({ ipAddress: ipAddressofUser });
//         await blogPost.save();
//         await blogPostView.save();
//       }
//     }

//     res.json({ pageViewCount: blogPost.pageViewCount });
//   } catch (error) {
//     console.error('Error updating view count:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // controllers/blogPostController.js
// const BlogPost = require('../../model/Blog/blogPostModel');
// const BlogPostView = require('../../model/Blog/blogPostViewSchema');

// exports.createPost = async (req, res) => {
//   try {
//     const newPost = await BlogPost.create(req.body);
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




// // exports.getAllPosts = async (req, res) => {
// //   try {
// //     const allPosts = await BlogPost.find({});
// //     res.status(200).json(allPosts);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };
// exports.getAllPosts = async (req, res) => {
//   try {
//     const allPosts = await BlogPost.find({}).lean();
//     res.status(200).json(allPosts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getPostBySlug = async (req, res) => {
//   try {
//     const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // // New method to get a post by slug
// // exports.getPostBySlug = async (req, res) => {
// //   try {
// //     const post = await BlogPost.findOne({ slug: req.params.slug });
// //     if (!post) {
// //       return res.status(404).json({ error: 'Post not found' });
// //     }
// //     res.status(200).json(post);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // Implement other controller methods for updating, deleting, fetching posts, etc.



// // Update view count and save IP address
// exports.updateViewCount = async (req, res) => {
//   const { blogPostId } = req.params;
//   const {ipAddressofUser} = req.body;
//   // console.log(ipAddressofUser)

//   try {
//     const blogPost = await BlogPost.findById(blogPostId);

//     if (!blogPost) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }

//     // Find the view record for this blog post
//     let blogPostView = await BlogPostView.findOne({ blogPostId: blogPostId });

//     if (!blogPostView) {
//       // If no view record exists, create a new one and increment the view count
//       blogPostView = new BlogPostView({
//         blogPostId: blogPostId,
//         blogViewDetails: [{ ipAddress: ipAddressofUser }]
//       });
//       blogPost.pageViewCount += 1;
//       await blogPost.save();
//       await blogPostView.save();
//     } else {
//       // Check if the IP address is already in the view details
//       const ipExists = blogPostView.blogViewDetails.some(view => view.ipAddress === ipAddressofUser);

//       if (!ipExists) {
//         // If IP address is new, increment the view count and update the view record
//         blogPost.pageViewCount += 1;
//         blogPostView.blogViewDetails.push({ ipAddress: ipAddressofUser });
//         await blogPost.save();
//         await blogPostView.save();
//       }
//     }

//     res.json({ pageViewCount: blogPost.pageViewCount });
//   } catch (error) {
//     console.error('Error updating view count:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };