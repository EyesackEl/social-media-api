const { Schema, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        max: [280, "Reactions must be less than 281 characters"],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
    }
  },
  {    
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;