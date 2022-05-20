const { model, Schema } = require('mongoose');

const TestingSchema = new Schema({
    name: { type: String },
});

module.exports = model('Testing', TestingSchema);