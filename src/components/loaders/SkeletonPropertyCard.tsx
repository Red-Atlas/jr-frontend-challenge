import { Skeleton } from "../../ui/SkeletonLoader";
export default function SkeletonPropertyCard() {
    return (
        <div className="flex w-full h-[310px] text-lg border rounded-lg shadow-lg overflow-hidden bg-slate-100/80">
            {/* Image skeleton */}
            <Skeleton className="w-full lg:w-[380px] h-[310px] rounded-l-lg flex-shrink-0" />
            <div className="flex flex-col p-4 space-y-2 w-full">
                <div className="flex justify-between mb-4">
                    {/* Price */}
                    <Skeleton className="h-8 w-36" />
                    {/* Date */}
                    <Skeleton className="h-6 w-28" />
                </div>

                {/* Title */}
                <Skeleton className="h-5 w-64" />

                {/* Address */}
                <Skeleton className="h-5 w-48" />

                {/* Type */}
                <Skeleton className="h-5 w-56" />

                {/* Area & Status */}
                <Skeleton className="h-5 w-32" />

                {/* Description */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-64" />

                {/* Button */}
                <div className="flex w-full justify-end mt-auto gap-3">
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="h-12 w-36" />
                </div>
            </div>
        </div>
    );
}
