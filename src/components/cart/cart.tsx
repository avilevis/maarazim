import React from "react";
import {GrCart} from "react-icons/gr";
import {useAppContext} from "@/context/context";
import {Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import CartList from "@/components/cart/cart-list";

import styles from './cart.module.scss'

function createWhatsUpMessage(items) {
    return items.map(item => `${item.orderCount} x *${item.id}* - ${item.title}‏‏‏`).join("%0a")
}

function Cart() {
    const ctx = useAppContext()
    const cartWithItems = ctx.itemList.filter(item => ctx.cart[item.id])
        .map(item => ({...item, orderCount: ctx.cart[item.id]}))

    const handleClose = () => ctx.updateCartStatus(false);
    const handleShow = () => {
        if (ctx.countItems > 0) {
            ctx.updateCartStatus(true)
        }
    };
    const sendHandle = () => {
        const message = createWhatsUpMessage(cartWithItems);

        window.open(`${ctx.whatsAppUrl}${message}`);
        handleClose()
    }

    return (
        <>
            <Button variant='none' className={styles.cart_container} onClick={handleShow}>
                <GrCart className={styles.icon}/>
                <span>({ctx.countItems})</span>
            </Button>

            <Modal show={ctx.cartOpenStatus} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>עגלת הזמנות</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CartList/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size={'sm'} onClick={handleClose}>
                        סגור
                    </Button>
                    <Button variant="success" size={'sm'} onClick={sendHandle}>
                        שלח
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Cart;