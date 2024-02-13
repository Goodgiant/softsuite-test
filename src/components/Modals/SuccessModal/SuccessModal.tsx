import { Modal } from "antd";
import "./SuccessModal.scss";
import successCreateUpdateIcon from "../../../assets/success-create-update-icon.svg";
import successDeleteIcon from "../../../assets/success-delete-icon.svg";

export interface SuccessModalProps {
    mode: 'created' | 'updated' | 'deleted';
    open: boolean;
    pretext?: string;
    loading?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;

}

const SuccessModal = (props: SuccessModalProps) => {

    const getModeIcon = (mode: SuccessModalProps["mode"]) => {
        switch(mode) {
            case "created": return successCreateUpdateIcon;
            case "deleted": return successDeleteIcon;
            default: return successCreateUpdateIcon;
        }
    }

    return (
        <Modal 
            open={props.open}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            confirmLoading={props.loading}
            centered
            closable={false}
            className="success-modal-wrapper"
            cancelButtonProps={{ style: { display: 'none' }}}
            okButtonProps={{ 
                className: 'success-modal-confirm',
            }}
            okText="Close to continue"
        >
            <div className="modal-icon-container">
                <img src={getModeIcon(props.mode)} alt="modal icon" />
            </div>
            <p className="modal-text">{`${props.pretext} has been ${props.mode} sucessfully`}</p>
        </Modal>
    )
}

export default SuccessModal;