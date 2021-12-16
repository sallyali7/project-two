import React from 'react'
import { Link } from 'react-router-dom'

function Home () {

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container pokecenter">
          <Link to={'/pokeIndex'}>
            <p className="title is-1 has-text-centered has-text-black">
          Pokècenter
            </p>
          </Link>
        </div>
      </div>
    </section>
  )

}

export default Home