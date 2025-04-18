export interface UserResponse {
    email: string;
    username: string;
    is_active: string;
    created: Date;
    updated: Date;
    id: string;
}

export interface SquadResponse {
    name: string;
    description: string | undefined;
    created_at: Date;
    owner: string;
    formup: string;
    id: string;
}

export interface SquadListResponse {
    squads: SquadResponse[];
}
