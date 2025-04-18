import React from "react";
import type { SquadResponse } from "../utils/types";
import ZGenericModal from "./ZGenericModal";
import ZUpdateSquadForm from "./ZUpdateSquadForm";


function ZSquadListTable({ squads }: { squads: SquadResponse[] | undefined }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Squad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Formup
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Members
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {squads && squads.map((squad: SquadResponse) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="ps-3">
                                <div className="text-base font-semibold">{squad.name}</div>
                                <div className="font-normal text-gray-500">{squad.description}</div>
                            </div>    
                        </th>
                        <td className="px-6 py-4">
                            {squad.formup}
                        </td>
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4">
                            <ZGenericModal title="Update Squad" toggleText="Edit">
                                <ZUpdateSquadForm squadId={squad.id} />
                            </ZGenericModal>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ZSquadListTable
