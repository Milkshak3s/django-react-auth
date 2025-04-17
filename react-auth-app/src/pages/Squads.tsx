import React from "react";
import ZSquadContainer from "../components/ZSquadContainer";
import type {SquadListResponse} from "../utils/types";
import { fetcher } from '../utils/axios';
import useSWR from 'swr';


function Squads() {
    const squads = useSWR<SquadListResponse>(`/api/squad`, fetcher);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="grid gap-16 grid-cols-3 px-16 py-12">
                <div>``
                    <ZSquadContainer squadId="1" />
                </div>
                <div>
                    <ZSquadContainer squadId="2" />
                </div>
                <div>
                    <ZSquadContainer squadId="3" />
                </div>
                <div>
                    <ZSquadContainer squadId="4" />
                </div>
                <div>
                    <ZSquadContainer squadId="5" />
                </div>
                <div>
                    <ZSquadContainer squadId="6" />
                </div>
            </div>
        </div>
    );
};


export default Squads;
