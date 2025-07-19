import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
    return (
        <>
            <div className="@container/card h-40">
                <Skeleton className="w-full h-full" />
            </div>
        </>
    );
};

export default CardSkeleton;
