import React from "react";
import Cart from "@/components/cart/cart";
import Navigation from "@/components/navigation/navigation";


const navList = [{name: 'מארזים', link: '/'}, {name: 'תנאי שימוש', link: '/policy'}]

function Header() {
    return (
        <div>
            <Navigation list={navList}>
                <Cart/>
            </Navigation>
        </div>
    );
}

export default Header;