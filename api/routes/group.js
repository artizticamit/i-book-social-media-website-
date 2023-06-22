const router = require('express').Router()
const groupMethod = require('../controllers/groupController')

// create a group
router.post('/', groupMethod.createGroup)

// get the group lists
router.get('/:groupId', groupMethod.getGroup)

module.exports = router
