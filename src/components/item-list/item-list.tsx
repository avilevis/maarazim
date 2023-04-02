import styles from '@/components/item-list/item-list.module.scss';
import React, {useCallback, useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';
import ItemCard from '../item-card/item-card';
import Modal from 'react-bootstrap/Modal';
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
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const content = () => {
        if (error) {
            return (<p>{error}</p>)
        }
        if (isLoading) {
            return (<Spinner animation="grow"/>)
        }

        return ctx.itemList.map((item, index) => <ItemCard key={`itemcard${index}`}
                                                           onImageClick={openImageModal} {...item}/>)
    }
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

    const closeImageModal = () => {
        setItem(null)
    }
    const openImageModal = (item) => {
        setItem(() => item)
    }

    return (
        <>
            <div className={styles.box_list}>
                {content()}
            </div>

            <Modal show={!!item} onHide={closeImageModal}>
                <Modal.Header closeButton>
                    <h3>{item?.title}</h3>
                </Modal.Header>
                <Modal.Body className={styles.image_container}>
                    <img alt={'image'} src={item?.image}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ItemList;