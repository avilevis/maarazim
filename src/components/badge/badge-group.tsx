import styles from "./badge_group.module.css";
import React, {useState} from "react";
import Badge from "./badge";

interface props {
    list: string[] | []
}

function BadgeGroup(props: props) {
    const [value, setValue] = useState('')
    const onClickHandler = (newValue: string) => {
        setValue(newValue)
        // props.onClick(event);
    };

    return (
        <nav className={styles.nav}>
            {props.list.map((nv, index) => <Badge key={`badge${index}`} name={nv} active={value === nv}
                                                  clickHandle={onClickHandler}/>)}
        </nav>
    );
}

export default BadgeGroup;