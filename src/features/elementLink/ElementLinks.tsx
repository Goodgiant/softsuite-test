import { Breadcrumb, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ElementLinks.scss";
import { useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementLinkTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DetailsGrid from "../../components/DetailsGrid/DetailsGrid";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { Link } from "react-router-dom";
import SuccessModal, { SuccessModalProps } from "../../components/Modals/SuccessModal/SuccessModal";
import DeleteConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";

export interface ElementLinkType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
};

const ElementLinks = () => {
    const [elementLinks, setElementLinks] = useState<ElementLinkType[]>([
        {
          key: '1',
          name: 'John Brown',
          chinese: 98,
          math: 60,
          english: 70,
        },
        {
          key: '2',
          name: 'Jim Green',
          chinese: 98,
          math: 66,
          english: 89,
        },
        {
          key: '3',
          name: 'Joe Black',
          chinese: 98,
          math: 90,
          english: 70,
        },
        {
          key: '4',
          name: 'Jim Red',
          chinese: 88,
          math: 99,
          english: 89,
        },
    ]);
    const [selectedLink, setSelectedLink] = useState<ElementLinkType>();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successModalMode, setSuccessModalMode] = useState<SuccessModalProps["mode"]>("created");

    // Action functions for each menu option
    const closeDetails = () => {
        setDrawerOpen(false);
    };
    const viewLink = (rowData: ElementLinkType) => {
        setDrawerOpen(true);
        setSelectedLink(rowData);
    };
    const editLink = (rowData: ElementLinkType) => {
        
        setSelectedLink(rowData);
    }
    const deleteLink = (rowData: ElementLinkType) => {
        setShowConfirmModal(true);
        setSelectedLink(rowData);
    }

    /* TODO: Dynamically curate this list by mapping data fetch result keys */
    const rowOptions = [
        {
            label: `Edit`,
            key: `edit`,
            icon: <EditOutlined />,
            onclick: editLink,
        },
        {
            label: `Delete`,
            key: `delete`,
            icon: <DeleteOutlined />,
            onclick: deleteLink,
        }
    ];

    const mockColumns: TableColumnsType<AnyObject> = [
        {
          title: "Student",
          dataIndex: 'name',
          sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
            multiple: 4,
          },
        },
        {
          title: 'Chinese Score',
          dataIndex: 'chinese',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Math Score',
          dataIndex: 'math',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'English Score',
          dataIndex: 'english',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
        {
            title: 'Details',
            dataIndex: 'view',
            render: (_, rowData) => (
                <a className="elements-link-action-link" onClick={()=> viewLink(rowData as ElementLinkType)}>
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
                        return <button key={index} onClick={()=> option.onclick(rowData as ElementLinkType)}>{option.icon}</button>
                    })
                }
                </div>
            )
        },
    ];


    console.log({ selectedLink });
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
                    <DetailsGrid />
                </section>


                <h1 className="title">Element Links</h1>
                <section className="actions">
                    <div className="search-filter">
                        <SearchBar placeholder="Search for element links" onSubmit={(value:string)=> console.log({value})} />
                    </div>
                    <CreateButton text="Create Element Link" onClick={()=> null} />
                </section>
                <section className="data-section">
                {
                    elementLinks.length === 0?
                    <NoDataDisplay message="There are no elements to display" />
                    : 
                    <ElementLinkTable 
                        data={elementLinks} 
                        columns={mockColumns}
                    />
                }
                </section>
            </main>

            <SuccessModal 
                open={showSuccessModal}
                onConfirm={()=> alert("Re-fetching data...")}
                mode={successModalMode}
                text="Element link has been created successfully"
            />
            <DeleteConfirmationModal
                open={showConfirmModal}
                loading={false}
                onConfirm={()=> setShowConfirmModal(false)}
                onCancel={()=> setShowConfirmModal(false)}
                text="Are you sure you want to delete Element link?"
            />
            <SideDrawer onClose={closeDetails} open={drawerOpen} title="element link details" />
        </div>
    )
}

export default ElementLinks;