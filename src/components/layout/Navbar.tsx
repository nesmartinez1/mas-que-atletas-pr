import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PlaceholderImage from '../PlaceholderImage'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/deportes', label: 'Deportes' },
  { to: '/noticias', label: 'Noticias y Actualizaciones' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <PlaceholderImage label="Logo" ratio="1/1" className="navbar-logo" />
        <span className="navbar-title">Más que Atletas PR INC</span>
      </div>

      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={isOpen}
        aria-controls="navbar-menu"
        aria-label="Abrir menú"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="navbar-menu" className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <nav className="navbar-links">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setIsOpen(false)}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <form
          className="navbar-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="search" placeholder="Buscar..." aria-label="Buscar" />
        </form>
      </div>
    </header>
  )
}

export default Navbar
