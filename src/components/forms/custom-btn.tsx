interface CustomButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    className,
}) => {
    return (
        <div
            onClick={onClick}
            className={`w-full py-4 bg-airbnb hover:bg-airbnbDark text-white text-center rounded-xl trasition cursor-pointer ${className}`}
        >
            {label}
        </div>
    );
};

export default CustomButton;
