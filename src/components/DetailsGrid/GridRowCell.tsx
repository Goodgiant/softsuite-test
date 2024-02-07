import "./DetailsGrid.scss";

export interface DetailUnitType {
    title: string;
    value: string;
}

const GridRowCell = (props: {data: DetailUnitType}) => {


    return (
        <div className="grid-row-cell">
            <h4>{props.data.title}</h4>
            <p>{props.data.value}</p>
        </div>
    )
};

export default GridRowCell;