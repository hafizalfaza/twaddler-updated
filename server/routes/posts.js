import express from 'express';
import { Post, addPost } from '../models/post';

const router = express.Router();

router.post('/submit', (req, res) => {

    const {content, postedBy} = req.body;
    const newPost = Post({
        content,
        postedBy
    });

    addPost(newPost, (err, post) => {
        if(err){
            req.session.errors = err;
            res.status(403).json({success: req.session.success, errors: req.session.errors});
        }else{
            req.session.errors = null;
            req.session.success = true; 
            res.status(200).json({post, success: req.session.success, errors: req.session.errors});
        }
    }) 
});

/* router.get(`/initial/${}`) */

export default router;