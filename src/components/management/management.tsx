import styles from './management.module.scss'
import React, {useCallback, useEffect, useState} from 'react';
import TableBuilder from "@/components/table-biulder";
import {fetchReq} from "@/utils/request";
import {Button} from "react-bootstrap";

function Management() {
    const [itemList, setItemList] = useState([]);
    const fetchListHandler = useCallback(async () => {
        try {
            const data = await fetchReq()

            setItemList(() => data)
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    useEffect(() => {
        fetchListHandler()
    }, [fetchListHandler])

    const headers = [
        {name: '#', key: 'id'},
        {name: 'תמונה', key: 'image', maxWidth: 50},
        {name: 'כותרת', key: 'title'},
        {name: 'תת כותרת', key: 'sub_title'},
        {name: 'מידע', key: 'text'},
        {name: 'פעולות', key: 'actions'}
    ]

    const tableUniqueChildren = (key, item) => {
        if (key === 'image')
            return (
                <img alt={'image'} src={item.image} className={styles.item_image}/>
            )

        if (key === 'actions')
            return (
                <div className={styles.actions}>
                    <Button variant="primary">עריכה</Button>
                    <Button variant="danger">מחיקה</Button>
                </div>
            )

        return item[key]
    }

    return (
        <TableBuilder className={styles.management_table} responsive={true} headers={headers} itemList={itemList ?? []}
                      uniqueChildren={tableUniqueChildren}/>
    )
}

export default Management;