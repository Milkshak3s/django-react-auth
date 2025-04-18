import React from "react";
import ZSquadListTable from "../components/ZSquadListTable";
import type {SquadListResponse} from "../utils/types";
import { fetcher } from '../utils/axios';
import useSWR from 'swr';
import { Z } from "react-router/dist/development/route-data-H2S3hwhf";


function Squads() {
    const squadsRes = useSWR<SquadListResponse>(`/api/squad`, fetcher);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <ZSquadListTable squads={squadsRes.data?.squads} />
        </div>
    );
};


export default Squads;
