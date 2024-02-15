import { Drawer } from "antd";
import "./SideDrawer.scss";
import { CloseOutlined } from "@ant-design/icons";
import DetailsGrid from "../DetailsGrid/DetailsGrid";
import { AnyObject } from "yup";
import { DetailUnitType } from "../DetailsGrid/GridRowCell";


const SideDrawer = (props: {data:DetailUnitType[], onClose: ()=> void, open: boolean, title: string}) => {
    const buildTitle = () => {
        return (
            <div className="title-container">
                <button onClick={props.onClose}>
                    <CloseOutlined />
                </button>
                <p>{props.title}</p>
            </div>
        )
    }
    
    return (
        <Drawer
            title={buildTitle()}
            size={"large"}
            placement="right"
            closable={false}
            onClose={props.onClose}
            open={props.open}
            getContainer={false}
        >
            <DetailsGrid data={props.data} />
        </Drawer>
    )
}

export default SideDrawer;