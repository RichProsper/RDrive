import classes from './ContextMenu.module.css'
import { useCallback, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import Modal from '../layouts/Modal'
import Form from '../forms/Form'
import Alert from '../forms/Alert'
import Input from '../forms/Input'
import ButtonGroup from '../forms/ButtonGroup'
import Button from '../forms/Button'

export const ITEM_TYPES = { FOLDER: 'Folder', FILE: 'File' }
export const ITEM_ACTIONS = { RENAME:'Rename', DELETE: 'Delete' }

function ContextMenu() {
    const [anchorCoords, setAnchorCoords] = useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 })
    const [show, setShow] = useState(false)
    const [item, setItem] = useState({ type: null, id: null, name: null })
    const [renameModal, setRenameModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const formId = "formRename"

    const openRenameModal = () => setRenameModal(true)
    const closeRenameModal = () => setRenameModal(false)
    const openDeleteModal = () => setDeleteModal(true)
    const closeDeleteModal = () => setDeleteModal(false)

    /**
     * @param {SubmitEvent} e
     */
    const renameItem = e => {
        e.preventDefault()

        const form = document.querySelector(`#${formId}`)
        console.log(form.rename.value)

        closeRenameModal()
    }
    const deleteItem = () => {
        console.log(ITEM_ACTIONS.DELETE)
        closeDeleteModal()
    }

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

                const elem = e.target.hasAttribute('data-ctx-menu-opener') ?
                    e.target :
                    e.target.parentElement

                setItem({
                    type: elem.getAttribute('data-type'),
                    id: elem.getAttribute('data-id'),
                    name: elem.getAttribute('data-name')
                })

                setShow(true)
            }
        },
        [setAnchorCoords, setShow, setItem]
    )

    const handleClick = useCallback(
        /**
         * @param {MouseEvent} e
         */
        e => {
            if (show && !e.target.hasAttribute('data-context-menu')) {
                setShow(false)
            }
        },
        [show]
    )

    const handleResize = useCallback(
        () => {
            if (show) setShow(false)
        },
        [show]
    )

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClick)
        window.addEventListener('resize', handleResize)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClick)
            window.removeEventListener('resize', handleResize)
        }
    })

    const positionContextMenu = () => {
        const wBuff = 24
        const hBuff = 10
        const menu = { w: 100, h: 80 }
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

        if ( (window.innerWidth - x) < (menu.w + wBuff) ) x -= menu.w
        if ( (window.innerHeight - y) < (menu.h + hBuff) ) y -= menu.h

        return { top: `${y}px`, left: `${x}px` }
    }

    return (
        <>
            {show && (
                <nav className={classes.ContextMenu} style={positionContextMenu()}>
                    <ul className={classes.list} data-context-menu>
                        <li>
                            <button type="button" onClick={openRenameModal}>
                                <FontAwesomeIcon icon={faEdit}/> Rename
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={openDeleteModal}>
                                <FontAwesomeIcon icon={faTrashAlt} className={classes.delete} /> Delete
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {renameModal && (
                <Modal
                    closeModal={closeRenameModal}
                    headerText={`Rename ${item.type}: ${item.name}`}
                >
                    <Form id={formId} onSubmit={renameItem}>
                        <Alert type="Error" />

                        <Input
                            name="rename"
                            type="text"
                            placeholder={`Rename ${item.type} *`}
                            autoFocus
                            required
                        />

                        <ButtonGroup>
                            <Button type="submit" className="confirm">
                                Rename {item.type}
                            </Button>

                            <Button type="button" className="cancel" onClick={closeRenameModal}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Modal>

            )}

            {deleteModal && (
                <Modal
                    closeModal={closeDeleteModal}
                    headerText={`Delete ${item.type}: ${item.name}`}
                >
                    <p>Are you sure? This action cannot be reversed?</p>

                    <ButtonGroup>
                        <Button type="button" className="confirm" onClick={deleteItem}>
                            Delete {item.type}
                        </Button>

                        <Button type="button" className="cancel" onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Modal>
            )}
        </>
    )
}

export default ContextMenu
