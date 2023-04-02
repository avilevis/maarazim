import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import type {AppProps} from 'next/app'
import {AppWrapper} from "@/context/context";
import Header from "@/components/header/header";

import {Open_Sans} from 'next/font/google'

const openSans = Open_Sans({
    weight: ['300', '500', '700', '800'],
    style: ['normal'],
    subsets: ['hebrew'],
})

export default function App({Component, pageProps}: AppProps) {
    return (
        <AppWrapper>
            <main className={openSans.className}>
                <Header/>
                <Component {...pageProps}/>
            </main>
        </AppWrapper>
    )
}
