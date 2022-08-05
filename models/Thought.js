const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const { formatDate } = require('../utils/helpers');

const thoughtSchema = new Schema(
    {
      thoughtText:{
        type: String,
        min: [1, 'Text cannot be empty'],
        max: [280, 'Only 280 characters allowed'],
        required: true
        },
      createdAt:{
        type: Date,
        default: Date.now,
        get: formatDate,
        },
      username:{
        type: String,
      required: true
        },
      reactions: [reactionSchema]
    },
    {
      toJSON: {
        getters: true,
        virtuals: true
      }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('post', thoughtSchema);

module.exports = Thought; 