const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get one single thought by Id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new thought and update the user who created the thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },

    // Update an existing thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                    ? res.json(404).json({ message: 'No thought with this ID! '})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    // Deletes a thought from the database, and remove it from the user
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID! '})
                    : User.deleteMany({ _id: {$in: thought.user }})
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a new reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.json(404).json({ message: 'No thought with this ID!' })
                : res.json(thought)
        ) 
        .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.json(404).json({ message: 'No thought with this ID!' })
                : res.json(thought)
        ) 
        .catch((err) => res.status(500).json(err));
    }
};