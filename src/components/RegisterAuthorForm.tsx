'use client';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthorSchema } from '@/validations/authorSchema';
import { useAtom } from 'jotai';
import { authorExistsAtom } from '@/jotai/atoms';
import RegisterButton from './RegisterButton';
import { DatePicker, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { createAuthor, validateAuthor } from '@/actions';

interface AuthorFormData extends z.infer<typeof AuthorSchema> {
  id?: number;
}

const RegisterAuthorForm = ({
    setAuthorOptions, context
  }: {
    setAuthorOptions?: (nexs: any) => void,
    context: string
    }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [authorExists, setAuthorExist] = useAtom(authorExistsAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(AuthorSchema),
  });

  const onSubmit = async (data: AuthorFormData)=> {
    const authorExists = await validateAuthor(data.name, data.birthDate);

    if (authorExists) {
      setIsVisible(true);
      setAuthorExist(true);
      return;
    }
    
    const newAuthor = await createAuthor(data);
    if (setAuthorOptions instanceof Function) setAuthorOptions((prev: any) => [...prev, newAuthor]);
    setIsVisible(true);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-white self-center font-bold" id="newAuthor">Cadastre o Autor</h1>

      { isVisible && (
        <div className="fixed top-0 left-0 w-full z-10 h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md flex flex-col gap-2 p-3">
            <h1 className="text-2xl font-bold">{authorExists ? 'Autor Já Cadastrado' : 'Cadastrado com Sucesso!'}</h1>
            <button onClick={ () => { setIsVisible(false); } } className="bg-green-500 text-white rounded-md px-3 py-1">Ok</button>
          </div>
        </div>
      )}

      <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-white">Nome</label>
          <Controller
            name="name"
            control={ control }
            render={ ({ field }) => (
              <Input
                id="name"
                { ...field }
                placeholder="Nome do Autor"
                prefix={ <UserOutlined /> }
              />
                ) }
            />
          {errors.name && <span>{ errors.name.message }</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-white">Biografia</label>
          <Controller
            name="bio"
            control={ control }
            render={ ({ field }) => (
              <TextArea
                rows={ 3 }
                id="bio"
                className="resize-none"
                { ...field }
                placeholder="Biografia do Autor"
              />
              ) }
            />
          {errors.bio && <span>{ errors.bio.message }</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate" className="text-white">Data de Nascimento</label>
          <Controller
            name="birthDate"
            control={ control }
            render={ ({ field }) => (
              <DatePicker
                id="birthDate"
                picker="date"
                placeholder="Selecione uma data"
                onChange={ (_value, dateString) => {
                  field.onChange(dateString);
                } }
              />
              ) }
            />
          {errors.birthDate && <span>{ errors.birthDate.message }</span>}
        </div>

        <RegisterButton context={ context } />
      </form>
    </div>
  );
};

export default RegisterAuthorForm;
