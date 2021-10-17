import { useCallback, useState, useEffect, useRef } from 'react'
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
    const [item, setItem] = useState({ type: null, path: null, name: null, createdAt: null })
    const [deleteModal, setDeleteModal] = useState(false)
    const { currentUser } = useAuthCtx()
    const touchstart = useRef(0)

    const openDeleteModal = () => setDeleteModal(true)
    const closeDeleteModal = () => setDeleteModal(false)

    const deleteFile = path => {
        const q = query(
            firestoreDb.files,
            where('userId', '==', currentUser.uid),
            where("path", "==", path)
        )

        getDocs(q).then(snapshot => {
            const existingFile = snapshot.docs[0]

            if (existingFile) {
                const fileRef = ref(storage, path)
                deleteObject(fileRef).catch(e => console.log(e))
                deleteDoc(existingFile.ref).catch(e => console.log(e))
            }
        })
    }

    const deleteFolder = (name, createdAt) => {
        const q = query(
            firestoreDb.folders,
            where('userId', '==', currentUser.uid),
            where('name', '==', name),
            where('createdAt', '==', parseInt(createdAt))
        )

        getDocs(q).then(snapshot => {
            const existingFolder = snapshot.docs[0]

            if (existingFolder) {
                const folder =  firestoreDb.getDocData(existingFolder)
                
                // Drill Down Through Child Folders
                const qfolders = query(
                    firestoreDb.folders,
                    where('userId', '==', currentUser.uid),
                    where('parentId', '==', folder.id)
                )
        
                getDocs(qfolders).then(snapshot => {
                    snapshot.forEach(doc => {
                        const childFolder = firestoreDb.getDocData(doc)
                        deleteFolder(childFolder.name, childFolder.createdAt)
                    })
                })

                // Get Child Files And Delete Them 1 by 1
                const qfiles = query(
                    firestoreDb.files,
                    where('userId', '==', currentUser.uid),
                    where('folderId', '==', folder.id)
                )
        
                getDocs(qfiles).then(snapshot => {
                    snapshot.forEach(doc => {
                        const childFile = firestoreDb.getDocData(doc)
                        deleteFile(childFile.path)
                    })
                }) 
                
                // Finally Delete The Folder
                deleteDoc(existingFolder.ref).catch(e => console.log(e))
            }
        })
    }

    const deleteItem = () => {
        if (item.type === ITEM_TYPES.FILE) deleteFile(item.path)
        else if (item.type === ITEM_TYPES.FOLDER) deleteFolder(item.name, item.createdAt)
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
                    path: elem.getAttribute('data-path'),
                    name: elem.getAttribute('data-name'),
                    createdAt: elem.getAttribute('data-created-at')
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

    const isTouchEnabled = useCallback(
        () => {
            return 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    navigator.msMaxTouchPoints > 0
        },
        []
    )

    const handleTouchStart = useCallback( () => touchstart.current = Date.now(), [touchstart] )

    const handleTouchEnd = useCallback(
        /**
         * @param {TouchEvent} e 
         */
        e => {
            if (
                e.target.hasAttribute('data-ctx-menu-opener') ||
                e.target.parentElement.hasAttribute('data-ctx-menu-opener')
            ) {
                if (Date.now() - touchstart.current >= 600) {
                    e.preventDefault()

                    const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
                    const touch = evt.touches[0] || evt.changedTouches[0]
                    
                    setAnchorCoords({
                        pageX: touch.pageX, pageY: touch.pageY,
                        clientX: touch.clientX, clientY: touch.clientY
                    })
    
                    const elem = e.target.hasAttribute('data-ctx-menu-opener') ?
                        e.target :
                        e.target.parentElement
    
                    setItem({
                        type: elem.getAttribute('data-type'),
                        path: elem.getAttribute('data-path'),
                        name: elem.getAttribute('data-name'),
                        createdAt: elem.getAttribute('data-created-at')
                    })
    
                    setShow(true)
                }
            }
        },
        [touchstart]
    )

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClick)
        window.addEventListener('resize', handleResize)

        if (isTouchEnabled()) {
            document.addEventListener('touchstart', handleTouchStart)
            document.addEventListener('touchend', handleTouchEnd)
        }

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClick)
            window.removeEventListener('resize', handleResize)

            if (isTouchEnabled()) {
                document.addEventListener('touchstart', handleTouchStart)
                document.addEventListener('touchend', handleTouchEnd)
            }
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
