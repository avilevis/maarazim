import {createContext, useContext, useEffect, useState} from 'react';

const items = [
    {
        id: "b1",
        image: '/box1.jpg',
        title: 'מארז ראשון',
        sub_title: 'מארז פסח קטן',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        id: "b2",
        image: '/box2.jpg',
        title: 'מארז שני',
        sub_title: 'מארז פסח בינוני',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        id: "b3",
        image: '/box3.jpg',
        title: 'מארז גדול',
        sub_title: 'מארז פסח גדול',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    }
]
const AppContext = createContext({
    items: [],
    cart: {},
    countItems: 0,
    increaseToCart: (id: string) => {
    },
    decreaseToCart: (id: string) => {
    }
});

export function AppWrapper({children}) {
    const [cart, setCart] = useState({});
    const [countItems, setCountItems] = useState(0);

    useEffect(() => {
        setCountItems(Object.values(cart).reduce((sum, val) => val + sum, 0) as number)
    }, [cart])

    const increaseToCart = (objId: string) => {
        setCart((prevState) => ({...prevState, [objId]: (prevState[objId] || 0) + 1}))
    }
    const decreaseToCart = (objId: string) => {
        setCart((prevState) => ({...prevState, [objId]: (prevState[objId] || 0) - 1}))
    }

    return (
        <AppContext.Provider value={{
            items,
            cart,
            countItems,
            increaseToCart,
            decreaseToCart
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}