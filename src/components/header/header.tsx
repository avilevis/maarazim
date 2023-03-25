import React from "react";
import BadgeGroup from "../badge/badge-group";
import WhatsAppIcon from "../icons/whats-app";
import FacebookIcon from "../icons/facebook";

import styles from './header.module.css';

const navList = ['בית', 'עלינו']

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo_container}>
                <img className={styles.logo} alt='logo' src='/logo.svg'/>
            </div>
            <BadgeGroup list={navList}/>
            <div className={styles.social_container}>
                <WhatsAppIcon clickHandler={() => {
                }}/>
                <FacebookIcon clickHandler={() => {
                }}/>
            </div>
        </div>
    );
}

export default Header;