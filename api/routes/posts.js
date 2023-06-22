const router = require("express").Router();

const postMethod = require("../controllers/postController");

// Create a post

router.post("/", postMethod.createPostHandler);

//Update a post

router.put("/:id", postMethod.updatePostHandler);

//Delete a post
router.delete("/:id", postMethod.deletePostHandler);

// Like a post or dislike a post

router.put("/:id/like", postMethod.likeHandler);

// Get a post

router.get("/:id", postMethod.getPost);

// get timeline posts

router.get("/timeline/:userId", postMethod.getTimeline);

// get user's all posts

router.get("/profile/:username", postMethod.getUserPosts)

// a user commenting on a post

router.put("/comment/:postId", postMethod.createComment)


// saving a post in the user database
router.post("/:postId/save", postMethod.savePost)

// unsave a post
router.post("/:postId/unsave", postMethod.unsavePost)

//getting all the users saved posts.
router.get("/savedposts/:userId", postMethod.getsavedposts)

// issaved
router.get("/:postId/issaved/:userId",postMethod.isSaved)

module.exports = router;
