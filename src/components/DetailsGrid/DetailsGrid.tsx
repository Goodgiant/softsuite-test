import "./DetailsGrid.scss";
import GridRowCell, { DetailUnitType } from "./GridRowCell";



const DetailsGrid = (props: {data?: DetailUnitType[]}) => {

    // mock array: DELETE LATER
    let mockArray = props.data || new Array<DetailUnitType>(5).fill({
        title: "Element Name",
        value: "Element Value"
    });

    // format data array to contain even amount of cells
    if (mockArray.length % 2 !== 0) {
        mockArray.push({title: "", value: ""})
    }

    return (
        <div id="details-grid-container">
        {
            mockArray.map((item, i) => <GridRowCell key={i} data={item} />)
        }
        </div>
    )
}

export default DetailsGrid;