import React, { useEffect, useState } from 'react';

interface InputProps {
  searchFunction: (searchQuery: string) => void;
}

const Input: React.FC<InputProps> = ({ searchFunction }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    searchFunction(inputValue);
  }, [inputValue, searchFunction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input__suggestion">
      <input
        type="text"
        id="search-input"
        placeholder="Search here"
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="on"
      />
      <span id="autocomplete-suggestion"></span>
    </div>
  );
};

export default Input;
