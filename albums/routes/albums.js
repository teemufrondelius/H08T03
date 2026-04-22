import express from 'express'
import * as albumController from '../controllers/albums.js'
import { requireDebug } from '../middleware/loggers.js'

const router = express.Router()



router.get('/', albumController.getAlbums)
router.get('/:id', albumController.getSingleAlbum)
router.post('/', albumController.createAlbum)
//router.put('/:id', albumController.updateAlbum)
router.delete('/:id', requireDebug, albumController.deleteAlbum)

export default router