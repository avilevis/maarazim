import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import CartListObj from "@/components/cart/cart-list-obj";
import {useAppContext} from "@/context/context";

function CartList() {
    const ctx = useAppContext()
    const cartWithItems = ctx.itemList.filter(item => ctx.cart[item.id])

    return (
        <ListGroup as="ul">
            {cartWithItems.map(item =>
                <ListGroup.Item as="li" key={`item_in_cart${item.id}`}>
                    <CartListObj {...item}/>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}

export default CartList;