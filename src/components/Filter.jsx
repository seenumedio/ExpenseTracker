import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';

const Filter = ({ transactions, onFilter }) => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const defaultCategories = [
    "Food", "Utilities", "Rent", "Travel",
    "Entertainment", "Health", "Shopping",
    "Salary", "Investment"
  ];

  const [showSearch, setShowSearch] = useState(false);

  const applyFilter = () => {
    let filtered = transactions;

    if (type) filtered = filtered.filter(tx => tx.type === type);
    if (category) filtered = filtered.filter(tx => tx.category === category);
    if (fromDate) filtered = filtered.filter(tx => new Date(tx.date) >= new Date(fromDate));
    if (toDate) filtered = filtered.filter(tx => new Date(tx.date) <= new Date(toDate));

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(tx =>
        tx.description?.toLowerCase().includes(term) ||
        tx.category?.toLowerCase().includes(term) ||
        tx.type?.toLowerCase().includes(term) ||
        tx.recurring?.toLowerCase().includes(term)
      );
    }

    onFilter(filtered);
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setType('');
    setCategory('');
    setFromDate('');
    setToDate('');
    setSearchTerm('');
    setShowDateDropdown(false);
    onFilter(transactions);
    setShowMobileFilters(false);
  };

  return (
    
    <div className="sticky top-20 z-40 w-full px-4 py-3 bg-white dark:bg-gray-900 shadow-md rounded-md mb-6">

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-4 flex-wrap">

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {defaultCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Date */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            <FaCalendarAlt className='inline text-gray-600 mb-1' /> Date {showDateDropdown ? <FaChevronUp className='inline text-sm' /> : <FaChevronDown className='inline text-sm' />}
          </button>

          {showDateDropdown && (
            <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-3 rounded shadow-lg space-y-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          )}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded px-3 py-2 min-w-[200px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFilter();
          }}
        />

        {/* Buttons */}
        <button
          onClick={applyFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 border px-3 py-2 rounded bg-gray-100 dark:bg-gray-800"
          >
            <FiFilter />
            Filters
          </button>
          {showMobileFilters && (
          <div className="flex items-center gap-2">
            {showSearch && (
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-2 mt-2 w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') applyFilter();
                }}
              />
            )}

            <FiSearch
              onClick={() => setShowSearch(!showSearch)}
              className="text-xl cursor-pointer"
            />
          </div>
          )}
        </div>

        {showMobileFilters && (
          <div className="mt-4 space-y-3">

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Categories</option>
              {defaultCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="relative">
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="w-full text-left pl-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            <FaCalendarAlt className='inline text-gray-600 mb-1' /> Date {showDateDropdown ? <FaChevronUp className='inline text-sm float-right mt-1 mr-1' /> : <FaChevronDown className='inline text-sm float-right mt-1 mr-1' />}
          </button>

          {showDateDropdown && (
            <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-3 rounded shadow-lg space-y-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          )}
        </div>

            <div className="flex justify-between">
              <button
                onClick={applyFilter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Apply
              </button>
              <button
                onClick={resetFilters}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
