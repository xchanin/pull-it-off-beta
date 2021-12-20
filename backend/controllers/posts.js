const Post = require('../models/post');

/**
 * Create a new post
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete 
 */
exports.CreatePost = (req, res, next) => {

    /**
     * Get the URL from our server
     * 
     * protocol returns either 'http' or 'https'
     */
    const url = req.protocol + '://' + req.get('host');  
    const post = new Post({
        title: req.body.title,
        content: req.body.content,

        /**
         * Path to store in the database
         */
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });

    /**
     * Save method ships with mongoose
     */
    post.save()
    .then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            post:  {
                /**
                 * Use spread operator to copy all properties
                 * from another object, then override the id,
                 * so it maps to the database id name of '_id'
                 * could add new properties here too
                 * 
                 */
                ...createdPost,
                id: createdPost._id
            }
            });
        })
        .catch(error => {
        res.status(500).json({
            message: 'Creating a post failed!'
        })
    });
}

/**
 * Update a post
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete 
 */
exports.UpdatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }

    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId
    });

    /**
     * Update post if the id and creator are the same user
     */
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {

      /**
       * User has authorization to edit post
       * 
       * !!!! TODO - Shannon !!!
       * 
       * an error will occur if we didn't make any change, but tried to save 
       * the form. MongoDB won't update a record in the database if there 
       * isn't a change, so modifiedCount will be zero, causing us to hit
       * the 401 error. TODO would be to prevent the form from being submitted
       * if there isn't a change - need to check for form is dirty
       */
       
      if (result.modifiedCount > 0 ) {
        res.status(200).json({ message: 'Update successful' }); 
      } else {
        res.status(401).json({ message: 'Unable to update post!' });
      }
    })
    /**
     * Catch will only be reached if something technically goes wrong, not
     * part of the error capture above
     */
    .catch(error => {
      res.status(500).json({
        message: 'Couldn\'\t update post!'
      })
    })
}

/**
 * Get all posts
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete 
 */
exports.GetPosts = (req, res, next) => {

    /**
     * Get query information
     * 
     * !!! Query parameters are always a string,
     * so convert to a number using '+' !!!
     */
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts = '';

    /**
     * Adjusted query - used in pagination
     * 
     */
    if (pageSize && currentPage) {
      postQuery
        /**
         * SKip the first 'n' posts in the query
         */
        .skip(pageSize * (currentPage - 1))
        /**
         * Limit the amount of documents in the return
         */
        .limit(pageSize)
    } 

    /**
     * Get results from DB
     */
    postQuery.then(documents => {
       fetchedPosts = documents;
       /**
        * Issue another query and return the 
        * count of records from the find() above
        */
       return Post.count();
      })
      .then(count => {
        /**
         *  Have the count and issue the response
         */
        res.status(200).json({
          message: 'Posts fetched successfully',
          testVar: process.env.MY_TEST_VARIABLE,
          posts: fetchedPosts,
          /**
           * Number of records in the database
           */
          maxPosts: count
        });
      })
      .catch(error => {
        console.log('fetching posts error', error);
        res.status(500).json({
          message: 'Fetching posts failed!'
        })
      }); 
}

/**
 * Get a single post by id
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete 
 */
exports.GetPostsById =  (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching post failed!'
      })
    })
}

/**
 * Delete a post
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete 
 */
exports.DeletePost = (req, res, next) => {

    /**
     * Only delete the post if the user who created it is the one deleting
     */
      Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then(result => {
          
      /**
       * User has authorization to delete post
       */
      if (result.deletedCount > 0 ) {
        res.status(200).json({ message: 'Delete successful' }); 
      } else {
        res.status(401).json({ message: 'Not authorized to delete!' });
      }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetching posts failed!'
        })
      })
}