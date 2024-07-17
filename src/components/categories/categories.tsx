"use client";


import Image from "next/image";
import { useState } from "react";
// hooks
import useSearchModal, { SearchQueryType } from "@/hooks/use-search-model";


const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState("");

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQueryType = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category,
        };

        searchModal.setQuery(query);
    };

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div
                onClick={() => _setCategory("")}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === "" ? "border-blank" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icons/list-solid.svg"
                    alt="ALL"
                    width={20}
                    height={20}
                />
                <span className="text-xs">All</span>
            </div>

            <div
                onClick={() => _setCategory("Pool")}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === "Pool" ? "border-blank" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icons/pool.jpg"
                    alt="pool"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Pool</span>
            </div>

            <div
                onClick={() => _setCategory("Villas")}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === "Villas" ? "border-blank" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icons/villas.jpeg"
                    alt="villas"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Villas</span>
            </div>

            <div
                onClick={() => _setCategory("Cabins")}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === "Cabins" ? "border-blank" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icons/cabins.jpeg"
                    alt="cabins"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Cabins</span>
            </div>

            <div
                onClick={() => _setCategory("Tiny House")}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === "Tiny House" ? "border-blank" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icons/tiny-house.jpeg"
                    alt="tiny house"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Tiny House</span>
            </div>
        </div>
    );
};

export default Categories;