import { Client, Account } from "appwrite";
import { NextResponse } from "next/server";
import conf from "@/conf/conf";

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(conf.appwriteEndpoint) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

const account = new Account(client);

// Define Public Routes (e.g., login/signup)
const isPublicRoute = (url: string) => {
    return ['/signUp', '/logIn', '/'].includes(url);
};

// Middleware to check user authentication status
export default async function middleware(request: Request) {
    const currentURL = new URL(request.url);
    const pathname = currentURL.pathname;

    try {
        // Check if user is logged in (via Appwrite)
        const session = await account.getSession('current'); // Get the current session
        const userId = session ? session.userId : null;

        // If the user is logged in, prevent access to login/signup pages
        if (userId && isPublicRoute(pathname)) {
            return NextResponse.redirect(new URL('/home', request.url)); // Redirect to home if logged in
        }

        // If the user is not logged in, restrict access to protected routes
        if (!userId && !isPublicRoute(pathname)) {
            return NextResponse.redirect(new URL('/signUp', request.url)); // Redirect to signUp if not logged in
        }

        // If the user is accessing an API route (protected), ensure they are logged in
        if (!userId && pathname.startsWith('/api/pins')) {
            return NextResponse.redirect(new URL('/signUp', request.url));
        }

        // Allow the request to continue
        return NextResponse.next();

    } catch (error) {
        console.error("Error in middleware:", error);
        // Handle error cases, like failed session retrieval
        return NextResponse.redirect(new URL('/signUp', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
