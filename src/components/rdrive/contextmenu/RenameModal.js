import Modal from '../../layouts/Modal'
import Form from '../../forms/Form'
import Alert from '../../forms/Alert'
import Input from '../../forms/Input'
import ButtonGroup from '../../forms/ButtonGroup'
import Button from '../../forms/Button'

export default function RenameModal({ closeModal, item, id, renameItem }) {
    return (
        <Modal
            closeModal={closeModal}
            headerText={`Rename ${item.type}: ${item.name}`}
        >
            <Form id={id} onSubmit={renameItem}>
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

                    <Button type="button" className="cancel" onClick={closeModal}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Form>
        </Modal>
    )
}
