export default function Footer() {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-8 mt-16">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Terms of Service
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Contact
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                About
            </a>
        </footer>
    );
}
