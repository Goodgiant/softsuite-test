import "./Sidebar.scss";
import switcherIcon from "../../assets/table_switch-icon.svg";

export const ModuleSwitcher = (props: { title:string, value: string, icon: any, alt?: boolean}) => {

    return (
        <div className={props.alt? "module-switcher-alt" : "module-switcher"}>
            <img src={switcherIcon} alt="module switch icon" />
            <div>
                <p>{props.title}</p>
                <h4>{props.value}</h4>
            </div>
            {props.icon}
        </div>
    )
}