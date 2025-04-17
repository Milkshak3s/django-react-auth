import React from "react";
import useSWR from 'swr';
import type {SquadResponse} from "../utils/types";
import { fetcher } from '../utils/axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router";


function ZSquadContainer({ squadId }: { squadId: string | undefined }) {
    const squad = useSWR<SquadResponse>(`/api/squad/${squadId}/`, fetcher);
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/squad/${squadId}`)
    }

    return (
        
            <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative">
                    <img 
                        src="https://placehold.co/400x300"
                        alt="Product"
                        className="w-full h-52 object-cover"
                    />
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{squad.data?.name}</h3>
                        <p className="text-gray-500 mt-1">{squad.data?.description}</p>
                    </div>
                    <button onClick={handleClick} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
                        View Squad
                    </button>
                </div>
            </div>
    )

    /**
    return (
        <div>
            <Card onClick={handleClick}>
                <Card.Body>
                    <Card.Title>{squad.data?.name}</Card.Title>
                    <Card.Text>
                        {squad.data?.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
     */
}


export default ZSquadContainer
