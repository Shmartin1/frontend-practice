import React from 'react';
import Input from './Input';
import List from './List';
import { debouncedSearchProducts } from './server';

const App: React.FC = () => {
  const [products, setProducts] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearch = debouncedSearchProducts(({ products, searchQuery }) => {
    setProducts(products);
    setSearchQuery(searchQuery);
  }, 100);

  const handleProductSelect = (product: string) => {
    setSearchQuery(product);
    setProducts([]);
  };

  return (
    <div className="search__input-options">
      <Input searchFunction={handleSearch} />
      <List products={products} searchQuery={searchQuery} onProductSelect={handleProductSelect} />
    </div>
  );
};

export default App;
