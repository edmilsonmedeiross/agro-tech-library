'use client';
import { category } from '@prisma/client';
import { Select, SelectProps, Tag } from 'antd';
import React from 'react';

function SelectCategories({ categoriesOptions, onChange, defaultValue = [], ...props }: SelectProps & { categoriesOptions?: category[] }) {

  const tagRender = (props: any) => {
    const { label, id } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    return (
      <Tag
        key={ id }
        id={ id }
        onMouseDown={ onPreventMouseDown }
        closable
        style={ { marginRight: 3 } }
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="flex flex-col">
      <Select
        id="categories"
        mode="multiple"
        showArrow
        loading={ !categoriesOptions }
        onChange={ onChange }
        tagRender={ tagRender }
        placeholder="Selecione uma categoria"
        optionFilterProp="children"
        filterOption={ (input, option) => {
          if (!option?.label) return false;
          return (option?.label as string).toLowerCase().includes(input);
        } }
        defaultValue={ defaultValue }
        options={ categoriesOptions?.map((category) => ({
          key: String(category.id),
          id: String(category.id),
          value: category.id,
          color: category.value,
          label: category.name,
        })) }
        { ...props }
      />
    </div>
  );
}

export default SelectCategories;
