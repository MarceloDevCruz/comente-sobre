const express = require('express')
const router = express.Router()
const ComenteSobreController = require('../controllers/ComenteSobreController')

const checkAuth = require('../middleware/auth').checkAuth

router.get('/add', checkAuth, ComenteSobreController.createComenteSobre)
router.post('/add', checkAuth, ComenteSobreController.createComenteSobreSave)
router.get('/edit/:id', checkAuth, ComenteSobreController.createComenteSobreUpdate)
router.post('/edit', checkAuth, ComenteSobreController.createComenteSobreUpdateSave)
router.get('/dashboard', checkAuth, ComenteSobreController.showDashboard)
router.post('/remove', checkAuth, ComenteSobreController.removeComenteSobre)
router.get('/', ComenteSobreController.showComenteSobre)

module.exports = router