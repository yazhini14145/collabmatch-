import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search creators by name, niche, handle, or city...',
}) => {
  return (
    <div className="search-bar">
      <Search size={17} className="search-bar-icon" aria-hidden="true" />
      <label htmlFor="creator-search-input" className="sr-only">
        Search creators
      </label>
      <input
        id="creator-search-input"
        type="text"
        className="search-bar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange('')}
          aria-label="Clear search query"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
