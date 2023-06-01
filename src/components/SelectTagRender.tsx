import React, { ReactNode } from 'react';
import { Tag } from 'antd';

type TagRenderProps = {
  label: string | ReactNode;
  id?: string;
  color?: string;
  closable?: boolean;
};

const TagRender = (props: TagRenderProps) => {
  const { label, id, color, closable } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();

  };
  
  return (
    <Tag
      key={ id }
      id={ id }
      color={ color }
      onMouseDown={ onPreventMouseDown }
      closable={ closable }
      style={ { marginRight: 3 } }
    >
      {label}
    </Tag>
  );
};

export default TagRender;