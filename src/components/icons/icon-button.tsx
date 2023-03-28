import React from "react";
import {IconButtonProps} from './interfaces'
import {Button} from "react-bootstrap";
import styles from './button-icon.module.scss'

function IconButton(props: IconButtonProps) {
    const onClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        props.clickHandler()
    }

    return (
        <Button variant='none' className={styles.button_icon} onClick={onClickHandler}>
            {props.iconComponent}
        </Button>
    );
}

export default IconButton;