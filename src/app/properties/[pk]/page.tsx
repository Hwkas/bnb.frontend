import Image from "next/image";
import Link from "next/link";
// my components
import ReservationSideBar from "@/components/properties/reservation-side-bar";
// my functions
import apiServices from "@/services/api-services";
import { getUserId } from "@/lib/actions";


const PropertyDetailPage = async ({ params }: { params: { pk: string } }) => {
    const property = await apiServices.get(`/api/properties/${params.pk}`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w -full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="House Image"
                />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-5">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} Guests - {property.bedrooms} Beadroom - {property.bathrooms} Bathroom
                    </span>

                    <hr />

                    <Link
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        <Image
                            src={property.landlord.avatar_url || "/images/profile.jpg"}
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="Profile Image"
                        />

                        <p><strong>{property.landlord.name}</strong> is your host.</p>
                    </Link>

                    <hr />
                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <ReservationSideBar
                    userId={userId}
                    property={property}
                />
            </div>
        </main>
    );
};

export default PropertyDetailPage;