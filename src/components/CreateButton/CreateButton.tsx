import { MouseEventHandler } from "react";
import "./CreateButton.scss";
import { PlusOutlined } from "@ant-design/icons";

interface CreateButtonProps {
    text: string
    onClick: MouseEventHandler<HTMLButtonElement>
}

const CreateButton = (props: CreateButtonProps) => {

    return (
        <button id="create-button" onClick={props.onClick}>
            <p className="button-text">{props.text}</p>
            <PlusOutlined />
        </button>
    )
}

export default CreateButton;