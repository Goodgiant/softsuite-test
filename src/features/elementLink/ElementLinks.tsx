import { Breadcrumb, Dropdown, MenuProps, Space, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ElementLinks.scss";
import { useEffect, useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementLinkTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import RowActionButton from "../../components/Table/RowActionButton";
import { Link } from "react-router-dom";
import SuccessModal, { SuccessModalProps } from "../../components/Modals/SuccessModal/SuccessModal";
import ElementForm, { ElementFormStateType } from "../../components/Forms/CreateElement/ElementForm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CreateElementLinkThunk, DeleteElementLinkThunk, GetElementLinksThunk, UpdateElementLinkThunk, setSelectedElementLink } from "./elementLinkSlice";
import DeleteConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import DetailsGrid from "../../components/DetailsGrid/DetailsGrid";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import ElementLinkForm from "../../components/Forms/CreateElement/ElementLinkForm";
import { GetGradesThunk, GetElementLookupsThunk, GetSuborganizatonsThunk, GetGradeStepsThunk, GetJobTitlesAndLocations, GetCategoriesAndTypes, GetUnions } from "../../redux/generalSlice";

type ElementRowActions = "view"|"edit"|"delete";

const ElementLinks = () => {
    const dispatch = useAppDispatch();
    const { loading, elementLinks } = useAppSelector(state=> state.elementLinks);
    const { selectedElement } = useAppSelector(state=> state.elements);
    
    useEffect(()=> {
        readElementLinks();
        dispatch(GetGradesThunk());
        dispatch(GetSuborganizatonsThunk());
        dispatch(GetJobTitlesAndLocations());
        dispatch(GetCategoriesAndTypes());
        dispatch(GetUnions());
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

    // const rowOptions: MenuProps["items"] = [
    //     {
    //         label: <Link to="element-links">View Element Links</Link>,
    //         key: `view`,
    //         icon: <EyeOutlined />,
    //         style: { color: "#2D416F" }
    //     },
    //     {
    //         label: `Edit`,
    //         key: `edit`,
    //         icon: <EditOutlined />,
    //         style: { color: "#2D416F" }
    //     },
    //     {
    //         label: `Delete`,
    //         key: `delete`,
    //         icon: <DeleteOutlined />,
    //         danger: true,
    //     }
    // ];

       /* TODO: Dynamically curate this list by mapping data fetch result keys */
       /**
     *  Action functions for each menu option 
    */

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

    const tempcolumns: TableColumnsType<AnyObject> = [
        {
          title: "Name",
          dataIndex: 'name',
          sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
            multiple: 4,
          },
        },
        {
          title: 'Element Category',
          dataIndex: 'categoryValueId',
          sorter: {
            compare: (a, b) => a.categoryValueId.localeCompare(b.categoryValueId),
            multiple: 3,
          },
        },
        {
          title: 'Element Classification',
          dataIndex: 'classificationValueId',
          sorter: {
            compare: (a, b) => a.classificationValueId.localeCompare(b.classificationValueId),
            multiple: 2,
          },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          sorter: {
            compare: (a, b) => a.status.localeCompare(b.status),
            multiple: 1,
          },
        },
        {
            title: 'Date & Time Modified',
            dataIndex: 'createdAt',
            sorter: {
              compare: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
              multiple: 1,
            },
        },
        {
            title: 'ModifiedBy',
            dataIndex: 'modifiedBy',
            sorter: {
              compare: (a, b) => a.modifiedBy.localeCompare(b.modifiedBy),
              multiple: 5,
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, rowData) => (
                <Dropdown 
                    className="row-option-dropdown" 
                    menu={{ 
                        items: rowOptions, 
                        onClick: ({ key })=> onClickRowOption(key as ElementRowActions, rowData) 
                    }} 
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <RowActionButton />
                    </Space>
                    </a>
                </Dropdown>
            )
        },
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
            title: 'Element Category',
            dataIndex: 'categoryValueId',
            sorter: {
            compare: (a, b) => a.categoryValueId.localeCompare(b.categoryValueId),
            multiple: 3,
            },
        },
        {
            title: 'Element Classification',
            dataIndex: 'classificationValueId',
            sorter: {
            compare: (a, b) => a.classificationValueId.localeCompare(b.classificationValueId),
            multiple: 2,
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: {
            compare: (a, b) => a.status.localeCompare(b.status),
            multiple: 1,
            },
        },
        {
            title: 'Date & Time Modified',
            dataIndex: 'createdAt',
            sorter: {
                compare: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                multiple: 1,
            },
        },
        {
            title: 'ModifiedBy',
            dataIndex: 'modifiedBy',
            sorter: {
                compare: (a, b) => a.modifiedBy.localeCompare(b.modifiedBy),
                multiple: 5,
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
                        data={elementLinks?.filter(link=> link.name?.includes(searchTerm))} 
                        columns={columns}
                        dataSize={elementLinks.length}
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
                onConfirm={()=> setShowConfirmModal(false)}
                onCancel={()=> setShowConfirmModal(false)}
                text="Are you sure you want to delete Element link?"
            />
            <SideDrawer onClose={()=> setOpenDrawer(false)} open={openDrawer} title="element link details" />
        </div>
    )
}

export default ElementLinks;