// routes/blogPostRoutes.js
const express = require('express');
const router = express.Router();
const blogPostController = require('../../controller/Blog/blogPostController');
const updateViewCount = require('../../controller/Blog/UpdateViewBlogPost');

router.post('/posts', blogPostController.createPost);

// Route to get all articles
router.get('/getallblogs', blogPostController.getAllPosts);

// Route to get a post by slug
router.get('/getblog/:slug', blogPostController.getPostBySlug);


router.post('/updateview/:blogPostId', updateViewCount.updateViewCount);


module.exports = router;
