const request = require('supertest')
const persona1 = JSON.parse(JSON.stringify(require('../data/1.json')))

describe('Put and get', () => {
  it('should be able to store and then retrieve a persona', async () => {
    // set to a different id to not overwrite default personas
    persona1.persona = 88
    const saveRes = await request(global.SERVER).post('/persona').send(persona1)
    expect(saveRes.statusCode).toEqual(200)
    const getRes = await request(global.SERVER).get(`/persona/${persona1.persona}`).send()
    expect(getRes.body).toMatchObject(persona1)
  })
})
