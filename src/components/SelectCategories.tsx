'use client';
import { category } from '@prisma/client';
import { Select, SelectProps, Tag } from 'antd';
import React from 'react';

function SelectCategories({ categoriesOptions, onChange, ...props }: SelectProps & { categoriesOptions?: category[] }) {

  const tagRender = (props: any) => {
    const { label, value, closable, onClose, id } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    return (
      <Tag
        id={ id }
        color={ value }
        itemID={ id }
        onMouseDown={ onPreventMouseDown }
        closable={ closable }
        onClose={ onClose }
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
        filterOption={ (input, option) =>
          (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
        }
        defaultValue={ [] }
        options={ categoriesOptions?.map((category) => ({
          id: String(category.id),
          value: category.value,
          label: category.name,
        })) }
        { ...props }
      />
    </div>
  );
}

export default SelectCategories;
