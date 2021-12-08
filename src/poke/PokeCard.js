import { Link } from 'react-router-dom'


function PokeCard ({ name, image, id }) {
  return (
    <div key={name} className="column is-one-fifth">
      <Link to={`/pokemon/${id}`}>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">
              {name.toUpperCase()}
            </p>
          </div>
          <div className="card-image">
            <figure className="image image-is-1-by-1">
              <img src={image} alt="" loading="lazy"/>
            </figure>
          </div>
        </div>
      </ Link>
    </div>
  )
}

export default PokeCard