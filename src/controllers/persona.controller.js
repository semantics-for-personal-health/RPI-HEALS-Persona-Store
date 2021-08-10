const Persona = require('../models/persona.model')

// Create and Save a new Persona
exports.create = (req, res) => {
  const persona = new Persona(req.body)
  persona
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Persona.'
      })
    })
}

// Retrieve and return all personas from the database.
exports.findAll = (req, res) => {
  Persona.find()
    .then((personas) => {
      res.send(personas)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving personas.'
      })
    })
}

// Find a single persona with a personaId
exports.findOne = (req, res) => {
  Persona.findOne({ persona: req.params.personaId })
    .then((persona) => {
      if (!persona) {
        return res.status(404).send({
          message: 'persona not found with id ' + req.params.personaId
        })
      }
      res.send(persona)
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'persona not found with id ' + req.params.personaId
        })
      }
      return res.status(500).send({
        message: 'Error retrieving persona with id ' + req.params.personaId
      })
    })
}

// Update a persona identified by the personaId in the request
exports.update = (req, res) => {
  Persona.findByIdAndUpdate(req.params.personaId, req.body, { new: true })
    .then((persona) => {
      if (!persona) {
        return res.status(404).send({
          message: `Persona not found with id: ${req.params.personaId}`
        })
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Persona not found with id ' + req.params.personaId
        })
      }
      return res.status(500).send({
        message: 'Error updating persona with id ' + req.params.personaId
      })
    })
}

// Delete a persona with the specified personaId in the request
exports.delete = (req, res) => {
  Persona.findByIdAndRemove(req.params.personaId)
    .then((persona) => {
      if (!persona) {
        return res.status(404).send({
          message: 'Persona not found with id ' + req.params.personaId
        })
      }
      res.send({ message: 'Persona deleted successfully!' })
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Persona not found with id ' + req.params.personaId
        })
      }
      return res.status(500).send({
        message: 'Could not delete persona with id ' + req.params.personaId
      })
    })
}
