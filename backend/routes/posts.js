const express = require('express');
const PostController = require('../controllers/posts');

/**
 * Middlewear we created to check if user is allowed access
 */
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post(
  '',
  checkAuth, 
  /**
   * try to find a single file on the request and it 
   * will try to find it on a image property in the
   * request body
   */
  extractFile, 
  PostController.CreatePost
);
  /**
   * Update/replace existing post
   * 
   * Could use post.patch to update only the values that changed
   */
  router.put(
    '/:id', 
    checkAuth,
    extractFile, 
    PostController.UpdatePost
);
  
  /**
   * Get posts
   */
  router.get('', PostController.GetPosts);
  
  /**
   * Get post by id
   */
  router.get('/:id', PostController.GetPostsById);
  
  /**
   * Delete post
   */
  router.delete('/:id', checkAuth, PostController.DeletePost);

  module.exports = router;