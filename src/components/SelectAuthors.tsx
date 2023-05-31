'use client';
import { type AuthorProps } from '@/types/Author';
import { Select, type SelectProps } from 'antd';

function SelectAuthors({ authorsOptions, ...props }: SelectProps & { authorsOptions?: AuthorProps[] }) {
  const authors = authorsOptions?.map((author) => ({value: String(author.id), label: author.name})) ?? [];

  return (
    <Select
      showSearch
      placeholder="Selecione o Autor ou pesquise por um"
      optionFilterProp="children"
      filterOption={ (input, option) =>
        typeof option?.label === 'string'
          ? option?.label.toLowerCase().includes(input.toLowerCase())
          : false
      }
      options={ [...authors, {
        value: 'Outro',
        label: 'Outro'
      }] }
      { ...props }
    />
  );
}

export default SelectAuthors;