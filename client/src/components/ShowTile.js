import React from "react"
import { Link } from "react-router-dom"

const ShowTile = props => {
  const { id, title } = props
  return(
    <li><Link to={`/shows/${id}`}>{title}</Link></li>
  )
}

export default ShowTile