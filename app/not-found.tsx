export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col text-black items-center justify-center bg-lightyellow">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-lg">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="mt-6 text-blue-500 underline">Go back to Home</a>
        </main>
    );
}