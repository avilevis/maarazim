import React from 'react';
import Table from 'react-bootstrap/Table';

interface HeaderObj {
    name: string,
    key: string,
    width?: string | number,
    maxWidth?: string | number
}

interface TableBuilderProps {
    headers: HeaderObj[],
    itemList: object[],
    tableSlots?: (key: string, item: { [key: string]: any }) => void,
    responsive?: boolean
    className?: string,
    children?: any
}

function TableBuilder(props: TableBuilderProps) {
    return (
        <Table responsive={props.responsive ?? false} className={props.className} style={{tableLayout: 'fixed'}}>
            <thead>
            <tr>
                {props.headers?.map((header, index) => (
                    <th key={index}
                        style={{
                            width: header.width ?? 'auto',
                            maxWidth: header.maxWidth ?? 'auto',
                            overflow: 'hidden'
                        }}>{header.name}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.itemList?.map((item, index) => (
                <tr key={index}>
                    {props.headers?.map((header, index) => (
                        <td key={index} style={{
                            width: header.width ?? 'auto',
                            maxWidth: header.maxWidth ?? 'auto',
                            overflow: 'hidden'
                        }}>
                            {props.tableSlots ? props.tableSlots(header.key, item) : item[header.key]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default TableBuilder;