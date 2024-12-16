import React from "react";
import { Skeleton } from "../../ui/SkeletonLoader";

export const SkeletonPropertyPage: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-[500px] mb-8 rounded-lg" />

            {/* Property Details Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            {/* Map Skeleton */}
            <Skeleton className="w-full h-[400px] mb-8 rounded-lg" />

            {/* Property Description Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Property Contact Skeleton */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <Skeleton className="h-7 w-64 mb-4" />
                <div className="mb-4">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-5 w-48" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-48" />
                </div>
            </div>
        </main>
    );
};
