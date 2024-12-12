interface DividerProps {
  text: string;
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className="flex flex-row w-full items-center justify-between gap-4">
      <div className="flex-grow h-[2px] bg-primary"></div>
      <div className="flex-grow flex justify-center">
        <p className="text-primary font-semibold">{text}</p>
      </div>
      <div className="flex-grow h-[2px] bg-primary"></div>
    </div>
  );
};

export default Divider;
