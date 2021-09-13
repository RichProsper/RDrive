import classes from './Modal.module.css'
import { useRef } from 'react'
import Form from '../forms/Form'
import Input from '../forms/Input'
import Alert from '../forms/Alert'

export default function Modal({
    closeModal, headerText, confirmBtnText, cancelBtnText, formId, addFolder
}) {
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
                    <Form id={formId} onSubmit={addFolder}>
                        <Alert type="Error" />

                        <Input
                            name="folderName"
                            type="text"
                            placeholder="Folder Name *"
                            autoFocus
                            required
                        />

                        <div className={classes.btns}>
                            <button 
                                type="submit" 
                                className={classes.confirm} 
                            >
                                {confirmBtnText ? confirmBtnText : 'Yes'}
                            </button>

                            <button 
                                type="button" 
                                className={classes.cancel}
                                onClick={closeModal}
                            >
                                {cancelBtnText ? cancelBtnText : 'No'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}