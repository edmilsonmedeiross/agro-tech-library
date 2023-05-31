import { Select, SelectProps } from 'antd';
import React from 'react';
import { BookCardProps } from './BookCard';

function SelectBooks({
    booksOptions,
    onChange,
    ...props
    }: SelectProps & {
    booksOptions: BookCardProps[],
    onChange(value: string): void,
}) {

  const books = booksOptions.map((book) => ({value: book.id, label: book.name}));

  return (
    <Select
      showSearch
      placeholder="Selecione um livro ou pesquise por um"
      optionFilterProp="children"
      className="w-full"
      onChange={ onChange }
      filterOption={ (input, option) =>
        typeof option?.label === 'string'
        ? option?.label.toLowerCase().includes(input.toLowerCase())
        : false
      }
      options={ books }
      { ...props }
      />
  );
}

export default SelectBooks;