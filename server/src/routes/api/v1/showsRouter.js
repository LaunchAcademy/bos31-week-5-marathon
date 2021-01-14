import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Show from "../../../models/Show.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) => {
  try {
    const allShows = await Show.query()
    return res.status(200).json({ shows: allShows })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

showsRouter.get("/:id", async (req, res) => {
  try {
    const showId = req.params.id
    const foundShow = await Show.query().findById(showId)
    return res.status(200).json({ show: foundShow })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

showsRouter.post("/", async (req, res) => {
  try {
    const body = req.body
    const cleanedInput = cleanUserInput(body)
    // console.log(body)
    const newShow = await Show.query().insertAndFetch(cleanedInput)
    return res.status(201).json({ show: newShow })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error)
      console.log(error.data)
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default showsRouter