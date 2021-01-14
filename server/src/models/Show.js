const Model = require("./Model")

class Show extends Model {
  static get tableName() {
    return "shows"
  }

  static get jsonSchema() {
    return{
      type: "object",
      required: ["title", "premiereYear"],
      properties: {
        title: { type: "string" },
        network: { type: "string" },
        premiereYear: { type: ["integer", "string"] },
        description: { type: "string" }
      }
    }
  }
}

module.exports = Show