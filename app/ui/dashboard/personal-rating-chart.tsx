import {montserrat} from "@/app/ui/fonts";
import {fetchPersonalRatings} from "@/app/lib/data";
import {CalendarIcon} from "@heroicons/react/24/outline";

export default async function PersonalRatingsChart() {
    const ratings = await fetchPersonalRatings();
    const yAxisLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    if (!ratings || ratings.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    
    const topLabel = 10;
    
    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                Recent Ratings
            </h2>
            
            <div className="space-y-6">
                {ratings.map((group: any) => (
                    <div key={group.outfit_id} className="w-full">
                        <h3 className={`${montserrat.className} mb-2 text-lg`}>
                            Outfit #{group.outfit_id}
                        </h3>
                        <div className="rounded-xl bg-gray-50 p-4">
                            <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                                <div
                                    className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
                                    style={{ height: `${350}px` }}
                                >
                                    {yAxisLabels.map((label) => (
                                        <p key={label}>{label}</p>
                                    ))}
                                </div>

                                {group.ratings.map((rating: any, index: number) => (
                                    <div key={`${group.outfit_id}-${index}`} className="flex flex-col items-center gap-2">
                                        <div
                                            className="w-full rounded-md bg-blue-300"
                                            style={{
                                                height: `${(350 / topLabel) * rating.rating}px`,
                                            }}
                                        ></div>
                                        <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                            {new Date(rating.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center pb-2 pt-6">
                                <CalendarIcon className="h-5 w-5 text-gray-500" />
                                <h3 className="ml-2 text-sm text-gray-500">
                                    {group.ratings.length} rating(s)
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}