import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useGroup } from '../context/GroupContext'

function Navbar() {
  const { group, toggleGroup, config } = useGroup()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to={`/?group=${group}`} className="logo-text">
            {config.logo}
          </Link>
        </div>

        <div className="group-toggle">
          <span className={`toggle-label witness-label ${group === 'fishermen' ? 'inactive' : ''}`}>
            Witness
          </span>
          <div
            className={`toggle-switch ${group === 'fishermen' ? 'active' : ''}`}
            onClick={toggleGroup}
          >
            <div className="toggle-slider"></div>
          </div>
          <span className={`toggle-label fishermen-label ${group === 'witness' ? 'inactive' : ''}`}>
            Fishermen
          </span>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to={`/?group=${group}`}
              className={isActive('/') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/work/?group=${group}`}
              className={isActive('/work') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              사역
            </Link>
          </li>
          <li>
            <Link
              to={`/news/?group=${group}`}
              className={isActive('/news') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              소식
            </Link>
          </li>
          <li>
            <Link
              to={`/people/?group=${group}`}
              className={isActive('/people') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              {config.sections.memberTitle}
            </Link>
          </li>
          <li>
            <a href="#contact" onClick={handleLinkClick}>Contact</a>
          </li>
        </ul>

        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
