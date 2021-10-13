import classes from './ContextMenu.module.css'
import { useCallback, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

function ContextMenu() {
    const [anchorCoords, setAnchorCoords] = useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 })
    const [show, setShow] = useState(false)
    const [item, setItem] = useState({ type: null, id: null })

    const handleContextMenu = useCallback(
        /**
         * @param {MouseEvent} e
         */
        e => {
            e.preventDefault()

            if (
                e.target.hasAttribute('data-ctx-menu-opener') ||
                e.target.parentElement.hasAttribute('data-ctx-menu-opener')
            ) {
                setAnchorCoords({
                    pageX: e.pageX, pageY: e.pageY,
                    clientX: e.clientX, clientY: e.clientY
                })

                setShow(true)

                const elem = e.target.hasAttribute('data-ctx-menu-opener') ?
                    e.target :
                    e.target.parentElement

                setItem({
                    type: elem.getAttribute('data-type'),
                    id: elem.getAttribute('data-id')
                })
            }
        },
        [setAnchorCoords, setShow, setItem]
    )

    const handleClick = useCallback(
        /**
         * @param {MouseEvent} e
         */
        e => {
            if (show && item.type && !e.target.hasAttribute('data-context-menu')) {
                setShow(false)
                setItem({ type: null, id: null })
            }
        }, [show, item.type]
    )

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClick)
        }
    })

    const positionContextMenu = () => {
        let x = 0
        let y = 0

        if (anchorCoords.pageX || anchorCoords.pageY) {
            x = anchorCoords.pageX
            y = anchorCoords.pageY
        }
        else if (anchorCoords.clientX || anchorCoords.clientY) {
            x = anchorCoords.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
            y = anchorCoords.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }

        x = x / window.innerWidth * 100
        y = y / window.innerHeight * 100

        return { top: `${y}%`, left: `${x}%` }
    }

    return (
        <>
            {show && (
                <nav className={classes.ContextMenu} style={positionContextMenu()}>
                    <ul className={classes.list} data-context-menu>
                        <li>
                            <button type="button"><FontAwesomeIcon icon={faEdit}/> Rename</button>
                        </li>
                        <li>
                            <button type="button">
                                <FontAwesomeIcon icon={faTrashAlt} className={classes.delete} /> Delete
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default ContextMenu
