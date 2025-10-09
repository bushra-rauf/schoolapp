import { createServerClient } from "@supabase/ssr";

import { cookies } from "next/headers";
import { Database } from "./database.types";
export const createClient = async () => {

        const cookiestores = await cookies();
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPEBASE_URL!,
        process.env.NEXT_PUBLIC_SUPEBASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiestores.getAll()
                },
                setAll(cookiesToSet){
                    try{
                        cookiesToSet.forEach(({name, value, options}) => {
                            cookiestores.set(name, value, options  )

                        })
                    } catch {}
                }
            }
        }

    )
}