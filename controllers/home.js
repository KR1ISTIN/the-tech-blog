const router = require('express').Router();
const {Blog, User, Comments} = require('../models');
const withAuth = require('../utils/auth');

    // /home will be the home screen when user is logged in showing all blogs
    router.get('/home', withAuth, async (req, res) => {
          const blogData = await Blog.findAll({
            include: [{ model: User }],
            raw: true, // required to avoid "own property" sql bug
            nest: true // required to avoid "own property" sql bug
          })
          res.render("blogs", { blogData });
          //res.json(blogData)
        });

    // when the user clicks on the post they want to view, 
    router.get('/home/post/:id', withAuth, async (req, res) => {
      try {
        const blogInfo = await Blog.findByPk(req.params.id, {
          include:[{model: User}, {model: Comments}],
          raw: true,
          nest: true,
        })
      res.render('homepost', blogInfo)
      //res.json(blogInfo)

      } catch (err) {
        res.status(500).json({message: 'No blog found'});
        console.log(err)
      }
    });

    // just for me to see if method calls are working
    router.get('/home/comments', withAuth, async (req, res) => { 
      try {
        const allComments = await Comments.findAll()
      res.json(allComments)
      } catch (err) {
        res.status(500).json({message: 'No blog found'});
        console.log(err)
      }
    });

    // just for me to see if method calls are working
    router.get('/home/post/:id/comments', withAuth, async (req, res) => { 
      try {
        const commentData = await Blog.findByPk(req.params.id, {
          include:[{model: User}, {model: Comments}],
          raw: true,
          nest: true,
        })
      console.log(commentData);
      res.json(commentData);
      } catch (err) {
        res.status(500).json({message: 'No blog found'});
        console.log(err)
      }
    });

    // creates a new comment to the blogpost, 
    router.post('/home/post/:id/comments', withAuth, async(req, res) => {
      try {
        const newComment = await Comments.create({
        use_id: req.body.use_id,
        blog_id: req.body.blog_id,
        comment: req.body.comment
        }); 
        res.status(200).json(newComment)
      } catch (err) {
        res.status(400).json({err});
        console.log(err);
      }
    });
    // updates a comment made on a post  
    // this ID is referencing the id in the Comments table to updte it 
    router.put('/home/post/:post_id/comments/:comment_id', withAuth, async (req, res) => { 
      try {
        const updateBlog = await Comments.update( // calling the Comments table
          { comment: req.body.comment }, // calling column "comment" and update with whatever is in the body req
          { where: {blog_id: req.params.post_id, id: req.params.comment_id} } // where the column "id" is equal to the req.params.id
          );
        console.log(updateBlog);
        if(!updateBlog) {
          res.status(404).json({message: 'No blog with this ID found to update'});
          return;
        }
        res.status(200).json(updateBlog)
      } catch (err) {
        res.status(500).json({message:"An error has occured"});
        console.log(err);
      }
      
    });
    // delete a comment made
    //id is the id number related to the Comment table to fully delete the comment
    router.delete('/home/post/:post_id/comments/:comment_id', withAuth, async (req, res) => {
      try {
        const deleteComment = await Comments.destroy( 
          { where: {blog_id: req.params.post_id, id: req.params.comment_id} }
          );
        if(!deleteComment) {
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