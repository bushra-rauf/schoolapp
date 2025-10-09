import Logo from "../Logo"
import AccountLinks from "../AccountsLinks"
import SearchInput from "../Search"
const Header = () => {
    return(
        <>
           <header className="flex justify-between items-center flex-wrap">
            <Logo/>
            <SearchInput/>
            <AccountLinks/>
            {/* <button className="button-tertiary">Test</button> */}
            
            </header>
            <div className="border-b-4 flex-8/12 w-[90%] mt-4 mx-auto"></div>
         </>
    )
}

export default Header