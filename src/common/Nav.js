import { Link } from 'react-router-dom' 

function Nav () {
  return (
    <nav className= "navbar is-dark is-black">
      <div className= "container">
        <div className="navbar-brand">
          <Link to="/" className= "navbar-item"> 
            {' '}Home 
          </Link>
          <Link to="/pokeIndex" className= "navbar-item"> 
            {' '}Pokédex 
          </Link>
        </div>
      </div>
    </nav>  
  )
}

export default Nav 