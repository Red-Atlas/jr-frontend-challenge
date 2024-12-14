interface Props {
  placeholderText: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholderText, onChangeInput }) => {
  return (
    <input
      onChange={onChangeInput}
      className="bg-white shadow-xl border-none focus:no-underline p-2 rounded-xl mt-5 w-[500px]"
      placeholder={placeholderText}
      type="text"
    />
  );
};

export default Input;
