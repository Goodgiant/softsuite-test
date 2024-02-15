import "./Sidebar.scss";
import switcherIcon from "../../assets/table_switch-icon.svg";
import carretDown from "../../assets/carret-down.svg";
import { Select } from "antd";

export const ModuleSwitcher = () => {

    return (
        <div className="module-switcher">
            <img src={switcherIcon} alt="module switch icon" />
            <div>
                <p>Switch Module</p>
                <h4>Payroll Management</h4>
            </div>
            <img src={carretDown} alt="carret" />
        </div>
    )
}