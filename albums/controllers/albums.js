import Albums from '../models/albums.js'
import mongoose from 'mongoose'

const getAlbums = async (_req, res, next) => {
  try {

    const albums = await Albums.find({}).exec()
    res.status(200).json({ success: true, data: albums })
  } catch (error) {
    next(error)
  }
}

const createAlbum = async (req, res, next) => {
  try {
    const { artist, title, year, genre, tracks } = req.body

    if (!artist || !title || !year || !genre || !tracks) {
      const error = new Error('Some fiealds are empty.')
      error.status = 400
      throw error
    }

    // tallennetaan albums-kokoelmaan uusi albumi
    const album = await Albums.create({ artist, title, year, genre, tracks })
    res.status(201).json({ success: true, data: album })
  } catch (error) {
    // If it's a Mongoose validation error, set status to 400 for now, we'll improve this later
    if (error.name === 'ValidationError') {
      error.status = 400
    }
    next(error)
  }
}
const getSingleAlbum = async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
    }

    const album = await Albums.findById(req.params.id).exec()

    if (!album) {
      return res.status(404).json({ message: 'Album not found' })
    }

    res.status(200).json(album)
  } catch (error) {
    next(error)
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const deleted = await Albums.findByIdAndDelete(req.params.id).exec()
    if (!deleted) {
      return res.status(404).json({ message: 'Album not found' })
    }

    res.status(200).json({ success: true, message: 'Album deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export {
  getAlbums as getAlbums,
  getSingleAlbum as getSingleAlbum,
  createAlbum as createAlbum,
  deleteAlbum as deleteAlbum,
}