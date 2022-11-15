const User = require('../models/User');

module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err))
    },

    // Update an existing user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID!'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err)); 
    },

    // Remove thought from a user
    removeThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
            { runValidators: true, new: true }
        )
    },

    // Add new friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.body }}
        )
            .then((user) => 
                !student
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.json(err));
    },
    // Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: {userId: req.body.friendId } } },
            { runValidators: true, new:true }
        )
            .them((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.json(err));
    }
};