import React from "react";
import Image from "next/image";
import BadgeGroup from "../badge/badge-group";
import WhatsAppIcon from "../icons/whats-app";
import FacebookIcon from "../icons/facebook";
import Cart from "../cart/cart";

import styles from './header.module.css';

const navList = ['בית', 'עלינו']

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo_container}>
                <Image className={styles.logo} alt='logo' src='/logo.svg' width={100} height={50}/>
            </div>
            <BadgeGroup list={navList}/>
            <div className={styles.social_container}>
                <Cart/>
                <WhatsAppIcon clickHandler={() => {
                }}/>
                <FacebookIcon clickHandler={() => {
                }}/>
            </div>
        </div>
    );
}

export default Header;