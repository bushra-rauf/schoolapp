'use client'
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useState, SetStateAction } from 'react';
import { getSearchPosts } from '../../utils/supabase/quries';
import Link from 'next/link';
const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('')
    
    const {data} = useQuery({
        queryKey: ['search-result', userInput],
        queryFn: async() => {
            const {data, error} = await getSearchPosts(userInput)
            if (error) throw new Error
            return data
        },
        enabled: userInput && userInput.length > 3 ? true: false
    })

       
     
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserInput(e.target.value)
    }
    return(
        <>   
        <div className='relative'>
        <div className='flex items-center gap-2'>
            <Search size={32}/>
            <input onChange={handleChange} className=' border-1 rounded-xl p-2 ' name= 'search' placeholder='search by post title' value={userInput}/>
        </div>
        {data && 
        <div onClick={()=> setUserInput}className='border absolute  bg-amber-200 p-2 rounded-xl '>
            {data.map(({id,title, slug, })=> <Link className='block' key={id} href ={`/${slug}`}>{title}</Link>)}
        </div>}
        </div>
        </>

    )
}
export default SearchInput
