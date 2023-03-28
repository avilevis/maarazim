import React from "react";
import Image from "next/image";
import Counter from "@/components/counter/counter";

import styles from './box-card.module.scss'

interface BoxCardProps {
    id: string,
    image: string,
    title: string,
    sub_title: string,
    text: string
}

function BoxCard(props: BoxCardProps) {
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
            <Counter className={styles.action} id={props.id}/>
        </div>
    )
}

export default BoxCard;