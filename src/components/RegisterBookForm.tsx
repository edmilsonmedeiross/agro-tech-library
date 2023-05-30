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
import { BookOutlined, CheckCircleTwoTone, HomeOutlined } from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import RegisterButton from './RegisterButton';
import Link from 'next/link';
import { BookProps } from '@/types/Book';
import dayjs from 'dayjs';

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

export const revalidate = 60 * 60 * 24; // 24 hours

const RegisterBookForm = ({ authors, book, context }: {authors: AuthorProps[], book?: BookProps, context: string}) => {
  const [authorOptions, setAuthorOptions] = useState(authors || []);
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const [openModal, setOpenModal] = useState(false);
  const [categoriesOptions, ] = useState([
    { value: 'blue', label: 'Blue', closable: true , onClose: () => {} },
    { value: 'red', label: 'Red', closable: true , onClose: () => {}  }
  ]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BookProps>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookProps) => {
    if (context === 'edit') {
      await api.put(`/books/${book?.id}`, {...data, releaseDate: new Date(data.releaseDate).toISOString() });
      setOpenModal(true);
      return;
    }

    await api.post('/books', {
      ...data,
      releaseDate: new Date(data.releaseDate).toISOString(),BookOutlined,
      thumbnail: data.thumbnail.startsWith('https://') ? data.thumbnail : `https://${data.thumbnail}`,
    });
    setOpenModal(true);
  };

  return (
    <>
      <div>
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
                  value={ field.value ? field.value : book?.name }
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
                  value={ field.value ? dayjs(field.value) : dayjs(book?.releaseDate) }
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
                  defaultValue={ book?.category ? JSON.parse(book.category) : [] }
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
                  value={ field.value ? field.value : book?.description }
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
                  defaultValue={ book?.authorId ? book.authorId : '' }
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
                  onChange={ (e) => field.onChange(e.target.value) }
                  value={ field.value ? field.value : book?.thumbnail.replace('https://', '') }
                />
              ) }
            />
            {errors.thumbnail && <span className="text-red-400">{errors.thumbnail.message}</span>}
          </div>

          <RegisterButton context={ context } />

          {
          context !== 'edit' &&
          <Link
            href="/dashboard/books/edit"
            className="
            px-3 text-white
            bg-purple-800 flex gap-2 items-center
            justify-center rounded-md py-2 font-semibold
            hover:bg-purple-950 hover:transition-colors duration-300
            "
            >
            Editar um Livro
          </Link>
          }
        
        </form>
        {
          isVisible && (
            <div>
              <RegisterAuthorForm setAuthorOptions={ setAuthorOptions } />
            </div>
          )
        }

      </div>
      <div
        className="
        px-3 absolute text-white self-center w-1/2
        bg-purple-900 border border-purple-700 gap-2 items-center
        justify-center rounded-md py-2
        flex flex-col md:w-1/2
        "
      >
        <p className="flex items-center gap-2">
          {context !== 'edit' ? 'Cadastrado com sucesso!' : 'Atualizado com sucesso!'}
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </p>
        <div className="flex gap-2">
          <Link href="/" className="underline text-green-600 hover:text-green-700 flex items-center gap-1">
            <HomeOutlined />
            Home
          </Link>
          <button
            onClick={ () => setOpenModal(!openModal) }
            className="underline text-green-600 hover:text-green-700"
          >
            Continuar Cadastrando
          </button>
        </div>

      </div>
      {openModal && (
      <div
        className="
        max-w-xs px-3 absolute m-0 text-white
        bg-slate-200 flex gap-2 items-center
        justify-center rounded-md py-2
        "
      >
        <div>
          {context !== 'edit' ? 'Cadastrado com sucesso!' : 'Atualizado com sucesso!'}
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          <Link href="/">Home</Link>
          <button onClick={ () => setOpenModal(!openModal) }>Continuar Cadastrando</button>
        </div>
      </div>
        )}
      
    </>
  );
};

export default RegisterBookForm;