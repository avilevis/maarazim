import React from 'react';
import Image from "next/image";
import Counter from '@/components/counter/counter';

import styles from './cart-list-obj.module.scss';

interface CartListObjProps {
    id: string,
    image: string,
    title: string,
    sub_title: string,
    text: string
}

function CartListObj(props: CartListObjProps) {
    return (
        <div className={styles.cart_list_obj_container}>
            <div className={styles.image_container}>
                <Image alt='image' src={props.image} width={100} height={100}/>
            </div>
            <div className={styles.cart_list_obj_info_container}>
                <h4>{props.title}</h4>
                <p>{props.sub_title}</p>
            </div>
            <div className={styles.cart_list_obj_action_container}>
                <Counter id={props.id}/>
            </div>
        </div>
    )
}

export default CartListObj;