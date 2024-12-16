import type { Property } from "../../../types/index";
import { PropertyImage } from "./PropertyImage";
import { PropertyDetails } from "./PropertyDetails";
import { PropertyAdditionalDetails } from "./PropertyAdditionalDetails";
import { PropertyActions } from "./PropertyActions";

export function PropertyCard({ property, isOwner }: { property: Property; isOwner: boolean }) {
    if (!property) return null;
    const { id, title, address, images, status, description, owner, isActive, price, area, createdAt, type } = property;
    return (
        <div
            style={{
                animation: "reveal linear both",
                animationTimeline: "view()",
                animationRange: "entry 15% cover 25%",
            }}
            className="flex flex-col lg:flex-row lg:h-[310px] w-full text-lg rounded-lg shadow-md hover:shadow-slate-600 transition-shadow duration-300 bg-gradient-to-r from-slate-100/50 via-slate-400/60 to-slate-100/50 gradient"
        >
            <PropertyImage id={id} title={title} images={images} />
            <div className="flex flex-col p-4 w-full flex-grow">
                <PropertyDetails price={price} createdAt={createdAt} title={title} address={address} type={type} status={status} />
                <PropertyAdditionalDetails area={area} isActive={isActive} description={description} />
                <PropertyActions id={id} owner={owner} isOwner={isOwner} />
            </div>
        </div>
    );
}
