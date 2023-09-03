import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";
import { queryClientOptions } from "../utils/constants";


const getQueryClient = cache( () => new QueryClient(queryClientOptions));

export default getQueryClient;