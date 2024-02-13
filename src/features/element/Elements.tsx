import { Breadcrumb, Dropdown, MenuProps, Space, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Elements.scss";
import FilterButton from "../../components/FilterButton/FilterButton";
import { useEffect, useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import RowActionButton from "../../components/Table/RowActionButton";
import { Link } from "react-router-dom";
import SuccessModal, { SuccessModalProps } from "../../components/Modals/SuccessModal/SuccessModal";
import ElementForm, { ElementFormStateType } from "../../components/Forms/CreateElement/ElementForm";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CreateElementThunk, DeleteElementThunk, GetElementsThunk, UpdateElementThunk, setSelectedElement } from "./elementSlice";
import DeleteConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";

type ElementRowActions = "view"|"edit"|"delete";

const Elements = () => {
    const dispatch = useAppDispatch();
    const { loading, elements } = useAppSelector(state=> state.elements);
    useEffect(()=> {
        readElement();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successModalMode, setSuccessModalMode] = useState<SuccessModalProps["mode"]>("created");
    

    /** 
     * DATA MANAGEMENT: Dispatch functions for CRUD operations
    */
    const createElement = async (data: ElementFormStateType) => {
        dispatch(CreateElementThunk(data))
        .then(({payload})=> {
            if (payload) {
                setSuccessModalMode("created");
                setShowSuccessModal(true);
            }
        })
    }

    const readElement = async () => {
        const { payload } =  await dispatch(GetElementsThunk());
        if (payload) {
            setShowSuccessModal(false);
            setShowForm(false);
        }
    }
    
    const updateElement = async (data: ElementFormStateType) => {
        const { payload } = await dispatch(UpdateElementThunk(data));

        if (payload) {
            setSuccessModalMode("updated");
            setShowSuccessModal(true);
        }
    }

    const deleteElement = async () => {
        
        const { payload } = await dispatch(DeleteElementThunk());
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
        dispatch(setSelectedElement(null));
        setShowForm(true); 
        setEditMode(false);
   }

    const onClickRowOption = (optionKey: ElementRowActions, rowData: AnyObject) => {
        switch (optionKey) {
            case 'view': viewElementLinks(rowData); break;
            case 'edit': onClickEdit(rowData); break;
            case 'delete': onClickDelete(rowData); break;
        }
    }

    const viewElementLinks = (rowData: ElementFormStateType) => {
        console.log({ rowData })
        dispatch(setSelectedElement(rowData));
    }

    const onClickEdit = (rowData: ElementFormStateType) => {
        console.log({ rowData })
        dispatch(setSelectedElement(rowData))
        setEditMode(true);
        setShowForm(true);
    }

    const onClickDelete = (rowData: ElementFormStateType) => {
        console.log({ rowData })
        dispatch(setSelectedElement(rowData));
        setShowConfirmModal(true);
    }

    const rowOptions: MenuProps["items"] = [
        {
            label: <Link to="element-links">View Element Links</Link>,
            key: `view`,
            icon: <EyeOutlined />,
            style: { color: "#2D416F" }
        },
        {
            label: `Edit`,
            key: `edit`,
            icon: <EditOutlined />,
            style: { color: "#2D416F" }
        },
        {
            label: `Delete`,
            key: `delete`,
            icon: <DeleteOutlined />,
            danger: true,
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

    
    return (
        <div id="elements-outlet">
            <div className="breadcrumb-container">
                <Breadcrumb separator=">" className="breadcrumbs" items={[{title: "Payroll Management"}, {title: "Element Setup"}, {title: "Elements", className: "activeCrumb"}]} />
            </div>
            <main className="main-content">
                <h1 className="title">Elements</h1>
                <section className="actions">
                    <div className="search-filter">
                        <SearchBar placeholder="Search for element" onSubmit={(value:string)=> setSearchTerm(value)} />
                        <FilterButton />
                    </div>
                    <CreateButton text="Create Element" onClick={onClickCreate} />
                </section>
                <section className="data-section">
                {
                    elements.length === 1?
                    <NoDataDisplay message="There are no elements to display" />
                    : 
                    <ElementTable 
                        data={elements.filter(element=> element.name?.toLowerCase().includes(searchTerm.toLowerCase()))} 
                        columns={columns}
                        dataSize={elements.length}
                    />
                }
                </section>

            </main>

            <ElementForm 
                showForm={showForm}
                cancelShow={()=> setShowForm(false)}
                handleSubmit={editMode? updateElement : createElement}
                editMode={editMode}
            />

            <DeleteConfirmationModal 
                open={showConfirmModal} 
                onConfirm={deleteElement} 
                onCancel={()=> setShowConfirmModal(false)}
                text= "Are you sure you want to delete this Element?"
                loading={loading}
            />

            <SuccessModal 
                mode={successModalMode}
                open={showSuccessModal}
                onCancel={readElement}
                onConfirm={readElement}
                pretext="Element"
            />
        </div>
    )
}

export default Elements;