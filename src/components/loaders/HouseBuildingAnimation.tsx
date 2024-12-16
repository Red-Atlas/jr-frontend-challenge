export function HouseBuildingAnimation({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center min-h-[72vh] pb-[120px] w-full h-full">
            <div className="relative w-[300px] h-[300px]">
                {/* Techo */}
                <div className="roof-building-animation absolute left-[24%] top-[17%] w-0 h-0 border-l-[100px] border-r-[100px] border-t-0 border-b-[100px] rounded-full border-transparent border-b-red-500 z-40" />
                {/* Cuerpo */}
                <div className="body-building-animation absolute left-[38%] top-[37%] w-0 h-0 border-[60px] rounded-2xl border-yellow-500" />
                {/* Puerta */}
                <div className="door-building-animation absolute left-[50%] top-[57.1%] w-[29px] h-[60px] border-2 border-b-0 border-black rounded-t-2xl bg-amber-900 z-20" />
                {/* Perilla */}
                <div className="knob-building-animation absolute left-[56%] top-[68%] w-0 h-0 border-2 border-black rounded-full z-30" />
                {/* Ventana */}
                <div className="window-building-animation absolute left-[65%] top-[59%] w-[24px] h-[24px] border-[2px] rounded-lg bg-sky-300 border-black z-20" />
                <div className="w-frame-building-animation absolute left-[65%] top-[61%] w-[24px] h-0 border-[1px] border-amber-950 z-20" />
                <div className="w-frame-building-animation absolute left-[65%] top-[64%] w-[24px] h-0 border-[1px] border-amber-950 z-20" />
                <div className="window-building-animation absolute left-[67%] top-[59%] w-0 h-[24px] border-[1px] border-amber-950 z-20" />
                <div className="window-building-animation absolute left-[70%] top-[59%] w-0 h-[24px] border-[1px] border-amber-950 z-20" />
                {/* Piso */}
                <div className="absolute left-[20%] top-[74%] bg-green-800 w-[200px] h-[30px] z-[55] rounded-3xl" />
                {/* Piso invisible */}
                <div className="absolute left-[5%] top-[74%] w-[260px] h-[150px] bg-[var(--bg-color)] z-50" />
                {/* Texto */}
                <div className="absolute left-[-15%] top-[80%] text-center font-bold pl-16 pt-6 z-[60] text-xl">{children}</div>
            </div>
        </div>
    );
}
