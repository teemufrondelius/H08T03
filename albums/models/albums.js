import { Schema, model } from 'mongoose'

const albumsSchema = new Schema({
  artist: String,
  title: String,
  year: Number,
  genre: String,
  tracks: Number
})

export default model('Album', albumsSchema)