import React from "react";
import {IconProps} from './interfaces'
import IconButton from "./icon-button";
import styles from "./button-icon.module.scss";
import {BsFacebook} from "react-icons/bs";

function FacebookIcon(props: IconProps) {
    const onClickHandler = () => {
        props.clickHandler()
    }

    return (
        <IconButton iconComponent={<BsFacebook className={styles.icon}/>} clickHandler={onClickHandler}/>
    );
}

export default FacebookIcon;