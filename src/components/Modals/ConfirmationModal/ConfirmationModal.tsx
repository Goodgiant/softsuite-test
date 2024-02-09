import "./ConfirmationModal.scss";
import { Modal } from "antd";
import confirmDeleteIcon from "../../../assets/confirm-delete-icon.svg";

interface ConfirmationModalProps {
    open: boolean;
    onConfirm: () => void;
    text?: string;
    loading?: boolean;
    onCancel?: () => void;

}

const DeleteConfirmationModal = (props: ConfirmationModalProps) => {

    return (
        <Modal 
            open={props.open}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            confirmLoading={props.loading}
            closable={false}
            className="success-modal-wrapper"
            cancelButtonProps={{ 
                className: 'modal-cancel-delete',
            }}
            okButtonProps={{ 
                className: 'modal-confirm-delete',
            }}
            okText="Yes, Delete"
        >
            <div className="modal-icon-container">
                <img src={confirmDeleteIcon} alt="modal icon" />
            </div>
            <p className="modal-large-text">{props.text || `Are you sure you want to delete?`}</p>
            <p className="modal-small-text">You can't reverse this action</p>
        </Modal>
    )
}

export default DeleteConfirmationModal;