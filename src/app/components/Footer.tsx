import Link from "next/link"

export default function Footer() { 
    return (
        <footer className="absolute bottom-0 w-full bg-gray-200 shadow-lg">
            <div className="container flex justify-center mx-auto">
                <div className="flex items-center py-3 text-center text-gray-400"> {/* Added flex and items-center */}
                    <p className="mr-4">Copyright @2023</p> {/* Added margin-right */}
                    <Link className="underline" href="https://github.com/jojazpeitia/skinguessr">
                        Source code
                    </Link>
                </div>
            </div>
        </footer>
    )
}