import { useState } from 'react'
import classes from './AddFolderButton.module.css'
import Modal from '../layouts/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import firestoreDb from '../../firebase'
import { addDoc } from '@firebase/firestore'

export default function AddFolderButton() {
    const [modal, setModal] = useState(false)
    const formId = "formAddFolder"

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    /**
     * @param {SubmitEvent} e 
     */
    const addFolder = e => {
        e.preventDefault()

        const form = document.querySelector(`#${formId}`)
        console.log( addDoc(firestoreDb.folders, { name: form.folderName.value}) )

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
