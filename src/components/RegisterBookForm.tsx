'use client';
import React, { useState } from 'react';
import { useForm, Controller} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthorProps } from '@/types/Author';
import { bookSchema } from '@/validations/bookSchema';
import { api } from '@/lib/api';
import RegisterAuthorForm from './RegisterAuthorForm';
import { useAtom } from 'jotai';
import { isVisibleAtom } from '@/jotai/atoms';
import { Select, Tag, Input, DatePicker } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import RegisterButton from './RegisterButton';

const { TextArea } = Input;

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={ value }
      onMouseDown={ onPreventMouseDown }
      closable={ closable }
      onClose={ onClose }
      style={ { marginRight: 3 } }
    >
      {label}
    </Tag>
  );
};

type BookFormData = {
  name: string;
  releaseDate: string;
  category: string;
  description: string;
  authorId: string;
  thumbnail: string;
}

export const revalidate = 60 * 60 * 24; // 24 hours

const RegisterBookForm = ({ authors }: {authors: AuthorProps[]}) => {
  const [authorOptions, setAuthorOptions] = useState(authors || []);
  const [categoriesOptions, ] = useState([
    { value: 'blue', label: 'Blue', closable: true , onClose: () => {} },
    { value: 'red', label: 'Red', closable: true , onClose: () => {}  }
  ]);
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookFormData) => {
    await api.post('/books', {...data, releaseDate: new Date(data.releaseDate).toISOString() });
  };

  return (
    <div className="flex min-h-screen py-3 items-center justify-center bg-green-600 ">
      <div className="bg-purple-900 border border-purple-700 rounded-md flex gap-2 flex-col px-3 py-5 max-w-xs">
        <h1 className="text-white self-center text-bold text-lg font-bold">Cadastre um Livro!</h1>
        <form onSubmit={ handleSubmit(onSubmit) }className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white">Nome do Livro</label>
            <Controller
              name="name"
              control={ control }
              render={ ({ field }) => (
                <Input
                  id="name"
                  { ...field }
                  placeholder="Nome do Livro"
                  prefix={ <BookOutlined /> }
                />
                ) }
            />
            {errors.name && <span className="text-red-400">{errors.name.message}</span>}
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="releaseDate" className="text-white">Data de Lançamento</label>
            <Controller
              name="releaseDate"
              control={ control }
              render={ ({ field }) => (
                <DatePicker
                  id="releaseDate"
                  placeholder="Selecione uma data"
                  picker="date"
                  onChange={ (_value, dateString) => {
                    field.onChange(dateString);
                  } }
                />
              ) }
            />
            {errors.releaseDate && <span className="text-red-400">{errors.releaseDate.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-white">Categoria</label>
            <Controller
              name="category"
              control={ control }
              render={ ({ field }) => (
                <Select
                  id="category"
                  mode="multiple"
                  showArrow
                  tagRender={ tagRender }
                  placeholder="Selecione uma categoria"
                  optionFilterProp="children"
                  filterOption={ (input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={ (value) => {
                    field.onChange(JSON.stringify(value));
                  } }
                  options={
                    categoriesOptions.map((category) => ({value: category.value, label: category.label}))
                  }
                />
              ) }
            />

            {errors.category && <span className="text-red-400">{errors.category.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-white">Descrição</label>

            <Controller
              name="description"
              control={ control }
              render={ ({ field }) => (
                <TextArea
                  rows={ 3 }
                  id="description"
                  className="resize-none"
                  { ...field }
                  placeholder="Descrição do Livro"
                />
              ) }
            />
            
            {errors.description && <span className="text-red-400">{errors.description.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="authorId" className="text-white">Autor</label>
            <Controller
              name="authorId"
              control={ control }
              render={ ({ field }) => (
                <Select
                  optionFilterProp="children"
                  placeholder="Selecione um autor"
                  status={ errors.authorId ? 'error' : '' }
                  onChange={ (value) => {
                    setIsVisible(value === 'Outro');
                    field.onChange(String(value));
                  } }
                  filterOption={ (input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={ [
                    ...authorOptions.map((author) => ({value: author.id, label: author.name})),
                    {
                      value: 'Outro',
                      label: 'Outro'
                    } ]
                  }
                />
              ) }
            />

            {errors.authorId && <span className="text-red-400">{errors.authorId.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-white">URL da Capa</label>
            <Controller
              name="thumbnail"
              control={ control }
              render={ ({ field }) => (
                <Input
                  id="thumbnail"
                  addonBefore={ <span className="bg-purple-900 text-white">https://</span> }
                  placeholder="URL da Capa"
                  status={ errors.thumbnail ? 'error' : '' }
                  onChange={ (e) => field.onChange(`https://${e.target.value}`) }
                />
              ) }
            />
            {errors.thumbnail && <span className="text-red-400">{errors.thumbnail.message}</span>}
          </div>

          <RegisterButton />
        
        </form>
        {
          isVisible && (
            <div>
              <RegisterAuthorForm setAuthorOptions={ setAuthorOptions } />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default RegisterBookForm;