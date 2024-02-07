import { Breadcrumb, Dropdown, MenuProps, Space, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ElementLinks.scss";
import FilterButton from "../../components/FilterButton/FilterButton";
import { useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementLinkTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import RowActionButton from "../../components/Table/RowActionButton";
import DetailsGrid from "../../components/DetailsGrid/DetailsGrid";

export interface ElementLinkType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

type ElementRowActions = "view"|"edit"|"delete";

const ElementLinks = () => {
    const [elementLinks, setElementLinks] = useState<ElementLinkType[]>([]);

    const mockData: ElementLinkType[] = [
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
    ];
      

    //  Action options for each table row record
    const rowOptions: MenuProps["items"] = [
        {
            label: `View Element Links`,
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
    const onClickRowOption = (optionKey: ElementRowActions, rowData: AnyObject) => {
        switch (optionKey) {
            case 'view': viewElementLinks(rowData); break;
            case 'edit': editElement(rowData); break;
            case 'delete': deleteElement(rowData); break;
        }
    }

    // Action functions for each menu option
    const viewElementLinks = (rowData: AnyObject) => {
        console.log({ rowData })
    }
    const editElement = (rowData: AnyObject) => {
        console.log({ rowData })
    }
    const deleteElement = (rowData: AnyObject) => {
        console.log({ rowData })
    }

    /* TODO: Dynamically curate this list by mapping data fetch result keys */
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
        <div id="element-links-outlet">
            <div className="breadcrumb-container">
                <Breadcrumb separator=">" className="breadcrumbs" items={[{title: "Payroll Management"}, {title: "Element Setup"}, {title: "Elements"}, {title: "Element Links", className: "activeCrumb"}]} />
            </div>
            <main className="main-content">
                
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
                    elementLinks.length === 1?
                    <NoDataDisplay message="There are no elements to display" />
                    : 
                    <ElementLinkTable 
                        data={mockData} 
                        columns={mockColumns}
                    />
                }
                </section>

            </main>
        </div>
    )
}

export default ElementLinks;