import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import type {AppProps} from 'next/app'
import {AppWrapper} from "@/context/context";
import Header from "@/components/header/header";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AppWrapper>
            <Header/>
            <Component {...pageProps} />
        </AppWrapper>
    )
}
