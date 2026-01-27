import { useEffect } from 'react'

function Modal({ isOpen, onClose, title, category, date, description, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`project-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-header">
          {category && <span className="modal-category">{category}</span>}
          <h2 className="modal-title">{title}</h2>
          {date && <p className="modal-date">{date}</p>}
        </div>
        <div className="modal-body">
          {description && <p>{description}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
