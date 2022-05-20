const { DateTime } = require('luxon');
const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual('timestampFormatted').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_MED
    );
});

module.exports = model('Post', PostSchema);