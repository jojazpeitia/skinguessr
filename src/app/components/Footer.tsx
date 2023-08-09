import Link from "next/link"

export default function Footer() { 
    return (
        <footer className="absolute bottom-0 w-full bg-gray-200 shadow-lg">
            <div className="container flex justify-center mx-auto">
                <div className="py-5 text-center text-gray-400 ">
                    <p> Copyright @2023</p> 
                    <Link className="underline" href="https://github.com/jojazpeitia/skinguessr"> Source code</Link>
                </div>
            </div>    
        </footer>
    )
}