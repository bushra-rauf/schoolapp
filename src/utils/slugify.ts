export const slugify =(text:string) => {
    return text.toLowerCase()
               .trim()
               .replace(/[^\w\s-] /g, '')
               .replace(/[\s]/g, '-')
               .replace(/-+/g, '-')


}



// my-day-at-the-beach--in the greek islands!!!