import { Breadcrumb } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Elements.scss";
import FilterButton from "../../components/FilterButton/FilterButton";
import { useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";

interface ElementType {
    name: string;
    category: string;
    class: string;
    status: "Active" | "Inactive";
    modifiedDateTime: string;
    modifiedBy: string;
}

const Elements = () => {
    const [elements, setElements] = useState<ElementType[]>([]);

    return (
        <div id="elements-outlet">
            <div className="breadcrumb-container">
                <Breadcrumb separator=">" className="breadcrumbs" items={[{title: "Payroll Management"}, {title: "Element Setup"}, {title: "Elements", className: "activeCrumb"}]} />
            </div>
            <main className="main-content">
                <h1 className="title">Elements</h1>
                <section className="actions">
                    <div className="search-filter">
                        <SearchBar placeholder="Search for element" onSubmit={(value:string)=> console.log({value})} />
                        <FilterButton />
                    </div>
                    <CreateButton text="Create Element" onClick={()=> null} />
                </section>
                <section className="data-section">
                {
                    elements.length === 0?
                    <NoDataDisplay message="There are no elements to display" />
                    :
                    null
                }
                </section>

            </main>
        </div>
    )
}

export default Elements;