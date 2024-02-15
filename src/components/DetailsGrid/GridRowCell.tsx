import "./DetailsGrid.scss";

export interface DetailUnitType {
    title: string;
    value: string | any;
}

const GridRowCell = ({data}: {data: DetailUnitType}) => {
    
    return (
        <div className="grid-row-cell">
            <h4>{data.title}</h4>
            {Array.isArray(data.value)?
                <span>{data.value?.map((value, i)=> <p>{`${value}${i === data.value.length-1? "" : ","}`}</p>)}</span>
                :
                <p>{data.value}</p>
            }
        </div>
    )
};

export default GridRowCell;