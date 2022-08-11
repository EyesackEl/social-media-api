const router = require('express').Router();
const {
    getUser,
    getUsers,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

//* api/users
router.route('/')
  .get(getUsers)
  .post(newUser)
;

//* api/users/:userId
router.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
;

//* api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)
;

module.exports = router;