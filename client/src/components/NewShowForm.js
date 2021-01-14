import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "./../services/translateServerErrors"

const NewShowForm = (props) => {
  const [newShow, setNewShow] = useState({
    title: "",
    network: "",
    premiereYear: "",
    description: ""
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewShow = async () => {
    try {
      const response = await fetch("/api/v1/shows", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newShow)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json()
          const translatedErrors = translateServerErrors(errorBody.errors)
          // debugger
          setErrors(translatedErrors)
        }

        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setShouldRedirect(true)
      console.log("Show created successfully!", body)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleInputChange = (event) => {
    setNewShow({
      ...newShow,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewShow()
  }

  if (shouldRedirect) {
    return <Redirect to="/shows" />
  }

  return (
    <>
      <h1>We Have Evidence of a New Best Show!</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout">
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={newShow.title}
          />
        </label>

        <label>
          Network:
          <input
            type="text"
            name="network"
            onChange={handleInputChange}
            value={newShow.network}
          />
        </label>

        <label>
          Premiere Year:
          <input
            type="text"
            name="premiereYear"
            onChange={handleInputChange}
            value={newShow.premiereYear}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newShow.description}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default NewShowForm
