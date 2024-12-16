import React from "react";

type IconProps = {
    fill?: string;
    stroke?: string;
    className?: string;
};
const footerIconClass = "bg-gray-900 rounded-full h-10 w-10 border-gray-300 border-2 cursor-pointer hover:bg-gray-800 hover:h-12 hover:w-12 hover:border-4 shadow-sm transition-all duration-300";

export function LinkedInIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${footerIconClass} ${className}`}
        >
            <g transform="translate(4, 4)">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </g>
        </svg>
    );
}

export function GithubIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="-4 -4 32 32"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${footerIconClass} ${className}`}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

export function CurriculumIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="-4 -4 32 32"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${footerIconClass} ${className}`}
        >
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M15 18a3 3 0 1 0-6 0" />
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
            <circle cx="12" cy="13" r="2" />
        </svg>
    );
}
export function DetailsIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
export function HeartIcon({ fill = "none", stroke = "currentColor", className = "", style = {} }: IconProps & { style?: { [key: string]: string } }) {
    return (
        <svg
            style={style}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}
export function MailIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

export function CameraIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    );
}

export function CameraOffIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <line x1="2" x2="22" y1="2" y2="22" />
            <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
            <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
            <path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
        </svg>
    );
}

export function NewIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg className={`${className}`} version="1.0" xmlns="http://www.w3.org/2000/svg" width="48.000000pt" height="48" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,48) scale(0.1,-0.1)" fill={fill} stroke={stroke}>
                <path
                    d="M213 429 c-18 -18 -26 -20 -51 -11 -28 10 -30 8 -39 -21 -6 -23 -17
-34 -40 -40 -29 -9 -31 -11 -21 -39 9 -25 7 -33 -13 -54 l-22 -24 22 -24 c20
-21 22 -29 13 -54 -10 -28 -8 -30 21 -39 23 -6 34 -17 40 -40 9 -29 11 -31 39
-21 25 9 33 7 54 -13 l24 -22 24 22 c21 20 29 22 54 13 28 -10 30 -8 39 21 6
23 17 34 40 40 29 9 31 11 21 39 -9 25 -7 33 13 54 l22 24 -22 24 c-20 21 -22
29 -13 54 10 28 8 30 -21 39 -23 6 -34 17 -40 40 -9 29 -11 31 -39 21 -25 -9
-33 -7 -52 11 -27 26 -27 26 -53 0z m-69 -166 l15 -28 1 28 c0 15 5 27 10 27
6 0 10 -22 10 -50 0 -57 -19 -68 -37 -22 l-11 27 -1 -27 c-2 -50 -21 -29 -21
22 0 56 12 64 34 23z m116 17 c0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5
7 -10 15 -10 8 0 15 -4 15 -10 0 -5 -7 -10 -15 -10 -8 0 -15 -4 -15 -10 0 -5
9 -10 20 -10 11 0 20 -4 20 -10 0 -5 -13 -10 -30 -10 -29 0 -30 1 -30 50 0 49
1 50 30 50 17 0 30 -4 30 -10z m41 -12 l2 -23 4 23 c5 26 18 28 32 5 10 -17
10 -17 11 0 0 9 5 17 11 17 8 0 9 -11 5 -31 -3 -17 -6 -40 -6 -50 0 -24 -30
-25 -30 -1 -1 16 -1 16 -14 0 -19 -25 -23 -23 -31 15 -4 17 -9 40 -11 50 -4
11 0 17 10 17 10 0 17 -9 17 -22z"
                />
            </g>
        </svg>
    );
}

export function ArrowLeft({ fill = "none", stroke = "currentColor", className = "", ...props }: IconProps & React.SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
            {...props}
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

export function LocationIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

export function ExpandIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
    );
}

export function TrashIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    );
}

export function HamburguerMenuIcon({ fill = "none", stroke = "currentColor", className = "" }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
