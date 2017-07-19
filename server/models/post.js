import mongoose from 'mongoose';
import { User } from './user';

const PostSchema = mongoose.Schema({
    content: {
        text: {
            type: String,
        },
        picUrl: {
            type: String,
        },
    },
    postedBy: {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
        },
        fullName: {
            type: String
        },
        profilePic: {
            type: String
        }
    },
    postedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Post = mongoose.model('Post', PostSchema);

export function addPost(newPost, callback){
    User.update({_id: newPost.postedBy}, {$inc: {postCount: 1}}, () => newPost.save(callback));
}

export function fetchPostsByUserId(id, callback){
    
    const users = [];
    let posts = [];
    let translatedPosts = [];
    let done = false;
    User.findOne(id, {following: 1, _id: 0})
    .exec()
    .then(res => Post.find({'postedBy.id': {$in: [id, ...res.following]}}).sort({postedAt: -1}).limit(50))
    .then(res => res.map(eachResult => {
        users.push(eachResult.postedBy.id)
        posts.push(eachResult);
    }))
    .then(res => User.find({_id: {$in: users}}, {username: 1, fullName: 1, profilePic: 1}))
    .then(res => posts.map(post => {
        for(let i=0; i<res.length; i++){
            if(post.postedBy.id == res[i]._id){
                post.postedBy.username = res[i].username;
                post.postedBy.fullName = res[i].fullName;
                post.postedBy.profilePic = res[i].profilePic;
                translatedPosts.push(post);
                break;
            }
        }
    }))
    .then(res => User.update({_id: id}, { $set: { tempPosts: translatedPosts} }))
    .then(res => User.findOne({_id: id}, {tempPosts: 1, _id: 0}, callback))
    .catch(err => console.log(err));
}

export function fetchRecentPostsByUserId(id, latestPost, callback){
    const users = [];
    let posts = [];
    let translatedPosts = [];
    let done = false;
    User.findOne(id, {following: 1, _id: 0})
     .exec()
    .then(res => Post.find({'postedBy.id': {$in: [id, ...res.following]}, postedAt: {$gt: latestPost}}).sort({postedAt: -1}))
    .then(res => res.map(eachResult => {
        users.push(eachResult.postedBy.id)
        posts.push(eachResult);
    }))
    .then(res => User.find({_id: {$in: users}}, {username: 1, fullName: 1, profilePic: 1}))
    .then(res => posts.map(post => {
        for(let i=0; i<res.length; i++){
            if(post.postedBy.id == res[i]._id){
                post.postedBy.username = res[i].username;
                post.postedBy.fullName = res[i].fullName;
                post.postedBy.profilePic = res[i].profilePic;
                translatedPosts.push(post);
                break;
            }
        }
    }))
    .then(res => User.update({_id: id}, { $set: { tempPosts: translatedPosts} }))
    .then(res => User.findOne({_id: id}, {tempPosts: 1, _id: 0}, callback))
    .catch(err => console.log(err));
}