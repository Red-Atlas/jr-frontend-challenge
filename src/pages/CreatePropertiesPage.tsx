import { useEffect, useState, lazy, Suspense } from "react";
import { SkeletonPropertyForm } from "../components/loaders/SkeletonPropertyForm";

const PropertyForm = lazy(() => import("../components/PropertyForm"));
export function CreatePropertiesPage() {
    const [userData, setUserData] = useState({ id: "", name: "UserName", contact: "l.calvetti.dev@gmail.com" });

    const fetchUserData = async () => {
        try {
            const userIdResponse = await fetch("https://www.uuidtools.com/api/generate/v4");
            const [userId] = await userIdResponse.json();
            localStorage.setItem("userId", userId);
            setUserData((prev) => ({ ...prev, id: userId }));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            fetchUserData();
        } else {
            setUserData((prev) => ({ ...prev, id: userId }));
        }
    }, []);

    return (
        <section>
            <Suspense fallback={<SkeletonPropertyForm />}>
                <PropertyForm ownerData={userData} />
            </Suspense>
        </section>
    );
}
