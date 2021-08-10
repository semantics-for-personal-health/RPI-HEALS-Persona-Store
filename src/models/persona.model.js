const mongoose = require('mongoose')

const PersonaSchema = new mongoose.Schema({
  persona: {
    type: Number,
    unique: true
  },
  personal_info: {
    first_name: { type: String },
    username: { type: String },
    last_name: { type: String },
    profile_image: { type: String },
    gender: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: String },
    status: { type: String },
    goal: { type: String },
    likes: { type: String },
    dislikes: { type: String },
    restrictions: { type: String },
    guidelines: { type: [String] },
    performance_data: {
      type: [
        {
          date: { type: String },
          meal: { type: String },
          calories: { type: Number },
          carbohydrates: { type: Number },
          fat: { type: Number },
          protein: { type: Number },
          satfat: { type: Number },
          sodium: { type: Number },
          sugar: { type: Number }
        }
      ]
    }
  },
  guidelines: {
    type: Map,
    of: {
      foodHists: {
        datapoints: { type: ['Mixed'] }
      },
      variable: { type: String },
      summary: { type: String },
      adherence: { type: String },
      frequency: { type: Number },
      recommendation: { type: String },
      status: { type: String },
      advice: { type: String },
      advice_details: { type: String },
      daily_advice: { type: String },
      applies: { type: [String] },
      source: { type: [String] },
      truth: { type: Number },
      weekly_average: { type: Number }
    }
  }
})

module.exports = mongoose.model('Persona', PersonaSchema)
