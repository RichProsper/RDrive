import classes from './Modal.module.css'
import { useRef } from 'react'

export default function Modal({ closeModal, headerText, children }) {
    const modalBg = useRef()

    /**
     * @param {MouseEvent} e 
     */
    const closeModalHelper = e => {
        if (e.target === modalBg.current) closeModal()
    }

    return (
        <div ref={modalBg} className={classes.Modal} onClick={closeModalHelper}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h3>{headerText ? headerText : 'Header...'}</h3>
                    
                    <button type="button" className={classes.close} onClick={closeModal}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className={classes.body}>
                    {children}
                </div>
            </div>
        </div>
    )
}