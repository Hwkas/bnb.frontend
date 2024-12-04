"use client";

import { useEffect, useState } from "react";
import format from "date-fns/format";
import { useSearchParams } from "next/navigation";
// my components
import PropertyListItem from "./property-list-item";
import useSearchModal from "@/hooks/use-search-model";
// my functions
import apiServices from "@/services/api-services";

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favourite: boolean;
};

interface PropertListProps {
    landlord_id?: string | null;
    favourites?: boolean | null;
}

const PropertyList: React.FC<PropertListProps> = ({
    landlord_id,
    favourites,
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBedrooms = searchModal.query.bedrooms;
    const numBathrooms = searchModal.query.bathrooms;
    const checkInDate = searchModal.query.checkIn;
    const checkOutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;
    const [properties, setProperties] = useState<PropertyType[]>([]);

    // here need this to update the properties state with calling the api
    // everytime favourite button is cicked.
    const markFavourite = (id: string, is_favourite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favourite = is_favourite;

                if (is_favourite) {
                    console.log("added to list of favourited property");
                } else {
                    console.log("removed from list");
                }
            }
            return property;
        });

        setProperties(tmpProperties);
    };

    const getProperties = async () => {
        let url = "/api/properties/";

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        } else if (favourites) {
            url += "?favourites=true";
        } else {
            let urlQuery = "";

            urlQuery += country ? "&country=" + country : "";
            urlQuery += numGuests ? "&numGuests=" + numGuests : "";
            urlQuery += numBedrooms ? "&numBedrooms=" + numBedrooms : "";
            urlQuery += numBathrooms ? "&numBathrooms=" + numBathrooms : "";
            urlQuery +=
                checkInDate ?
                    "&checkInDate=" + format(checkInDate, "yyyy-MM-dd")
                :   "";
            urlQuery +=
                checkOutDate ?
                    "&checkOutDate=" + format(checkOutDate, "yyyy-MM-dd")
                :   "";
            urlQuery += category ? "&category=" + category : "";

            if (urlQuery.length) {
                console.log("urlQuery: ", urlQuery);
            }

            url += "?" + urlQuery.substring(1);
        }

        const response = await apiServices.get(url);
        console.log("response: ", response);
        setProperties(response.data);
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params]);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}
                        markFavourite={(is_favourite) =>
                            markFavourite(property.id, is_favourite)
                        }
                    />
                );
            })}
        </>
    );
};

export default PropertyList;
