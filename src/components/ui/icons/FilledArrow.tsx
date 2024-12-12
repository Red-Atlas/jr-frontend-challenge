
const FilledArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${className}`}
    >
      <path d="M12 8L18 14H6L12 8Z"></path>
    </svg>
  );
};

export default FilledArrow;
