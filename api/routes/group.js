const router = require('express').Router()
const groupMethod = require('../controllers/groupController')

// create a group
router.post('/', groupMethod.createGroup)

//get a group
router.get('/:groupId', groupMethod.getGroup)

// get the group lists
router.get('/groups/:userId', groupMethod.getGroupList)

router.delete('/:groupId', groupMethod.deleteGroup)

// get members list of a group
router.get("/:groupId/members", groupMethod.getMembersList)

// join a group
router.put("/:groupId/join", groupMethod.joinGroup)

// leave a group
router.put("/:groupId/leave", groupMethod.leaveGroup)

module.exports = router
