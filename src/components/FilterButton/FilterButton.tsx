import "./FilterButton.scss";
import filterIcon from "../../assets/filter-icon.svg";
interface FilterButtonPropType {
    onClick?: (event: MouseEvent) => void
}

const FilterButton =(props: FilterButtonPropType)=> {

    return (
        <button id="filter-button" onClick={()=> props.onClick}>
            <img src={filterIcon} alt="filter" />
        </button>
    )
}

export default FilterButton;