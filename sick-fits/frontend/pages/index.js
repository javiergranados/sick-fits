import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <p>Hi from home</p>
      <Link href="/page">
        <a>Go to page</a>
      </Link>
    </>
  );
}
