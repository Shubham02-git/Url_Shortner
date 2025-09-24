"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [generated, setgenerated] = useState()

    const generate = async () => {
    const preferredShort = shortUrl // capture user's input before we clear state
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

                fetch("/api/generate", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                                // prefer server-returned shorturl, otherwise use the user's provided value
                                const code = result && result.shorturl ? result.shorturl : preferredShort;
                                const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
                                if (code) {
                                    setgenerated(`${host}/${code}`)
                                } else {
                                    setgenerated(undefined)
                                }
                                seturl("")
                                setShortUrl("")
                                alert(result.message)
                                console.log(result)
                        })
            .catch((error) => console.error(error));
    }

    return (
        <main className="min-h-[70vh] flex items-center justify-center bg-purple-50 px-2">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
                <h1 className="text-2xl md:text-3xl font-bold text-purple-700 text-center">Generate your short URLs</h1>
                <p className="text-gray-600 text-center mb-2">Paste your long link below and get a short, shareable URL instantly. Optionally, customize your short link.</p>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={url}
                        placeholder="Enter Your URL"
                        onChange={e => seturl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                        autoFocus
                    />
                    <input
                        type="text"
                        value={shortUrl}
                        placeholder="Enter preferred short URL"
                        onChange={e => setShortUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                    />
                    <button onClick={generate}
                        className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
                    >
                        Generate
                    </button>
                </div>

                {/* Result area placeholder */}
                <div className="mt-4 flex flex-col items-center gap-2">
                    {generated? (<code><Link target="_blank" href={generated}>{generated}</Link></code>) : (<span className="text-gray-400">Your short URL will appear here</span>) }
                </div>
            </div>
        </main>
    )
}

export default Shorten
