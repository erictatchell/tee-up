export default function HorizontalRadioGroup({ label, name, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex space-x-4 bg-gray-100 p-2 rounded-lg">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center cursor-pointer px-3 py-2 rounded-md transition-colors ${
              value === option.value
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

