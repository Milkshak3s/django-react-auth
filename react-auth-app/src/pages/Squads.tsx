import React from "react";
import useSWR from 'swr';
import type {SquadResponse} from "../utils/types";
import { fetcher } from '../utils/axios';
import Card from 'react-bootstrap/Card';


function Squads() {
    const squad = useSWR<SquadResponse>(`/api/squad/1/`, fetcher);

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{squad.data?.name}</Card.Title>
                    <Card.Text>
                        {squad.data?.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};


export default Squads;
