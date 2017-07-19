import express from 'express';
import passport from 'passport';
import { Post, addPost, fetchPostsByUserId, fetchRecentPostsByUserId } from '../models/post';

const router = express.Router();

router.post('/submit', (req, res) => {

    const {content, postedBy} = req.body;
    const newPost = Post({
        content,
        postedBy: {
            id: postedBy
        }
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

 router.get(`/initial`, passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.user._id;

    fetchPostsByUserId(userId, (err, posts) => {
        if(err){
            res.status(500).json({msg: "error"});
        }else{
            const initialPosts = posts.tempPosts;
            res.status(200).json({initialPosts});
        }
    });
 }); 

  router.get(`/recent/latestPost`, passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.user._id;
    const latestPost = req.query.date;

      fetchRecentPostsByUserId(userId, latestPost, (err, posts) => {
        if(err){
            res.status(500).json({msg: "error"});
        }else{
            const recentPosts = posts.tempPosts;
            res.status(200).json({recentPosts});
        }
    });  
 }); 

export default router;