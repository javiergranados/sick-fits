import React from 'react'
import Link from "next/link"

export default function Page() {
  return (
    <>
      <p>Hi from page</p>
      <Link href="/">
        <a>Go to home</a>
      </Link>
    </>
  )
}
