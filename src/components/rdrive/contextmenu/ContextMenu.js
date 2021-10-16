import { useCallback, useState, useEffect } from 'react'
import Menu from './Menu'
import DeleteModal from './DeleteModal'
import firestoreDb, { storage } from '../../../firebase'
import { query, where, getDocs, deleteDoc } from '@firebase/firestore'
import { ref, deleteObject } from '@firebase/storage'
import useAuthCtx from '../../../contexts/AuthContext'

export const ITEM_TYPES = { FOLDER: 'Folder', FILE: 'File' }

function ContextMenu() {
    const [anchorCoords, setAnchorCoords] = useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 })
    const [show, setShow] = useState(false)
    const [item, setItem] = useState({ type: null, path: null, name: null })
    const [deleteModal, setDeleteModal] = useState(false)
    const { currentUser } = useAuthCtx()

    const openDeleteModal = () => setDeleteModal(true)
    const closeDeleteModal = () => setDeleteModal(false)

    const deleteItem = () => {
        if (item.type === ITEM_TYPES.FILE) {
            const q = query(
                firestoreDb.files,
                where('userId', '==', currentUser.uid),
                where("path", "==", item.path)
            )

            getDocs(q).then(snapshot => {
                const existingFile = snapshot.docs[0]

                if (existingFile) {
                    const fileRef = ref(storage, item.path)
                    deleteObject(fileRef).catch(e => console.log(e))
                    deleteDoc(existingFile.ref).catch(e => console.log(e))
                }
            })
        }
        else if (item.type === ITEM_TYPES.FOLDER) {

        }

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

                const path = elem.getAttribute('data-path')
                const pathArr = path.split('/')
                setItem({
                    type: elem.getAttribute('data-type'),
                    path,
                    name: pathArr[pathArr.length - 1]
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
            {show &&  <Menu style={positionContextMenu()}  openDeleteModal={openDeleteModal} />}

            {deleteModal && (
                <DeleteModal
                    closeModal={closeDeleteModal}
                    item={item}
                    deleteItem={deleteItem}
                />
            )}
        </>
    )
}

export default ContextMenu
