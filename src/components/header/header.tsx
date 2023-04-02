import React from "react";
import Cart from "@/components/cart/cart";
import Navigation from "@/components/navigation/navigation";


const navList = [{name: 'מארזים', link: '/'}, {name: 'תנאי שימוש', link: '/policy'}]
const logoImage = {url: "/logo.svg", width: 100, height: 50}

function Header() {
    return (
        <div>
            <Navigation list={navList} imageLogo={logoImage}>
                <Cart/>
            </Navigation>
        </div>
    );
}

export default Header;