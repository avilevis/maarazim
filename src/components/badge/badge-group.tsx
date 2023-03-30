import styles from "./badge_group.module.css";
import React, {useState} from "react";
import Badge from "./badge";
import { useRouter } from 'next/router'



interface props {
    list: { name: string, link: string }[] | []
}

function BadgeGroup(props: props) {
    const router = useRouter()
    const onClickHandler = (newValue: string) => {
        router.push(newValue)
    };

    return (
        <nav className={styles.nav}>
            {props.list.map((navObj, index) => (
                <Badge key={`badge${index}`} name={navObj.name}
                       active={router.asPath === navObj.link}
                       link={navObj.link}
                       clickHandle={onClickHandler}/>))}
        </nav>
    );
}

export default BadgeGroup;