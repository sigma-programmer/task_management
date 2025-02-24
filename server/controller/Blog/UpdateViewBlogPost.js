
const BlogPost = require('../../model/Blog/blogPostModel');
const BlogPostView = require('../../model/Blog/blogPostViewSchema');


exports.updateViewCount = async (req, res) => {
  const { blogPostId } = req.params;
  const { ipAddressofUser } = req.body;
console.log(ipAddressofUser)
  try {
    const blogPost = await BlogPost.findById(blogPostId).lean();

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    let blogPostView = await BlogPostView.findOne({ blogPostId }).lean();

    if (!blogPostView) {
      // If no view record exists, create a new one and increment the view count
      blogPost.pageViewCount += 1;
      await BlogPost.findByIdAndUpdate(blogPostId, { $inc: { pageViewCount: 1 } });

      await BlogPostView.create({
        blogPostId,
        blogViewDetails: [{ ipAddress: ipAddressofUser }]
      });
    } else {
      // Check if the IP address is already in the view details
      const ipExists = blogPostView.blogViewDetails.some(view => view.ipAddress === ipAddressofUser);

      if (!ipExists) {
        // If IP address is new, increment the view count and update the view record
        blogPost.pageViewCount += 1;
        await BlogPost.findByIdAndUpdate(blogPostId, { $inc: { pageViewCount: 1 } });

        await BlogPostView.updateOne(
          { blogPostId },
          { $push: { blogViewDetails: { ipAddress: ipAddressofUser } } }
        );
      }
    }

    res.json({ pageViewCount: blogPost.pageViewCount });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
