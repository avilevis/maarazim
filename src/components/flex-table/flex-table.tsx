import styles from './flex-table.module.scss';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {ItemInterface} from "@/intefaces/item.inteface";

interface HeaderObj {
    name: string
    key: string
    width?: string | number
    maxWidth?: string | number
}

interface FlexTableProps {
    headers: HeaderObj[]
    itemList: ItemInterface[]
    tableSlots?: (key: string, item: ItemInterface) => void
    className?: string
    children?: any
    rowHeight?: string | number
    rowMaxHeight?: string | number
    inTableEditComponent?: (item: ItemInterface | null, onSave: any) => void
    addButton?: { name: string, inTableAddComponent: (item?: ItemInterface) => JSX.Element }
}

function FlexTable(props: FlexTableProps) {
    const [showAddComp, setShowAddComp] = useState(false)
    const generateHeaders = () => (
        <div className={styles.headers}>
            {props.headers.map((header, index) => (
                <span key={index} style={{
                    width: header.width ?? 'auto',
                    maxWidth: header.maxWidth ?? 'auto'
                }} className={styles.th}>{header.name}</span>
            ))}
        </div>
    )

    const generateRows = () => {
        const rows = props.itemList.map((item, itemIndex) => (
            <div className={styles.row_container} key={itemIndex}>
                <div className={styles.row}
                     style={{height: props.rowHeight ?? 'auto', maxHeight: props.rowMaxHeight ?? 'auto'}}>
                    {props.headers.map((header, index) => (
                        <span key={`${itemIndex}${index}`} style={{
                            width: header.width ?? 'auto',
                            maxWidth: header.maxWidth ?? 'auto'
                        }} className={styles.td}>
                            {props.tableSlots && props.tableSlots(header.key, item) ?? item[header.key]}
                        </span>
                    ))}
                </div>
                {item.edit && props.inTableEditComponent ? props.inTableEditComponent(item) : ''}
            </div>
        ))

        return (
            <div className={styles.body}>
                {rows}
            </div>
        )
    }

    const addButton = () => (
        <>
            {!showAddComp && <Button variant="primary"
                                     onClick={setShowAddComp.bind(this, true)}>{props.addButton?.name}</Button>}
            {showAddComp && props.inTableEditComponent && props.inTableEditComponent(null, setShowAddComp.bind(this, false))}
        </>

    )

    return (
        <div className={[styles.flex_table, props.className].join(" ")}>
            {generateHeaders()}
            {generateRows()}
            {!!props.addButton && addButton()}
        </div>

    )
}

export default FlexTable;