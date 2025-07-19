import React from "react";
import { Skeleton } from "./ui/skeleton";

const TableSkeleton = () => {
    return (
        <>
            <div className="w-full h-40 rounded-md px-4 lg:px-6">
                <Skeleton className="w-full h-full" />
            </div>
        </>
    );
};

export default TableSkeleton;
