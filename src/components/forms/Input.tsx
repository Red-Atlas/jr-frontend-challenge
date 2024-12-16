import logo from "../../assets/logo.png";

interface Props {
  placeholderText: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholderText, onChangeInput }) => {
  return (
    <>
      <div className="relative mt-5 w-[350px] sm:w-[500px] md:w-[600px]">
        <input
          onChange={onChangeInput}
          className="bg-white shadow-xl border-none focus:no-underline p-2 rounded-xl pl-12 w-full"
          placeholder={placeholderText}
          type="text"
        />
        <img
          src={logo}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-6 h-6"
          alt="Logo"
        />
      </div>
    </>
  );
};

export default Input;
