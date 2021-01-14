import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ShowDetail = props => { 
  const [show, setShow] = useState({})

  const getShow = async () => {
    try {
      const response = await fetch(`/api/v1/shows/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const showData = await response.json()
      setShow(showData.show)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getShow()
  }, [])

  let networkSection
  if(show.network) {
    networkSection = <h4>Aired on {show.network}</h4>
  }

  return(
    <>
      <h1>{show.title}</h1>
      <h3>Premiered: {show.premiereYear}</h3>
      {networkSection}
      <p>{show.description}</p>
      <hr />
      <Link to="/shows">Back to All Shows</Link>
    </>
  )
}

export default ShowDetail