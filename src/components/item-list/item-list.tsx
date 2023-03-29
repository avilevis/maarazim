import React, {useCallback, useEffect, useState} from "react";
import ItemCard from '../item-card/item-card'
import styles from './item-list.module.css'
import {useAppContext} from "@/context/context";

async function fetchReq() {
    const response = await fetch('http://localhost:3000/api/list')
    if (!response.ok) {
        throw new Error('Something went wrong!')
    }

    return await response.json()
}

function ItemList() {
    const ctx = useAppContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetchListHandler = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await fetchReq()

            ctx.updateItemList(data)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchListHandler()
    }, [fetchListHandler])

    return (
        <div className={styles.box_list}>
            {ctx.itemList.map((item, index) => <ItemCard key={`itemcard${index}`} {...item}/>)}
        </div>
    )
}

export default ItemList;