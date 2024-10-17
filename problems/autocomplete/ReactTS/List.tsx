import React from 'react';

interface ListProps {
  products: string[];
  searchQuery: string;
  onProductSelect: (product: string) => void;
}

const List: React.FC<ListProps> = ({ products, searchQuery, onProductSelect }) => {
  const handleClick = (product: string) => {
    onProductSelect(product);
  };

  return (
    <ul tabIndex={1} className={products.length ? 'autocomplete-options' : ''}>
      {products.map((product) => (
        <li key={product} onClick={() => handleClick(product)} tabIndex={0}>
          <span className="highlighted">{searchQuery}</span>
          {product.slice(searchQuery.length)}
        </li>
      ))}
    </ul>
  );
};

export default List;
