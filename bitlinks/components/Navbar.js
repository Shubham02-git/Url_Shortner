"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/shorten', label: 'Shorten' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
                BL
              </div>
              <span className="sr-only">Bitlinks</span>
              <span className="hidden sm:inline-block font-semibold text-gray-900 dark:text-gray-100">Bitlinks</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline"
              >
                Sign in
              </Link>

              <Link
                href="/shorten"
                className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 transition"
              >
                Get started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <svg className={`h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, slide down */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/get-started"
            className="block w-full text-center mt-1 px-3 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            onClick={() => setOpen(false)}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
