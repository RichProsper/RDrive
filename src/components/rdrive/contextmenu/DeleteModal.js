import Modal from '../../layouts/Modal'
import ButtonGroup from '../../forms/ButtonGroup'
import Button from '../../forms/Button'

export default function DeleteModal({ closeModal, item, deleteItem }) {
    return (
        <Modal
            closeModal={closeModal}
            headerText={`Delete ${item.type}: ${item.name}`}
        >
            <p>Are you sure? This action cannot be reversed!</p>

            <ButtonGroup>
                <Button type="button" className="confirm" onClick={deleteItem}>
                    Delete {item.type}
                </Button>

                <Button type="button" className="cancel" onClick={closeModal}>
                    Cancel
                </Button>
            </ButtonGroup>
        </Modal>
    )
}
