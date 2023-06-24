const router = require('express').Router()
const groupMethod = require('../controllers/groupController')

// create a group
router.post('/', groupMethod.createGroup)

//get a group
router.get('/:groupId', groupMethod.getGroup)

// get the group lists
router.get('/groups/:userId', groupMethod.getGroupList)

module.exports = router
