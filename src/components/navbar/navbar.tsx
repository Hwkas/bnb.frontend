import Image from "next/image";
import Link from "next/link";
// my components
import SearchFilters from "./search-fiter";
import UserNav from "./user-nav";
import AddPropertyButton from "./add-property-button";
// my functions
import { getUserId } from "@/lib/actions";


const Navbar = async () => {
    const userId = await getUserId();

    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center ">
                    <Link href="/">
                        <Image
                            src="/icons/logo.png"
                            alt="Bnb"
                            width={50}
                            height={28}
                        />
                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilters />
                    </div>

                    <div className="flex items-center space-x-6">
                        <AddPropertyButton
                            userId={userId}
                        />
                        <UserNav
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;