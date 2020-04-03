import React from 'react';
import HeaderPrincipal from './header';
import FooterFinal from './footer';
import Head from 'next/head';

const Layout = props => {

    return ( 
        <>
            <Head>
                <title>Anamnesys</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap" rel="stylesheet" />
                <link href="/static/css/app.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>

            <HeaderPrincipal />
            <main>
                {props.children}
            </main>
            <FooterFinal/>
        </>
     );
}
 
export default Layout;