import { Skeleton } from "../../ui/SkeletonLoader";

export function SkeletonPropertyForm() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center my-20 p-6 rounded-lg shadow-[0_0px_8px_rgba(0,0,0,0.3)]">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
            <Skeleton className="h-32 w-full mt-6" />
            <Skeleton className="h-40 w-full mt-6" />
            <Skeleton className="h-64 w-full mt-6" />
            <Skeleton className="h-10 w-full md:w-[400px] mt-6" />
        </div>
    );
}
