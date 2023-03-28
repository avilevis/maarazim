import React from "react";
import {BsWhatsapp} from 'react-icons/bs'
import IconButton from './icon-button'
import {IconProps} from "@/components/icons/interfaces";
import styles from './button-icon.module.scss'

function WhatsAppIcon(props: IconProps) {
    const onClickHandler = () => {
        props.clickHandler()
    }

    return (
        <IconButton iconComponent={<BsWhatsapp className={styles.icon}/>} clickHandler={onClickHandler}/>
    );
}

export default WhatsAppIcon;