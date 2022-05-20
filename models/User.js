const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isMember: { type: Boolean },
    isAdmin: { type: Boolean },
});

UserSchema.virtual('name').get(function() {
    let name = '';

    if (this.firstName && this.lastName) {
        name = `${this.firstName} ${this.lastName}`;
    }

    return name;
});

module.exports = model('User', UserSchema);