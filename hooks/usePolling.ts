import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function usePolling(ms:number=60000,searchParams:string|null) {
    const router = useRouter();  
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("polling");
             if(!searchParams){
                console.log("refreshed");
                router.refresh();
             }
        }, ms);

        return () => clearInterval(intervalId);                     
    }, [searchParams,ms]);// eslint-disable-line
}