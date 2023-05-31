'use client';
import { CheckCircleTwoTone, HomeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useForm, Controller} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema } from '@/validations/bookSchema';
import RegisterAuthorForm from './RegisterAuthorForm';
import { createBook, updateBook } from '@/actions';
import SelectCategories from './SelectCategories';
import { type BookProps } from '@/types/Book';
import { isVisibleAtom } from '@/jotai/atoms';
import RegisterButton from './RegisterButton';
import { AuthorProps } from '@/types/Author';
import SelectAuthors from './SelectAuthors';
import { category } from '@prisma/client';
import { Input, DatePicker } from 'antd';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import dayjs from 'dayjs';


const { TextArea } = Input;

export const revalidate = 60 * 60 * 24; // 24 hours

const RegisterBookForm = ({
  authors, book, categoriesOptions, context
  }: {
    authors?: AuthorProps[],
    book?: BookProps,
    context: string,
    categoriesOptions?: category[]
  }) => {

  const [authorOptions, setAuthorOptions] = useState(authors ?? []);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const [openModal, setOpenModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookProps>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: book?.name,
      releaseDate: book?.releaseDate,
      description: book?.description,
      authorId: book?.authorId,
      thumbnail: book?.thumbnail,
      categories: book?.categories
    },
  });
  
  console.log(errors.categories?.message);
  

  const onSubmit = async (data: BookProps) => {
    if (isSubmiting) return;
    setIsSubmiting(true);

    if (context === 'edit' && book?.id) {
      console.log('entrei no edit');
      
      await updateBook(
        Number(book.id),
        {...data, releaseDate: new Date(data.releaseDate),
          thumbnail: data.thumbnail.startsWith('https://')
            ? data.thumbnail
            : `https://${data.thumbnail}`
        });

      setIsSubmiting(false);
      setOpenModal(true);
      return;
    }

    await createBook(
      {...data, releaseDate: new Date(data.releaseDate),
        thumbnail: data.thumbnail.startsWith('https://')
        ? data.thumbnail
        : `https://${data.thumbnail}`
      });

    setIsSubmiting(false);
    setOpenModal(true);
  };
  
  return (
    <>
      <div>
        <form onSubmit={ handleSubmit(onSubmit, (e) => console.log(e)) } className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white">Nome do Livro</label>
            <Controller
              name="name"
              control={ control }
              render={ ({ field }) => (
                <Input
                  id="name"
                  { ...field }
                  status={ errors.name ? 'error' : '' }
                  onChange={ (e) => field.onChange(e.target.value) }
                  placeholder="Nome do Livro"
                  value={ field.value !== undefined ? field.value : book?.name }
                />
                )
              }
            />
            {errors.name && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors.name.message}</span>}
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
                  status={ errors.releaseDate ? 'error' : '' }
                  onChange={ (_value, dateString) => {
                    field.onChange(dateString);
                  } }
                  value={ field.value && dayjs(field.value) }
                />
              ) }
            />
            {errors.releaseDate && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors.releaseDate.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="categories" className="text-white">Categoria</label>
            <Controller
              name="categories"
              control={ control }
              render={ ({ field }) => (
                <SelectCategories
                  categoriesOptions={ categoriesOptions }
                  status={ errors.categories ? 'error' : '' }
                  onChange={ (_value, option) => {
                    
                    field.onChange(option.length
                      ? option.map((item: any) => ({...item, name: item.label, value: item.value }))
                      : []);
                    console.log(_value, option);
                  } }
                />
              ) }
            />
            {errors.categories && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors?.categories.message}</span>}
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
                  status={ errors.description ? 'error' : '' }
                  onChange={ (e) => field.onChange(e.target.value) }
                  placeholder="Descrição do Livro"
                />
              ) }
            />
            
            {errors.description && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors.description.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="authorId" className="text-white">Autor</label>
            <Controller
              name="authorId"
              control={ control }
              render={ ({ field }) => (
                <SelectAuthors
                  authorsOptions={ authorOptions }
                  
                  status={ errors.authorId ? 'error' : '' }
                  onChange={ (value) => {
                    if (value === 'Outro') return setIsVisible(true);
                    field.onChange(value);
                  } }
                />
              ) }
            />

            {errors.authorId && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors.authorId.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-white">URL da Capa</label>
            <Controller
              name="thumbnail"
              control={ control }
              render={ ({ field }) => (
                <Input
                  id="thumbnail"
                  placeholder="URL da Capa"
                  { ...field }
                  status={ errors.thumbnail ? 'error' : '' }
                  onChange={ (e) => (
                    field.onChange(e.target.value.startsWith('https://') ? e.target.value : `https://${e.target.value}`)
                  ) }
                  value={ field.value }
                />
              ) }
            />
            {errors.thumbnail && <span className="text-red-400 flex items-center gap-2 mt-2"><ExclamationCircleOutlined />{errors.thumbnail.message}</span>}
          </div>
          <RegisterButton disabled={ isSubmiting } context={ context } />

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
      {openModal && (
        <div className="fixed top-0 left-0 w-full z-10 h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md flex flex-col gap-2 p-3">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {context !== 'edit' ? 'Cadastrado com sucesso!' : 'Atualizado com sucesso!'}
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </h1>
            <div className="flex gap-2 justify-center items-center">
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
        </div>
        )}
    </>
  );
};

export default RegisterBookForm;