const User = require("../Schema/user.schema");


exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('conversations');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('conversations');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  