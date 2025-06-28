import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100 font-mono">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
