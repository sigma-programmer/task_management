const express = require('express');
const router = express.Router();
const CommentController = require('../../controller/Blog/Comments');

router.get('/controlreact/:blogId', CommentController.getBlog);
router.post('/controlreact/:blogId/comment', CommentController.addComment);


module.exports = router;
