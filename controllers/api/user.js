const router = require('express').Router();
const { User, Blog, Comments } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

//main/user this will give me info to find all users
router.get('/', withAuth, async (req, res) => {
    try {
        const all = await User.findAll();
        //res.status(200).json(all);
        console.log(all)
      } catch (err) {
        res.status(500).json(err);
      }
    });

// when they click the login in button on the modal
router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await userData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // if they do match, return success message
  req.session.save(() => {
    req.session.userID = userData.id;
    req.session.loggedIn = true;
    res.status(200).json({ user: userData, message: 'You are now logged in! :)' });
  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// /main/user/id will return the specific user 
router.get('/:id', async (req, res) => {
    try {
      const userID = await User.findByPk(req.params.id);
      if(!userID) { 
        res.status(404).json({message: "No user found with that id!"});
        return;
      }
      res.status(200).json(userID);
    } catch (err) {
      res.status(500).json({message: 'Error occured'});
      console.log(err)
    }
  });

// create new user - if they click the sign up button this will happen 
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
          req.session.userID = newUser.id;
          req.session.loggedIn = true;
          res.status(200).json(newUser);
        });
    } catch (err) {
        console.log(err);
        //res.status(400).json(err);
    }
    });

// updates a user password 
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.update( // calling the User table
        { password: req.body.password },// calling column "password" and update with whatever is in the body req
        { where: {password: req.params.id} } // where the column "password" is equal to the req.params.id
        );
        if(!updateUser) {
        res.status(404).json({message: 'No user with this ID found'});
        return;
        }
        res.status(200).json({message:"upated successful"})
    } catch (err) {
        res.status(500).json({message:"An error has occured"});
        console.log(err);
    }
 
    });
     
    
// delete user 
router.delete('/:id',async (req, res) => {
try {
    const deleteUser = await User.destroy({
      include: [{ model: Comments }, { model: Blog }], // can you do this?
    },
    { where: {username: req.params.id} } 
    );
    
    if(!deleteUser) {
    res.status(404).json({message: 'No user with this ID found'});
    return;
    }
    res.status(200).json({message: 'This user has been successfully deleted'})
} catch (err) {
    res.status(500).json({message:"An error has occured"});
    console.log(err);
};
});


module.exports = router;