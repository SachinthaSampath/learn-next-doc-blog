import React from "react";
import "../styles/globals.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;

/***
 * The default export of _app.js is a top-level React component that wraps all the pages in your application. 
 * You can use this component to keep state when navigating between pages, or to add global styles as we're doing here.
 * 
 * You cannot import global CSS anywhere else. 
 * The reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page. 
 * If you were to navigate from the homepage to the /posts/first-post page, 
 * global styles from the homepage would affect /posts/first-post unintentionally.
 *
 * */