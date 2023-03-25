import styles from "./badge.module.css";
import React from "react";

interface BadgeProps {
    name: string,
    active: boolean,
    clickHandle: (key: string) => void
}

function Badge(props: BadgeProps) {
    const onClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.clickHandle(props.name);
    };

    return (
        <button className={[styles.badge_container, props.active ? styles.active : ''].join(' ')}
                onClick={onClickHandler}>
            {props.name}
        </button>
    );
}

export default Badge;