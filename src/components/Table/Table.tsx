import { Dropdown, Pagination, Space, Table } from "antd";
import type { MenuProps, PaginationProps, TableColumnsType } from 'antd';

import "./Table.scss";
import sortIcon from "../../assets/sort.svg";
import { AnyObject } from "antd/es/_util/type";
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";


const ElementTable = (props: {data: AnyObject[], columns: TableColumnsType<AnyObject>, rowActions?: { [x:string]: (rowData: AnyObject) => void }[] }) => {
    const maxPageSize = props.data.length < 10? props.data.length : 10;
    const [pageSize, setPageSize] = useState(maxPageSize);
    const onSelectPageSize: MenuProps['onClick'] = ({ key }) => {
        setPageSize(Number(key));
    };

    // Transform the headers to have custom sort icon
    const getHeaderTitleElement =(title:string)=> {

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                {title} 
                {title.toLowerCase() !== "action" &&
                <button className="sort-button">
                    <img src={sortIcon} alt="sort" style={{ marginLeft: "8px" }} />
                </button>}
            </div>
        )
    }
    const formattedColumns = props.columns?.map(item=> ({
        ...item,
        title: getHeaderTitleElement(item.title as string),
    }));

    // Pagination Navigation Render function
    const pageNavigationDisplay: PaginationProps['itemRender'] = (page, type, originalElement) => {
        if (type === 'prev') {
          return <a><LeftOutlined /></a>;
        }
        if (type === 'page') {
            return <a>{page}</a>;
        }
        if (type === 'next') {
          return <a><RightOutlined /></a>;
        }
        return originalElement;
    };

    // Page size render function
    const pageSizeDisplay = (total:number) => {
        const pageSizeOptions: MenuProps["items"] = [];
        for (let i = 0; i < maxPageSize; i++) {
            pageSizeOptions.push({
                label: `${i+1}`,
                key: `${i+1}`
            });
        };

        return (
            <div className="pagesize-container">
                <span>Showing</span>
                <Dropdown className="pagesize-dropdown" menu={{ items: pageSizeOptions, onClick: onSelectPageSize }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {pageSize}
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
                <span>out of {total}</span>
            </div>
        );
    };

    return (
        <div className="table-wrapper">
            <Table 
                dataSource={props.data} 
                columns={formattedColumns}  
                pagination={{
                    pageSize,
                    itemRender: pageNavigationDisplay,
                    showTotal: pageSizeDisplay
                }}
            />
        </div>
    )
}

export default ElementTable;