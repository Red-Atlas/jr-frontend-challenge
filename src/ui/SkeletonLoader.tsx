export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`skeleton-animation rounded-md bg-gray-200 ${className}`} {...props} />;
}
