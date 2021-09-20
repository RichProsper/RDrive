import { useState } from 'react'
import classes from './AddFolderButton.module.css'
import Modal from '../layouts/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import firestoreDb from '../../firebase'
import { addDoc } from '@firebase/firestore'
import useAuthCtx from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../hooks/useFolder'

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

        const path = [...currentFolder.path]
        // Since Root folder is not an actual database element
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ id: currentFolder.id, name: currentFolder.name })
        }

        const form = document.querySelector(`#${formId}`)
        addDoc(firestoreDb.folders, {
            name: form.folderName.value,
            userId: currentUser.uid,
            createdAt: firestoreDb.getTimestamp(),
            modifiedAt: firestoreDb.getTimestamp(),
            parentId: currentFolder.id,
            path
        }).catch(e => console.log(e))
        
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
