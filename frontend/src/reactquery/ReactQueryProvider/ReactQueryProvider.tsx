"use client";

import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { queryClientOptions } from '@/reactquery/utils/constants';
import ReactQueryHydrate from './ReactQueryHydrate';



interface RQProps {
    children: ReactNode
}



const ReactQueryProvider = ({ children }: RQProps) => {
    const [ queryClient ] = useState( () => new QueryClient(queryClientOptions) )
    const dehydrateState = dehydrate(queryClient);
    
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryHydrate state={dehydrateState}>
                {children}
            </ReactQueryHydrate>
        </QueryClientProvider>
    )
}

export default ReactQueryProvider