import "./Searchbar.scss";
import { MouseEventHandler, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";

interface SearchBarPropType {
    placeholder: string
    onSubmit: (value: string) => void
}
const SearchBar = (props: SearchBarPropType) => {
    const [value, setValue] = useState("");
    return (
        <div id="search-container">
            <input 
                className="search-input"
                type="text" 
                placeholder={props.placeholder || "Search for anything..."}
                onChange={({target})=> setValue(target.value)}
            />
            <button className="search-button" onClick={()=> props.onSubmit(value)}>
                <img src={searchIcon} alt="Search" />
            </button>
        </div>
    )
}

export default SearchBar;