import countries from "world-countries";


const formattedCountires = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
}));

const useCountries = () => {
    const getAll = () => formattedCountires;

    const getByValue = (value: string) => {
        return formattedCountires.find((item) => item.value === value);
    };

    return {
        getAll,
        getByValue
    };
};

export default useCountries;