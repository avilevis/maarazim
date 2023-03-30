import styles from './item-card.module.scss';
import React from "react";
import Image from "next/image";
import {ItemInterface} from "@/intefaces/item.inteface";
import {Button} from "react-bootstrap";
import {useAppContext} from "@/context/context";

function ItemCard(props: ItemInterface) {
    const ctx = useAppContext()
    const buyNowHandle = () => {
        ctx.clearCart()
        addToCartHandle()
        ctx.updateCartStatus(true)
    }
    const addToCartHandle = () => {
        ctx.increaseToCart(props.id)
    }

    return (
        <div className={styles.card}>
            <div className={styles.image_container}>
                <Image className={styles.card_image} alt='image' src={props.image} width={200} height={200}/>
            </div>
            <div className={styles.card_body}>
                <h4 className={styles.title}>{props.title}</h4>
                <h5 className={styles.sub_title}>{props.sub_title}</h5>
                <div className={styles.text}>{props.text}</div>
            </div>
            <div className={styles.action}>
                <Button variant='success' size={'sm'} className={styles.button_icon} onClick={buyNowHandle}>הזמן
                    עכשיו</Button>
                <Button variant='info' size={'sm'} className={styles.button_icon} onClick={addToCartHandle}>הוסף
                    לעגלה</Button>
            </div>
        </div>
    )
}

export default ItemCard;