module.exports = (app) => {
  const persona = require('../controllers/persona.controller.js')

  // Create a new Note
  app.post('/persona', persona.create)

  // Retrieve all Notes
  app.get('/persona', persona.findAll)

  // Retrieve a single Note with personaId
  app.get('/persona/:personaId', persona.findOne)

  // Update a Note with personaId
  app.put('/persona/:personaId', persona.update)

  // Delete a Note with personaId
  app.delete('/persona/:personaId', persona.delete)
}
