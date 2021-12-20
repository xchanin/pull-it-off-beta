const multer = require('multer');

/**
 * Map extension to mime type
 */
 const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };
  
  /**
   * Setup local storage for images
   */
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
  
      /**
       * Return error if we don't detect one of the
       * allowed mime types
       */
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error('invalid mime type');
  
      if (isValid) {
        error = null;
      }
      /**
       * Where to store image uploaded - relative
       * to the path where server.js file is at
       */
      callback(error, 'images');
    },
    
      /**
       * Tell multer what the file name should be
       */
       filename: (req, file, callback) => {
        const name = file.originalname
        .toLowerCase()
        .split(' ')
        .join('-');
  
        /**
         * Select mime type from map
         */
        const ext = MIME_TYPE_MAP[file.mimetype];
  
        /**
         * Construct a unique file name based on 
         * the input file name, current date, and
         * the file extension
         */
        callback(null, name + '-' + Date.now() + '.' + ext);
      }
  });

  module.exports = multer({ storage: storage }).single('image');