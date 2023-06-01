'use client';
import { category } from '@prisma/client';
import { Select, SelectProps } from 'antd';
import TagRender from './SelectTagRender';
import React from 'react';

function SelectCategories({ categoriesOptions, onChange, defaultValue = [], ...props }: SelectProps & { categoriesOptions?: category[] }) {

  return (
    <div className="flex flex-col">
      <Select
        id="categories"
        mode="multiple"
        showArrow
        loading={ !categoriesOptions?.length }
        onChange={ onChange }
        tagRender={ TagRender }
        placeholder="Selecione uma categoria"
        optionFilterProp="children"
        filterOption={ (input, option) => {
          if (!option?.label) return false;
          return (option?.label as string).toLowerCase().includes(input.toLowerCase());
        } }
        defaultValue={ defaultValue }
        options={ categoriesOptions?.map((category) => ({
          key: String(category.id),
          id: String(category.id),
          value: category.id,
          label: category.name,
        })) }
        { ...props }
      >
        
      </Select>
    </div>
  );
}

export default SelectCategories;
