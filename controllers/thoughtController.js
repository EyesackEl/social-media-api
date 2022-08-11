const { Thought, User } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
          .then((thought) => 
            !thought
              ? res.status(404).json({ errMessage: 'No thought found with given ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    getThoughts(req, res) {
        Thought.find({})
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            User.findOneAndUpdate(
                { _id: req.body.userId, username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true },
            )
            .then((user) => 
              !user
                ? res.status(404).json( 'No user found with provided ID / username')
                : res.json(user)
            ) 
           }
          )
          .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
          .then((thought) => 
            !thought
              ? res.status(404).json('No thought with matching ID found!')
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => 
            !thought
            ? res.status(404).json('No thought with matching ID found!')
            : res.json({ message: `${thought.username}'s thought: '${thought.thoughtText}' succesfully deleted!` })
          )
          .catch((err) => res.status(500).json(err));
    },
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
          !thought
            ?  res.status(404).json('No thought with matching ID found!')
            :  res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((thought) =>
          !thought
            ? res.status(404).json('No thought with matching ID found!')
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}