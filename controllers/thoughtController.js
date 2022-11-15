const { User } = require('../../UCI-VIRT-FSF-PT-06-2022-U-LOLC/01-Class-Content/18-NoSQL/01-Activities/26-Stu_CRUD-Subdoc/Solved/models');
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
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughtId } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Thought created, but found no user with that ID'})
                    : res.json('Created the thought!')
            )
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
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID! '})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: {thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Thought deleted but no user with this ID!' })
                    : res.json({ message: 'Thought successfully deleted! '})
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