import styles from './management.module.scss'
import React, {useCallback, useEffect, useReducer} from 'react';
import {getList, addItem, updateItem, deleteItem} from "@/utils/request";
import {Button} from "react-bootstrap";
import ItemForm from "@/components/management/item-form";
import FlexTable from "@/components/flex-table/flex-table";
import {MdDeleteForever} from 'react-icons/md';
import {AiTwotoneEdit, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {ItemInterface} from "@/intefaces/item.inteface";
import {ItemDto} from "@/dto/item.dto";

const itemListReducer = (state: any[] | [], action: { [key: string]: any }) => {
    if (action?.type == 'UPDATE_LIST')
        return [...action.value]

    if (action?.type == 'SET_EDIT') {
        const itemIndex = state.findIndex(item => item.id == action.value.id)
        state[itemIndex].edit = !state[itemIndex].edit;
        return [...state]
    }

    return []
}

function Management(): JSX.Element {
    const [itemList, dispatchItemList] = useReducer(itemListReducer);
    const fetchListHandler = useCallback(async () => {
        try {
            const data = await getList()

            dispatchItemList({type: "UPDATE_LIST", value: data})
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    useEffect(() => {
        fetchListHandler()
    }, [fetchListHandler])

    const headers = [
        {name: '#', key: 'id', width: 1 / 9 * 100 + '%'},
        {name: 'תמונה', key: 'image', width: 2 / 9 * 100 + '%'},
        {name: 'מידע', key: 'info', width: 3 / 9 * 100 + '%'},
        {name: 'להציג', key: 'enable', width: 1 / 9 * 100 + '%'},
        {name: 'פעולות', key: 'actions', width: 2 / 9 * 100 + '%'}
    ]
    const toggleEditUiItem = (id: string) => {
        dispatchItemList({type: "SET_EDIT", value: {id: id}})
    }
    const addItemHandler = (addItemObj: ItemDto): Promise<object> => {
        return addItem(addItemObj)
    }
    const updateItemHandler = (updateItemObj: ItemInterface): Promise<object> => {
        const originalItem = itemList.find((item: ItemInterface) => item.id === updateItemObj.id);
        const updateFields: object = Object.entries(updateItemObj as object).reduce((acc, [key, value]) => (
                (key !== 'id' && (value === null || value === '' || originalItem?.[key] === value))
                    ? acc
                    : {...acc, [key]: value}
            ), {}
        );

        if (Object.keys(updateFields).length <= 1) {   //id always in
            throw new Error('no field to update')
        }

        return updateItem(updateFields as ItemDto).then(() => {
            fetchListHandler()
        })
    }
    const delItem = async (id: string) => {
        await deleteItem(id)
    }
    const tableSlots = (key: string, item: ItemInterface) => {
        if (key === 'image')
            return (
                <img alt={'image'} src={item.image} className={styles.item_image}/>
            )

        if (key === 'info')
            return (
                <>
                    <h5>{item.title}</h5>
                    <small>{item.sub_title}</small>
                    <p>{item.info}</p>
                </>
            )

        if (key === 'actions')
            return (
                <div className={styles.actions}>
                    <Button variant="primary" onClick={toggleEditUiItem.bind(this, item.id)}><AiTwotoneEdit
                        size={24}/></Button>
                    <Button variant="danger" onClick={delItem.bind(this, item.id)}><MdDeleteForever
                        size={24}/></Button>
                </div>
            )

        if (key === 'enable')
            return (
                <div>
                    {item[key]
                        ? <AiFillEye size={24} color={'var(--bs-primary)'}/>
                        : <AiFillEyeInvisible size={24} color={'var(--bs-gray-600)'}/>
                    }
                </div>
            )

        // @ts-ignore
        return item[key]
    }

    const inTableEditComponent = (item: ItemInterface) => {
        return (<ItemForm className={item ? styles.item_form : styles.new_item_form}
                          item={item}
                          submit={item ? updateItemHandler : addItemHandler}/>)
    }

    return (
        <div className={styles.management_container}>
            <FlexTable headers={headers}
                       itemList={itemList ?? []}
                       tableSlots={tableSlots}
                       rowHeight={150}
                       className={styles.management_table}
                       inTableEditComponent={inTableEditComponent}
                       addButton={{'name': 'add', 'inTableAddComponent': inTableEditComponent}}
            />
        </div>
    )
}

export default Management;