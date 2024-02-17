import "./Sidebar.scss";
import { DownOutlined } from "@ant-design/icons";

export const ModuleSwitcher = (props: { title:string, value: string, icon: any, alt?: boolean}) => {

    return (
        <div className={props.alt? "module-switcher-alt" : "module-switcher"}>
            <div className="group-icon-text">
                {props.icon}
                <div>
                    <p>{props.title}</p>
                    <h4>{props.value}</h4>
                </div>
            </div>
            <DownOutlined />
        </div>
    )
}