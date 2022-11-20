const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        maxlength: 280,
        minlength:1,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        Type: String,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true
    },
});


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
