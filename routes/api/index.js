const router = require('express').Router();
const courseRoutes = require('./thoughtRoutes');
const studentRoutes = require('./userRoutes');

router.use('/users', courseRoutes);
router.use('/thoughts', studentRoutes);

module.exports = router;