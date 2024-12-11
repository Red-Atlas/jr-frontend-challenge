import { ReactNode } from "react";

interface IModalProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function Modal({ children, className }: IModalProps) {
  return (
    <section
      className={`fixed z-50 top-0 h-full w-full  backdrop-blur-[.3em] flex justify-center items-center ${className}`}
    >
      {children}
    </section>
  );
}
