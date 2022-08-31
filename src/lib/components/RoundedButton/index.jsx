export function RoundedButton({
  text,
  onClick = () => {},
  isActive = false,
  disabled = false,
}) {
  if (disabled)
    return (
      <button
        disabled="disabled"
        className="w-8 h-8 bg-gray-300 flex justify-center items-center text-gray-50 border border-gray-400 rounded-full text-sm"
      >
        {text}
      </button>
    );
  else if (isActive)
    return (
      <button className="w-8 h-8 flex justify-center items-center rounded-full text-blue-500 border border-blue-500 text-sm">
        {text}
      </button>
    );
  else
    return (
      <button
        className="w-8 h-8 bg-blue-400 flex justify-center items-center rounded-full text-white border border-blue-500 text-sm hover:bg-blue-500 hover:shadow-md"
        onClick={onClick}
      >
        {text}
      </button>
    );
}
