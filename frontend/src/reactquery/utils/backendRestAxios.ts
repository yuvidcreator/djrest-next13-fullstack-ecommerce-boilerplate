import { restAPIEndpoint } from "@/settings/site-settings";
import axios from "axios";



export const backendRestAxios = axios.create({
    baseURL: `${restAPIEndpoint}/api`,
	// withCredentials: true,
});