import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/database';

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    postCount: {
        type: Number,
        required: true,
        default: 0,
    },
    followers: {
        type: Array,
    },
    following: {
        type: Array,
    },
    notifications: {
        type: Array,
    },
    unreadNotifCount: {
        type: Number,
        default: 0
    }
});

export const User = mongoose.model('User', UserSchema);

export function addUser(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

export function getUserById(id, callback){
    User.findById(id, callback);
}

export function getUserByUsernameOrEmail(identifier, callback){
	const query = [{username: identifier}, {email: identifier}];
	User.findOne({
		 $or: query
	   }, callback);
}
