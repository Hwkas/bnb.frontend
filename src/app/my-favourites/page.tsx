// my components
import PropertyList from "@/components/properties/property-list";
// my functions
import { getUserId } from "@/lib/actions";


const MyFavourites = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated </p>
            </main>
        );
    };

    return (
        <main className="max-w-[1500px] max-auto px-6 pb-12">
            <h1 className="my-6 text-2xl">My Favourites</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PropertyList
                    favourites={true}
                />
            </div>
        </main>
    );
}

export default MyFavourites;