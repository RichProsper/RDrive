import { useState } from 'react'
import classes from './AddFolderButton.module.css'
import Modal from '../layouts/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

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
        console.log(form.folderName.value)
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
