import React from "react";
import {CiSquareMinus, CiSquarePlus} from "react-icons/ci";
import {Button} from "react-bootstrap";
import {useAppContext} from "@/context/context";

import styles from './counter.module.scss';

interface CounterProps {
    id: string,
    className: string
}

function Counter(props: CounterProps) {
    const ctx = useAppContext()
    const increaseObj = () => {
        ctx.increaseToCart(props.id)
    }
    const decreaseObj = () => {
        ctx.decreaseFromCart(props.id)
    }

    return (
        <div className={[styles.counter_container, props.className].join(' ')}>
            <Button variant="none" className={styles.icon_button}
                    disabled={(!ctx.cart[props.id] || ctx.cart[props.id] == 0)}
                    onClick={decreaseObj}>
                <CiSquareMinus className={styles.icon}/>
            </Button>
            <span className={styles.text_container}>{ctx.cart[props.id] ?? 0}</span>
            <Button variant="none" className={styles.icon_button} onClick={increaseObj}>
                <CiSquarePlus className={styles.icon}/>
            </Button>
        </div>
    )

}

export default Counter;