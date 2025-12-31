const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

//@route        POST /api/posts
//@desc         Create Posts
//@access       Private
router.post('/', [
    auth,   [
        check('text', 'Text is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //fetching User model
        const user = await User.findById(req.user.id).select('-password');
        //fetching Post model
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        //saving
        const post = await newPost.save();
        //now returning post
        return res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});
//@route        GET /api/posts
//@desc         Get All Posts
//@access       Private -- Posts need to be accessed by logged in user
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        return res.status(200).json(posts);
    } catch (err) {
       console.error(err.message);
       return res.status(500).send('Server Error'); 
    }
});
//@route        GET /api/posts/:id
//@desc         Get specific post
//@access       Private -- Posts need to be accessed by logged in user
router.get('/:id', auth, async (req, res) => {
    const postNotFound = 'Post Not Found';
    try {
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        return res.status(200).json(post);
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
       return res.status(500).send('Server Error'); 
    }
});
//@route        DELETE /api/posts/:id
//@desc         Delete a specific post
//@access       Private -- Posts need to be accessed by logged in user
router.delete('/:id', auth, async (req, res) => {
    const postNotFound = 'Post Not Found';
    try {
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        //Make sure that the post we delete belong to this user
        if (post.user.toString() !== req.user.id)   {
            return res.status(401).json({ msg: 'User not Authorized' });
        }
        //Delete now this post
        await post.deleteOne(); //Need to work remove or delete
        return res.status(200).json({ msg: 'Post removed successful' });
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
       return res.status(500).send('Server Error'); 
    }
});
//Working with Likes
//@route        PUT /api/posts/like/:id
//@desc         Add like to a post with id, you can only deal with your like
//@access       Private -- Posts need to be accessed by logged in user
router.put('/like/:id', auth, async (req, res) => {
    const postNotFound = 'Post Not Found';
    try {
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        //Check if the post has already been liked by the user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)    {
            return res.status(400).json({ msg: "Post Already Liked" });
        }
        //Now proceed with actual business
        post.likes.unshift({ user: req.user.id });
        await post.save();
        return res.status(200).json(post.likes);
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
       return res.status(500).send('Server Error'); 
    }
});
//@route        PUT /api/posts/unlike/:id
//@desc         Remove the previous like, you can deal with only your like
//@access       Private -- Posts need to be accessed by logged in user
router.put('/unlike/:id', auth, async (req, res) => {
    const postNotFound = 'Post Not Found';
    try {
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        //Check if the post has already been liked by the user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)    {
            return res.status(400).json({ msg: "The post has not been yet liked" });
        }
        //Now proceed with actual business
        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        //Performing saving
        await post.save();
        return res.status(200).json(post.likes);
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
       return res.status(500).send('Server Error'); 
    }
});
/*Working with Comments*/
//@route        POST /api/posts/comment/:id
//@desc         Create comment for a given post
//@access       Private
router.post('/comment/:id', [
    auth,   [
        check('text', 'Text is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const postNotFound = 'Post Not Found';
    try {
        //fetching User model
        const user = await User.findById(req.user.id).select('-password');
        //fetching post
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        //fetching Post model
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        //saving
        post.comments.unshift(newComment);
        await post.save();
        //now returning post
        return res.status(201).json(post.comments);
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
        return res.status(500).send('Server Error');
    }
});
//@route        DELETE /api/posts/comment/:id/:comment_id
//@desc         Remove comment which is yours only
//@access       Private -- Posts need to be accessed by logged in user
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    const postNotFound = 'Post Not Found';
    try {
        const post = await Post.findById(req.params.id);
        if (! post) {
            return res.status(404).json({ msg: postNotFound });
        }
        //finding the comment we are talking about 
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (! comment)  {
            return res.status(404).json({ msg: 'No such comment' });
        }
        //Check if this user is authorized
        //Make sure that the post we delete belong to this user
        if (comment.user.toString() !== req.user.id)   {
            return res.status(401).json({ msg: 'User not Authorized' });
        }
        //Now proceed with actual business
        //get remove index -- same user can have multiple comments
        //we need to target with a specific id
        const removeIndex = post.comments.map(comment => comment.id.toString()).indexOf(comment.id);
        post.comments.splice(removeIndex, 1);
        //Performing saving
        await post.save();
        return res.status(200).json(post.comments);
    } catch (err) {
        if (err.kind === 'ObjectId')    {
            return res.status(404).json({ msg: postNotFound });
        }
       return res.status(500).send('Server Error'); 
    }
});



module.exports = router;