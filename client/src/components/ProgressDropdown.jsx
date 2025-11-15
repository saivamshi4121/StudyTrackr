const PROGRESS_OPTIONS = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const ProgressDropdown = ({ value, onChange, disabled = false }) => {
  return (
    <select 
      value={value} 
      onChange={onChange} 
      disabled={disabled}
      className="input"
    >
      {PROGRESS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ProgressDropdown;

