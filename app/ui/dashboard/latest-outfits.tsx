import {montserrat} from "@/app/ui/fonts";
import {Outfit} from "@/app/lib/definitions";
import {fetchLatestOutfits} from "@/app/lib/data";
import clsx from "clsx";
import Image from "next/image";

export default async function LatestOutfits() {
    const latestOutfits = await fetchLatestOutfits();
    return (
        <div className = "flex w-full flex-col md:col-span-4">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                Latest Outfits
            </h2>
            <div className = "flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className = "bg-white px-6">
                    {latestOutfits.map((outfit, i) => {
                        return (
                            <div
                                key={outfit.id}
                                className={clsx(
                                "flex flex-row items-center justify-between py-4",
                                {
                                    "border-t": i !== 0,
                                }
                                )}
                            >
                                <div className = "flex items-center bg-gray-200 px-4">
                                    <div className = "min-w-0">
                                        <p className = "truncate text-sm font-semibold md:text-base">
                                            {outfit.name ?? `${outfit.user_name}'s outfit`} | Created on {outfit.date} | {outfit.rotation_status}
                                        </p>
                                        <Image
                                            src = "@/app/public/clothes-hanger.jpg"
                                            alt = "Clothes hanger"
                                            className = "mx-auto"
                                            width = {75}
                                            height = {75}
                                        />
                                        <Image 
                                            src = {outfit.shirt_image_url}
                                            alt = {`${outfit.user_name}'s shirt`}
                                            className = "mx-auto"
                                            width = {100}
                                            height = {100}
                                        />
                                        <Image 
                                            src = {outfit.pants_image_url}
                                            alt = {`${outfit.user_name}'s pants`}
                                            className = "mx-auto"
                                            width = {100}
                                            height = {100}
                                        />
                                        <Image 
                                            src = {outfit.shoes_image_url}
                                            alt = {`${outfit.user_name}'s shoes`}
                                            className = "mx-auto"
                                            width = {100}
                                            height = {100}
                                        />
                                        <p className = "truncate text-md font-bold md:text-base">
                                            {outfit.user_name}
                                        </p>
                                    </div> 
                                </div>
                            </div>
                        );
                    })};
                </div>
            </div>
        </div>
    );
}