import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {

    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">CMO</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to='/'>Home <span class="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Вибір системи
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to='/withoutWaitingDiagramOne'>Одноканальна з відмовою</Link>
                      <Link className="list-group-item" to='/withWaitingDiagramOne'>Одноканальна з очікуванням</Link>
                      <div class="dropdown-divider"></div>
                      <Link className="list-group-item" to='/withoutWaitingDiagramMulti'>Багатоканальна з відмовою</Link>
                      <Link className="list-group-item" to='/withWaitingDiagramMulti'>Багатоканальна з очікуванням</Link>
                    </div>
                  </li>
                </ul>
              </div>
          </nav>
    )
  }
}

export default Header
