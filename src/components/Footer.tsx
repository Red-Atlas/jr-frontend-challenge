import { Link } from "react-router-dom";
import cvPdf from "../assets/cv.pdf";
import { LinkedInIcon, GithubIcon, CurriculumIcon } from "../ui/Icons";
import { SpanPopUp } from "../ui/Text";

export function Footer() {
    const footerIcons = [
        { icon: LinkedInIcon, fill: "white", className: "stroke-blue-600 hover:border-blue-700 shadow-blue-400", text: "LinkedIn", link: "https://www.linkedin.com/in/lucas-calvetti" },
        { icon: GithubIcon, fill: "white", className: "stroke-gray-500 hover:border-black shadow-gray-400", text: "GitHub", link: "https://github.com/LucasCalvetti" },
        { icon: CurriculumIcon, fill: "white", className: "stroke-red-700 hover:border-red-700 shadow-red-400", text: "Curriculum", link: cvPdf },
    ];

    return (
        <footer className="w-full min-h-60 flex items-center justify-center bg-slate-950 text-gray-200 gap-10">
            <div className="max-h-20 flex gap-10">
                {footerIcons.map((icon, index) => (
                    <div key={index} className="relative group">
                        {icon.text === "Curriculum" ? (
                            <a href={icon.link} download="Lucas_Calvetti_CV.pdf" target="_blank" rel="noopener noreferrer">
                                <icon.icon fill={icon.fill} className={icon.className} />
                            </a>
                        ) : (
                            <Link to={icon.link} target="_blank">
                                <icon.icon fill={icon.fill} className={icon.className} />
                            </Link>
                        )}
                        <SpanPopUp>{icon.text}</SpanPopUp>
                    </div>
                ))}
            </div>
        </footer>
    );
}
