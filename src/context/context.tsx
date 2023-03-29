import {createContext, useContext, useEffect, useState} from 'react';

const whatsAppUrl = `${process.env['whatsAppSendUrl']}&phone=${process.env['whatsAppPn']}&text=`
const facebookUrl = `${process.env['facebookUrl']}${process.env['facebookPageId']}`
const AppContext = createContext({
    whatsAppUrl: '',
    facebookUrl: '',
    itemList: [],
    updateItemList: (list: any) => {
    },
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
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        setCountItems(Object.values(cart).reduce((sum, val) => val + sum, 0) as number)
    }, [cart])

    const increaseToCart = (objId: string) => {
        setCart((prevState) => ({...prevState, [objId]: (prevState[objId] || 0) + 1}))
    }
    const decreaseToCart = (objId: string) => {
        setCart((prevState) => ({...prevState, [objId]: (prevState[objId] || 0) - 1}))
    }
    const updateItemList = (data: any) => {
        setItemList(() => data)
    }

    return (
        <AppContext.Provider value={{
            whatsAppUrl,
            facebookUrl,
            itemList,
            updateItemList,
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