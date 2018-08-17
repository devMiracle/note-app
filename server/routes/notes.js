var express = require('express');
var router = express.Router();
const NoteController = require('../controllers/NoteController');
var JWT_Verify = require('../middlewares/jwt');

router.use(JWT_Verify.verifyToken);
router.get('/',NoteController.getAll);
router.post('/create',NoteController.create);
router.put('/update/:id',NoteController.update);
router.delete('/remove/:id',NoteController.remove);
// router.get('/:author_id',NoteController.getAll);


module.exports = router;