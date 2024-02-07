import { Breadcrumb, Dropdown, MenuProps, Space, TableColumnsType } from "antd";
import CreateButton from "../../components/CreateButton/CreateButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Elements.scss";
import FilterButton from "../../components/FilterButton/FilterButton";
import { useState } from "react";
import NoDataDisplay from "../../components/NoDataDisplay/NoDataDisplay";
import ElementTable from "../../components/Table/Table";
import { AnyObject } from "antd/es/_util/type";
import { DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import RowActionButton from "../../components/Table/RowActionButton";

export interface ElementType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

type ElementRowActions = "view"|"edit"|"delete";

const Elements = () => {
    const [elements, setElements] = useState<ElementType[]>([]);

    const mockData: ElementType[] = [
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
      

    //  Action options is setup for each record row
    const rowOptions: MenuProps["items"] = [
        {
            label: `View Element Links`,
            key: `view`,
            icon: <EyeOutlined />,
        },
        {
            label: `Edit`,
            key: `edit`,
            icon: <EditOutlined />
        },
        {
            label: `Delete`,
            key: `delete`,
            icon: <DeleteOutlined />
        }
    ];
    const onClickRowOption = (optionKey: ElementRowActions, rowData: AnyObject) => {
        switch (optionKey) {
            case 'view': viewElementLinks(rowData); break;
            case 'edit': editElement(rowData); break;
            case 'delete': deleteElement(rowData); break;
        }
    }

    // Action functions for each row option
    const viewElementLinks = (rowData: AnyObject) => {
        console.log({ rowData })
    }
    const editElement = (rowData: AnyObject) => {
        console.log({ rowData })
    }
    const deleteElement = (rowData: AnyObject) => {
        console.log({ rowData })
    }

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
                    elements.length === 1?
                    <NoDataDisplay message="There are no elements to display" />
                    : 
                    <ElementTable 
                        data={mockData} 
                        columns={mockColumns}
                    />
                }
                </section>

            </main>
        </div>
    )
}

export default Elements;