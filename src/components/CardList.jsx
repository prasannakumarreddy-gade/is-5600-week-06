import Button from "./Button";
import Card from "./Card";
import Search from "./Search";
import React, { useState, useEffect } from "react";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  const handlePagination = (direction) => {
    if (direction === 'next') {
      setOffset((prevOffset) => Math.min(prevOffset + limit, data.length - limit));
    } else if (direction === 'previous') {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) {
        return product;
      }
      return product.tags.find(({ title }) => title === tagQuery);
    });
    setOffset(0);
    setProducts(filtered);
  };

  // Calculate if the next button should be disabled
  const isNextDisabled = offset + limit >= data.length;
  const isPreviousDisabled = offset === 0;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination('previous')} disabled={isPreviousDisabled} />
        <Button text="Next" handleClick={() => handlePagination('next')} disabled={isNextDisabled} />
      </div>
    </div>
  );
};

export default CardList;