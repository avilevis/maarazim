import '@/styles/globals.css'

import React, {useContext} from 'react'
import type {AppProps} from 'next/app'
import { AppWrapper } from "../context/context";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    )
}
