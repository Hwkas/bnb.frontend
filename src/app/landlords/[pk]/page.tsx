import Image from "next/image";
// my components
import ContactButton from "@/components/landlord/contact-btn";
import PropertyList from "@/components/properties/property-list";
// my functions
import apiServices from "@/services/api-services";
import { getUserId } from "@/lib/actions";

const LandLordDetailPage = async ({ params }: { params: { pk: string } }) => {
    const landlord = await apiServices.get(`/api/accounts/${params.pk}`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={landlord.avatar_url || "/images/profile.jpg"}
                            width={200}
                            height={200}
                            alt="Profile Image"
                            className="rounded-full"
                        />

                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>

                        {userId != params.pk && (
                            <ContactButton
                                userId={userId}
                                landLordId={params.pk}
                            />
                        )}
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyList landlord_id={params.pk} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LandLordDetailPage;
