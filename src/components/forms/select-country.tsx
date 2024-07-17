"use client";


import Select from "react-select";
// my hooks
import useCountries from "@/hooks/use-countries";


// we have props for the react element & type for thte js object
export type SelectCountryValue = {
    label: string;
    value: string;
};

interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
};

const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();
    return (
        <>
            <Select
                isClearable
                placeholder="Any where"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
            />
        </>
    )
};

export default SelectCountry;