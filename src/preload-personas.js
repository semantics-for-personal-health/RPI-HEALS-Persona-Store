const Persona = require('./models/persona.model')
const persona1 = require('./data/1.json')
const persona2 = require('./data/2.json')

module.exports = async () => {
  const personas = await Persona.find()
  if (personas.length === 0) {
    console.log('loading in default personas...')
    for (const persona of [persona1, persona2]) {
      await (new Persona(persona)).save()
    }
  } else {
    console.log('personas already present, skipping preload')
  }
}
