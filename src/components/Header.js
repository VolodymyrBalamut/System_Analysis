import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to='/'>СМО <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Вибір системи
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/*<Link className="dropdown-item" to='/withoutWaitingDiagramOne'>Одноканальна з відмовою</Link>
                <Link className="dropdown-item" to='/withWaitingDiagramOne'>Одноканальна з очікуванням</Link>*/}
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/withoutWaitingDiagramMulti`}>Багатоканальна розімкнута з відмовою</Link>
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/withWaitingDiagramMulti`}>Багатоканальна розімкнута з очікуванням</Link>
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/withWaitingClosedDiagramMulti`}>Багатоканальна замкнена з очікуванням</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                МЕО
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/*<Link className="dropdown-item" to='/withoutWaitingDiagramOne'>Одноканальна з відмовою</Link>
                <Link className="dropdown-item" to='/withWaitingDiagramOne'>Одноканальна з очікуванням</Link>*/}
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/MEO`}>Практична робота 1</Link>
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/Lab2`}>Практична робота 2</Link>
                <Link className="dropdown-item" to={`${process.env.PUBLIC_URL}/Lab3`}>Практична робота 3</Link>
              </div>
            </li>
          </ul>
        </div>
    </nav>
    )
  }
}

export default Header
