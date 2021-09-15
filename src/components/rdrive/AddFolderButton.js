import { useState } from 'react'
import classes from './AddFolderButton.module.css'
import Modal from '../layouts/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import firestoreDb from '../../firebase'
import { addDoc } from '@firebase/firestore'
import useAuthCtx from '../../contexts/AuthContext'

export default function AddFolderButton({ currentFolder }) {
    const [modal, setModal] = useState(false)
    const { currentUser } = useAuthCtx()
    const formId = "formAddFolder"

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    /**
     * @param {SubmitEvent} e 
     */
    const addFolder = e => {
        e.preventDefault()

        const form = document.querySelector(`#${formId}`)
        const result = addDoc(firestoreDb.folders, {
            name: form.folderName.value,
            userId: currentUser.uid,
            createdAt: firestoreDb.getTimestamp(),
            parentId: currentFolder.id
        })
        console.log(result)

        closeModal()
    }

    return (
        <>
            <button type="button" className={classes.AddFolder} onClick={openModal} title='Add New Folder'>
                <FontAwesomeIcon icon={faFolderPlus} />
            </button>

            {modal && (
                <Modal
                    closeModal={closeModal}
                    headerText="Add New Folder"
                    confirmBtnText="Add Folder"
                    cancelBtnText="Cancel"
                    formId={formId}
                    addFolder={addFolder}
                />
            )}
        </>
    )
}
