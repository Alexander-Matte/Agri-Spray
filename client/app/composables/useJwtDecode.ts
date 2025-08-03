import { jwtDecode } from "jwt-decode";

export const useJwtDecode = (jwtToken: string) => {
    const decoded = jwtDecode(jwtToken)
    return decoded
}