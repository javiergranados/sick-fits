import React from 'react';
import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <p>Always visible</p>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
