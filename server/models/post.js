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
        type: String,
        required: true
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