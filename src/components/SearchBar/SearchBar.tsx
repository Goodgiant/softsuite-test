import "./Searchbar.scss";
import { useState } from "react";
import searchIcon from "../../assets/search-icon.svg";

interface SearchBarPropType {
    placeholder: string
    onSubmit: (value: string) => void
    alt?: boolean
}
const SearchBar = (props: SearchBarPropType) => {
    const [value, setValue] = useState("");
    
    return (
        <div id={props.alt? "search-container-alt" : "search-container"}>
            <input 
                className="search-input"
                type="text" 
                placeholder={props.placeholder || "Search for anything..."}
                onChange={({target})=> { props.onSubmit(target.value); setValue(target.value); } }
            />
            <button className="search-button" onClick={()=> props.onSubmit(value)}>
                <img src={searchIcon} alt="Search" />
            </button>
        </div>
    )
}

export default SearchBar;