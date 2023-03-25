import React from "react";
import BoxCard from '../box-card/box-card'
import styles from './box-list.module.css'

const boxes = [
    {
        image: '/box1.jpg',
        title: 'מארז ראשון',
        sub_title: 'מארז פסח קטן',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        image: '/box2.jpg',
        title: 'מארז שני',
        sub_title: 'מארז פסח בינוני',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        image: '/box3.jpg',
        title: 'מארז גדול',
        sub_title: 'מארז פסח גדול',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    }
]

function BoxList() {
    return (
        <div className={styles.box_list}>
            {boxes.map((boxCard, index) => <BoxCard key={`boxcard${index}`} {...boxCard}/>)}
        </div>
    )
}

export default BoxList;