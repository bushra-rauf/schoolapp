'use client'
import { QueryClient, QueryClientProvider as OriginalQueryClientProvider} from "@tanstack/react-query"
import { ReactNode } from "react"

const makeQueryClient = () => {return new QueryClient }
let browserQueryClient: QueryClient | undefined = undefined
export const getQueryClient = () => {
    if (typeof window === 'undefined') {    // condition check here the window object doesn't exist means on serverside because window exist only on browser.
        return makeQueryClient()  // On the server, we make a new client every time to avoid sharing state between users.
    } else {
        if (!browserQueryClient) {   // condition check not browserqueryClient true then
            browserQueryClient = makeQueryClient() // browserqueryClient makeQueryClient. On the browser, we reuse one client (browserQueryClient) so data is shared and cached across the app.
        }

        return browserQueryClient
    }
}

export const QueryClientProvider = ({children}: {children: ReactNode}) => {
    const QueryClient = getQueryClient()

    return (
        <OriginalQueryClientProvider client = {QueryClient}>
            {children}
        </OriginalQueryClientProvider>
    )
}