import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import ShowTile from "./ShowTile"

const ShowsList = props => {
  const [shows, setShows] = useState([])

  const getShows = async () => {
    try {
      const response = await fetch("/api/v1/shows")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const showData = await response.json()
      setShows(showData.shows)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getShows()
  }, [])

  const showTiles = shows.map(show => {
    return(
      <ShowTile
        key={show.id}
        id={show.id}
        title={show.title}
        location={show.location}
      />
    )
  })

  return(
    <>
      <h1>My Shows</h1>
      <ul className="shows">
        {showTiles}
      </ul>
      <Link to="/shows/new">I OBJECT: I want to add a new Show!</Link>
    </>
  )
}

export default ShowsList