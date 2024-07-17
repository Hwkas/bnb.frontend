"use client";


import { useState } from "react";
import { Range } from "react-date-range";
// my components
import Modal from "./modal";
import SelectCountry, { SelectCountryValue } from "../forms/select-country";
import CustomButton from "../forms/custom-btn";
import DatePicker from "../forms/calender";
// my hooks
import useSearchModal, { SearchQueryType } from "@/hooks/use-search-model";


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [numGuests, setNumGuests] = useState<string>("1");
    const [numBedrooms, setNumBedrooms] = useState<string>("0");
    const [numBathrooms, setNumBathrooms] = useState<string>("1");

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === "CheckIn") {
            searchModal.open("CheckOut");
        }
        else if (searchModal.step === "CheckOut") {
            searchModal.open("Details");
        }

        setDateRange(selection);
    }

    const closeAndSearch = () => {
        const newSearchQuery: SearchQueryType = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBedrooms),
            category: "",
        };

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check In date ->"
                    onClick={() => searchModal.open("CheckIn")}
                />
            </div>
        </>
    );

    const contentCheckIn = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to CheckIn?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open("location")}
                />

                <CustomButton
                    label="Check Out date ->"
                    onClick={() => searchModal.open("CheckOut")}
                />
            </div>
        </>
    );

    const contentCheckOut = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to CheckOut?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check In date"
                    onClick={() => searchModal.open("CheckIn")}
                />

                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open("Details")}
                />
            </div>
        </>
    );

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of Guests:</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Number of Guests"
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of Bedrooms:</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Number of Bedrooms"
                        value={numBedrooms}
                        onChange={(e) => setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of Bathrooms:</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Number of Bathrooms"
                        value={numBathrooms}
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check Out date"
                    onClick={() => searchModal.open("CheckIn")}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    );

    if (searchModal.step === "location") {
        content = contentLocation;
    }
    else if (searchModal.step === "CheckIn") {
        content = contentCheckIn;
    }
    else if (searchModal.step === "CheckOut") {
        content = contentCheckOut;
    }
    else if (searchModal.step === "Details") {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            isOpen={searchModal.isOpen}
            close={searchModal.close}
        />
    );
};

export default SearchModal;