import { Dropdown, Space, Table as AntTable, Tag } from "antd";
import type { MenuProps, PaginationProps, TableColumnsType } from 'antd';

import "./Table.scss";
import sortIcon from "../../assets/sort.svg";
import { AnyObject } from "antd/es/_util/type";
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";


const Table = (props: {data: AnyObject[], columns: TableColumnsType<AnyObject>, dataSize: number }) => {

    const [pageSize, setPageSize] = useState(0);
    useEffect(()=> {
        const maxPageSize = props.dataSize && props.dataSize < 10? props.dataSize : 10;
        setPageSize(maxPageSize);
    }, [props.dataSize])

    const onSelectPageSize: MenuProps['onClick'] = ({ key }) => {
        setPageSize(Number(key));
    };

    // Transform the headers to have custom sort icon
    const getHeaderTitleElement =(title:string, isSortable: boolean)=> {

        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                {title} 
                {isSortable &&
                <button className="sort-button">
                    <img src={sortIcon} alt="sort" style={{ marginLeft: "8px" }} />
                </button>}
            </div>
        )
    }

    const formattedColumns = props.columns?.map(item=> ({
        ...item,
        title: getHeaderTitleElement(item.title as string, item.sorter? true : false),
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
        for (let i = 0; i < pageSize; i++) {
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
                    <Space className="pagesize-value">
                        {pageSize}
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
                <span>out of {total}</span>
            </div>
        );
    };

    const formatData = props.data?.map((item)=> ({
        ...item, 
        status: <Tag color={item.status?.toLowerCase()==="active"? "green": "red"}>{item.status}</Tag>
    }));
        

    return (
        <div className="table-wrapper">
            <AntTable 
                dataSource={formatData} 
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

export default Table;