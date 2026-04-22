import mongoose from 'mongoose'
import supertest from 'supertest'
import Album from '../models/albums.js'
import testAlbums from './data.json'
import app from '../app.js'
import { describe, test, beforeEach, afterAll, expect } from 'vitest'

const api = supertest(app)

describe('Albums tests', () => {
    // Alustetaan tietokanta ennen jokaista testiä
    beforeEach(async () => {
      await Album.deleteMany({})
      await Album.create(testAlbums)
    })

    test('correct number of albums are returned as json', async () => {
      const response = await api
        .get('/api/albums')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        // Varmistetaan, että palautettujen albumien määrä täsmää
        expect(response.body.data).toHaveLength(testAlbums.length);
    })

    test("a new album can be added", async () => {
        const newAlbum = {
            "artist": "Gettomasa",
            "title": "Vastustamaton",
            "year": 2022,
            "genre": "HipHop",
            "tracks": 11
        }

        await api
            .post('/api/albums')
            .send(newAlbum)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/albums')
        expect(response.body.data).toHaveLength(testAlbums.length + 1)
    })

    afterAll(async () => {
    await mongoose.connection.close()
    })
})