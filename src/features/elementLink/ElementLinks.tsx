import { Breadcrumb, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ElementLinks.scss";
import { useEffect, useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementLinkTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SuccessModal, { SuccessModalProps } from "../../components/Modals/SuccessModal/SuccessModal";
import { ElementFormStateType } from "../../components/Forms/Element/ElementForm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CreateElementLinkThunk, DeleteElementLinkThunk, GetElementLinksThunk, UpdateElementLinkThunk, setSelectedElementLink } from "./elementLinkSlice";
import DeleteConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import DetailsGrid from "../../components/DetailsGrid/DetailsGrid";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import ElementLinkForm from "../../components/Forms/Element/ElementLinkForm";
import { GetGradesThunk, GetSuborganizatonsThunk, GetJobTitlesAndLocations, GetCategoriesAndTypes, GetUnions, myFullName } from "../../redux/generalSlice";
import { setSelectedElement } from "../element/elementSlice";

type ElementRowActions = "view"|"edit"|"delete";

const ElementLinks = () => {
    const dispatch = useAppDispatch();
    const { elementLinks, selectedElementLink } = useAppSelector(state=> state.elementLinks);
    const { grades, suborganizations, linkLookups } = useAppSelector(state=> state.general);
    const { selectedElement } = useAppSelector(state=> state.elements);
    const storedElement = JSON.parse(sessionStorage.getItem('selectedElement') as string);

    useEffect(()=> {
        if (storedElement) {
            dispatch(setSelectedElement(storedElement));
        }
    }, [])
    
    useEffect(()=> {
        readElementLinks();
        grades?.length < 1 && dispatch(GetGradesThunk());
        suborganizations?.length < 1 && dispatch(GetSuborganizatonsThunk());

        if (!linkLookups?.jobTitles?.length && !linkLookups?.locations?.length) {
            dispatch(GetJobTitlesAndLocations());
        }
        if (!linkLookups?.employeeCategories?.length && !linkLookups?.employeeTypes?.length) {
            dispatch(GetCategoriesAndTypes());
        }
        if (!linkLookups?.unions?.length) {
            dispatch(GetUnions());
        }
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successModalMode, setSuccessModalMode] = useState<SuccessModalProps["mode"]>("created");
    

    /** 
     * DATA MANAGEMENT: Dispatch functions for CRUD operations
    */
    const createElementLink = async (data: ElementFormStateType) => {
        dispatch(CreateElementLinkThunk(data))
        .then(({payload}:any)=> {

            if (payload) {
                setSuccessModalMode("created");
                setShowSuccessModal(true);
            }
        })
    }

    const readElementLinks = async () => {
        const { payload } =  await dispatch(GetElementLinksThunk());
        if (payload) {
            setShowSuccessModal(false);
            setShowForm(false);
        }
    }
    
    const updateElementLink = async (data: ElementFormStateType) => {
        const { payload } = await dispatch(UpdateElementLinkThunk(data));

        if (payload) {
            setSuccessModalMode("updated");
            setShowSuccessModal(true);
        }
    }

    const deleteElementLink = async () => {
        
        const { payload } = await dispatch(DeleteElementLinkThunk());
        if (payload) {
            setShowConfirmModal(false);
            setSuccessModalMode("deleted");
            setShowSuccessModal(true);
        }
    }
      

    /**
     *  Action functions for each menu option 
    */
   const onClickCreate = () => {
        dispatch(setSelectedElementLink(null));
        setShowForm(true); 
        setEditMode(false);
   }

    const onClickRowOption = (optionKey: ElementRowActions, rowData: AnyObject) => {
        switch (optionKey) {
            case 'view': viewElementLink(rowData); break;
            case 'edit': onClickEdit(rowData); break;
            case 'delete': onClickDelete(rowData); break;
        }
    }

    const viewElementLink = (rowData: ElementFormStateType) => {
        
        const formatData = { ...rowData, status: rowData.status?.props.children };
        dispatch(setSelectedElementLink(formatData));
        setOpenDrawer(true);
    }

    const onClickEdit = (rowData: ElementFormStateType) => {
        
        const formatData = { ...rowData, status: rowData.status?.props.children };
        dispatch(setSelectedElementLink(formatData));
        setEditMode(true);
        setShowForm(true);
    }

    const onClickDelete = (rowData: ElementFormStateType) => {
        
        const formatData = { ...rowData, status: rowData.status?.props.children };
        dispatch(setSelectedElementLink(formatData));
        setShowConfirmModal(true);
    }

    const rowOptions = [
        {
            label: `Edit`,
            key: `edit`,
            icon: <EditOutlined />,
            onclick: onClickEdit,
        },
        {
            label: `Delete`,
            key: `delete`,
            icon: <DeleteOutlined />,
            onclick: onClickDelete,
        }
    ];

    const columns: TableColumnsType<AnyObject> = [
        {
            title: "Name",
            dataIndex: 'name',
            sorter: {
              compare: (a, b) => a.name.localeCompare(b.name),
              multiple: 4,
            },
        },
        {
            title: 'Sub-Organization',
            dataIndex: 'suborganizationValueId',
            sorter: {
            compare: (a, b) => a.categoryValueId.localeCompare(b.categoryValueId),
            multiple: 3,
            },
        },
        {
            title: 'Department',
            dataIndex: 'departmentValueId',
            sorter: {
            compare: (a, b) => a.departmentValueId.localeCompare(b.departmentValueId),
            multiple: 2,
            },
        },
        {
            title: 'Employee Category',
            dataIndex: 'employeeCategoryValueId',
            sorter: {
            compare: (a, b) => a.employeeCategoryValueId.localeCompare(b.employeeCategoryValueId),
            multiple: 2,
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: {
            compare: (a, b) => a.amount - b.amount,
            multiple: 1,
            },
        },
        {
            title: 'Details',
            dataIndex: 'view',
            render: (_, rowData) => (
                <a className="elements-link-action-link" onClick={()=> onClickRowOption("view", rowData as ElementFormStateType)}>
                    View details
                </a>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, rowData) => (
                <div className="element-links-action-div">
                {
                    rowOptions.map((option, index)=> {
                        return <button key={index} onClick={()=> option.onclick(rowData as ElementFormStateType)}>{option.icon}</button>
                    })
                }
                </div>
            )
        },
    ];

    const elementDetails = [
        {
            title: "Element name",
            value: selectedElement?.name,
        },
        {
            title: "Element classification",
            value: selectedElement?.classificationValueId,
        },
        {
            title: "Element category",
            value: selectedElement?.categoryValueId,
        },
        {
            title: "Payrun",
            value: selectedElement?.payRunValueId,
        },
        {
            title: "Description",
            value: selectedElement?.description,
        },
        {
            title: "reporting name",
            value: selectedElement?.reportingName,
        },
        {
            title: "Effective start date",
            value: selectedElement?.effectiveStartDate,
        },
        {
            title: "Effective end date",
            value: selectedElement?.effectiveEndDate,
        },
        {
            title: "Processing type",
            value: selectedElement?.processingType,
        },
        {
            title: "Pay frequency",
            value: selectedElement?.payFrequency,
        },
        {
            title: "Pay months",
            value: selectedElement?.selectedMonths,
        },
        {
            title: "Prorate",
            value: selectedElement?.prorate,
        },
        {
            title: "Status",
            value: selectedElement?.status,
        },
        
    ]

    const getLookupInfo= (lookupId:string) =>{

        let objectInAddedInfoArray= selectedElementLink?.additionalInfo?.find(item=> item.lookupId === lookupId);

        linkLookups.unions?.find(item=> item.id === selectedElementLink?.unionId);
        
        if(objectInAddedInfoArray || Number(lookupId) < 9){
            let finder;
            if (lookupId === '9') {
                finder = linkLookups?.housings?.find(item=> item.id === objectInAddedInfoArray?.lookupValueId);
                
                return finder;
            }
            if (lookupId === '8') {
                finder = linkLookups.unions?.find(item=> item.id === selectedElementLink?.unionId);

                return finder;
            }

            return finder;
            
        } else {
            return null
        }
    }
    const elementLinkDetails = [
        {
            title: "Name",
            value: selectedElementLink?.name,
        },
        {
            title: "Sub Organization",
            value: selectedElementLink?.suborganizationValueId,
        },
        {
            title: "Department",
            value: selectedElementLink?.departmentValueId,
        },
        {
            title: "location",
            value: selectedElementLink?.locationValueId,
        },
        {
            title: "employee type",
            value: selectedElementLink?.employeeTypeValueId,
        },
        {
            title: "employee category",
            value: selectedElementLink?.employeeCategoryValueId,
        },
        {
            title: "Effective date",
            value: selectedElementLink?.effectiveStartDate,
        },
        {
            title: "Status",
            value: selectedElementLink?.status,
        },
        {
            title: "grade",
            value: selectedElementLink?.gradeValueId,
        },
        {
            title: "grade step",
            value: selectedElementLink?.gradeStepValueId,
        },
        {
            title: "amount type",
            value: selectedElementLink?.amountType,
        },
        {
            title: selectedElementLink?.amountType === "Fixed Value"? "amount" : "rate",
            value: selectedElementLink?.amountType === "Fixed Value"? selectedElementLink?.amount : selectedElementLink?.rate,
        },
        {
            title: "union",
            value: getLookupInfo('8')?.name,
        },
        {
            title: "housing",
            value: getLookupInfo("9")?.name,
        },
        {
            title: "Effective start date",
            value: selectedElementLink?.effectiveStartDate,
        },
        {
            title: "Effective end date",
            value: selectedElementLink?.effectiveEndDate,
        }
        
    ]

    const myCreatedData = elementLinks?.filter(link=> link.modifiedBy === myFullName && link.name?.includes(searchTerm));

    return (
        <div id="element-links-outlet">
            <div className="breadcrumb-container">
                <Breadcrumb separator=">" className="breadcrumbs" items={[{title: "Payroll Management"}, {title: "Element Setup"}, {title: "Elements"}, {title: "Element Links", className: "activeCrumb"}]} />
            </div>
            <main className="main-content">
                <Link to="/">
                <button className="back-button">
                    <ArrowLeftOutlined />
                </button>
                </Link>
                <h1 className="title">Element Details</h1>
                <section className="details">
                    <DetailsGrid data={elementDetails} />
                </section>


                <h1 className="title">Element Links</h1>
                <section className="actions">
                    <div className="search-filter">
                        <SearchBar placeholder="Search for element links" onSubmit={(value:string)=> setSearchTerm(value)} />
                    </div>
                    <CreateButton text="Create Element Link" onClick={onClickCreate} />
                </section>
                <section className="data-section">
                {
                    elementLinks?.length === 0?
                    <NoDataDisplay message="There are no element links to display" />
                    : 
                    <ElementLinkTable 
                        data={myCreatedData} 
                        columns={columns}
                        dataSize={myCreatedData.length}
                    />
                }
                </section>
            </main>

            <ElementLinkForm
                showForm={showForm}
                cancelShow={()=> setShowForm(false)}
                handleSubmit={editMode? updateElementLink : createElementLink}
                editMode={editMode}
            />

            <SuccessModal 
                mode={successModalMode}
                open={showSuccessModal}
                onCancel={readElementLinks}
                onConfirm={readElementLinks}
                pretext="Element link"
            />
            <DeleteConfirmationModal
                open={showConfirmModal}
                loading={false}
                onConfirm={deleteElementLink}
                onCancel={()=> setShowConfirmModal(false)}
                text="Are you sure you want to delete Element link?"
            />
            <SideDrawer data={elementLinkDetails} onClose={()=> setOpenDrawer(false)} open={openDrawer} title="element link details" />
        </div>
    )
}

export default ElementLinks;