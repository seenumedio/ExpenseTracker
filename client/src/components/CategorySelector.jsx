import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = [
  'Food', 'Utilities', 'Entertainment', 'Salary',
  'Rent', 'Travel', 'Shopping', 'Health'
];

const CategorySelector = ({ selected = '', onChange, required = false }) => {
  const [customCategory, setCustomCategory] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (!selected) {
      setIsCustom(false);
      setCustomCategory('');
      return;
    }
    const isDefault = DEFAULT_CATEGORIES.some(
      cat => cat.toLowerCase() === selected.toLowerCase()
    );
    setIsCustom(!isDefault);
    if (!isDefault) setCustomCategory(selected);
    else setCustomCategory('');
  }, [selected]);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === 'Custom') {
      setIsCustom(true);
      setCustomCategory('');
      onChange('');
    } else {
      setIsCustom(false);
      setCustomCategory('');
      onChange(value);
    }
  };

  return (
    <div className="space-y-1.5">
      <select
        value={
          isCustom
            ? 'Custom'
            : DEFAULT_CATEGORIES.find(
              cat => cat.toLowerCase() === selected?.toLowerCase()
            ) || ''
        }
        onChange={handleSelect}
        className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        required={required && !isCustom}
      >
        <option value="" disabled>-- Choose category --</option>
        {DEFAULT_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="Custom">+ Custom</option>
      </select>

      {isCustom && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => { setCustomCategory(e.target.value); onChange(e.target.value); }}
          placeholder="Enter custom category"
          className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          required={required}
          autoFocus
        />
      )}
    </div>
  );
};

export default CategorySelector;