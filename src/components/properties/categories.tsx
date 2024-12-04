import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (Category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory,
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                <div
                    onClick={() => setCategory("Pool")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Pool" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icons/pool.jpg"
                        alt="pool"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Pool</span>
                </div>

                <div
                    onClick={() => setCategory("Villas")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Villas" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icons/villas.jpeg"
                        alt="villas"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Villas</span>
                </div>

                <div
                    onClick={() => setCategory("Cabins")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Cabins" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icons/cabins.jpeg"
                        alt="cabins"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Cabins</span>
                </div>

                <div
                    onClick={() => setCategory("Tiny House")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Tiny House" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icons/tiny-house.jpeg"
                        alt="tiny house"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Tiny House</span>
                </div>
            </div>
        </>
    );
};

export default Categories;
