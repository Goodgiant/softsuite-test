import "./NoDataDisplay.scss";
import noDataIcon from "../../assets/no-data-icon.svg";
import dangerIcon from "../../assets/danger.svg";

const NoDataDisplay = (props: {message?: string}) => {

    return (
        <div id="no-data-display-container">
            <img className="no-data-image" src={noDataIcon} alt="no data" />
            <div className="no-data-message">
                <img src={dangerIcon} alt="danger" />
                <p>{props.message || "There is nothing to display"}</p>
            </div>
        </div>
    )
}

export default NoDataDisplay;