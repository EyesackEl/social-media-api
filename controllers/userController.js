const { User, Thought } = require('../models');

module.exports =  {
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .then((user) =>
            !user
              ? res.status(404).json({ errMessage: 'No user found with given ID!'})
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
    },
    newUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
          .then((user) => 
            !user
              ? res.status(404).json('No user with matching ID found!')
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if(!user) {
              res.status(404).json({ errMessage: 'No user with matching ID found!'})
            } else {
              Thought.deleteMany({ _id: { $in: user.thoughts } });
              res.json({ message: `User ${user.username} deleted. Bon voyage...`});
            }
            }
          )
          .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true },
        )
          .then((user) => 
            !user
              ? res.status(404).json({ errMessage: 'No user with matching ID found!'})
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { new: true },
        )
          .then((user) => 
            !user
              ? res.status(404).json({ errMessage: 'No user with matching ID found!' })
              : res.json({ message: 'Friend succesfully removed. !! LOSER ALERT !!', user })
          )
          .catch((err) => res.status(500).json(err));
    },
}