const router = require('express').Router();
const {Blog, User} = require('../../models');
const withAuth = require('../../utils/auth'); 


  // will get all blog post associated with that user ID NEED to work on this figure out how blogs load related to the user
  router.get('/', withAuth, async (req, res) => {
    try {
      const dashData = await Blog.findAll({ 
        include: [{model: User, attributes: ['id', 'username']}],
        where: { author: req.session.userID },
        raw: true,
        nest: true,
      });
      if(!dashData) { // if there is not ID under category then return json message
        res.status(404).json({message: "No user found with that id!"});
        return;
      }
      res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        dashData
      });
      //res.status(200).json(dashData);
    } catch (err) {
      res.status(500).json({message: 'No user with this ID found'});
      console.log(err)
    }
  });

// when user clicks "create new blog button" in their dashboard
  router.post('/create', async(req, res) => {
    try {
      const newBlog = await Blog.create({
        title: req.body.title,
        post: req.body.post,
        date: req.body.date,
        author: req.session.userID
      }); 
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json({err});
      console.log(err);
    }
  });
  
 
  // updates the blog post
  router.put('/:id', async (req, res) => {
    try {
      const updateBlog = await Blog.update( 
        { title: req.body.title,
          post: req.body.post
        }, 
        { where: {id: req.params.id} } 
        );
      if(!updateBlog) {
        res.status(404).json({message: 'No user with this ID found'});
        return;
      }
      res.status(200).json(updateBlog)
    } catch (err) {
      res.status(500).json({message:"An error has occured"});
      console.log(err);
    }
  
  });
  // delete blog post
  router.delete('/:id',async (req, res) => {
    try {
      const deleteBlog = await Blog.destroy( 
        { where: {id: req.params.id} } 
        );
       
      if(!deleteBlog) {
        res.status(404).json({message: 'No blog with this ID found'});
        return;
      }
      res.status(200).json({message: 'This blog has been successfully deleted'})
    } catch (err) {
      res.status(500).json({message:"An error has occured"});
      console.log(err);
    };
  });

module.exports = router;