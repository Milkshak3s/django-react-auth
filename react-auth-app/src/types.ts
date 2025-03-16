import { UserResponse } from "./utils/types";

export interface AccountResponse {
    user: UserResponse;
    access: string;
    refresh: string;
  }
  