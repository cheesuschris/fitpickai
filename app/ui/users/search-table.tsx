import {montserrat} from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {UserField} from '@/app/lib/definitions';

export default async function ({users}: {users: UserField[]}) {
    return (
        <div className = "w-full">
            <h1 className = {`${montserrat.className} mb-8 text-xl md:text-2xl`}>
                Find Users
            </h1>
            <Search placeholder = "Search users..."/>
            <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                    {users?.map((user) => (
                    <div
                        key={user.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <div className="mb-2 flex items-center">
                            <div className="flex items-center gap-3">
                                <p>{user.name}</p>
                            </div>
                            </div>
                            <p className="text-sm text-gray-500">
                            {user.email} | {user.avg_self_rating} average self-rating
                            </p>
                        </div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-5">
                        <div className="flex w-1/2 flex-col">
                            <p className="text-xs">Outfits in Rotation</p>
                            <p className="font-medium">{user.total_in_rotation}</p>
                        </div>
                        <div className="flex w-1/2 flex-col">
                            <p className="text-xs">Outfits out of Rotation</p>
                            <p className="font-medium">{user.total_out_of_rotation}</p>
                        </div>
                        </div>
                        <div className="pt-4 text-sm">
                        <p>{user.total_outfits} total outfits </p>
                        </div>
                    </div>
                    ))}
                </div>
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                    <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Name
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Email & Avg Self-Rating
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Total Outfits in Rotation
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                        Total Outfits out of Rotation
                        </th>
                        <th scope="col" className="px-4 py-5 font-medium">
                        Total Outfits
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-gray-900">
                    {users.map((user) => (
                        <tr key={user.id} className="group">
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                            <div className="flex items-center gap-3">
                            <p>{user.name}</p>
                            </div>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {user.email} | {user.avg_self_rating} average self-rating
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {user.total_in_rotation}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {user.total_out_of_rotation}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            {user.total_outfits}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}