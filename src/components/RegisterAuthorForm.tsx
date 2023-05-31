'use client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthorSchema } from '@/validations/authorSchema';
import { api } from '@/lib/api';
import { useAtom } from 'jotai';
import { isVisibleAtom } from '@/jotai/atoms';
import RegisterButton from './RegisterButton';
import { DatePicker, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

interface AuthorFormData extends z.infer<typeof AuthorSchema> {
  id?: number;
}

const RegisterAuthorForm = ({ setAuthorOptions }: { setAuthorOptions?: any }) => {
  const [, setIsVisible] = useAtom(isVisibleAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(AuthorSchema),
  });


  const onSubmit = (data: AuthorFormData)=> {
    // Envie os dados do autor para onde você precisar
    api.post('/author', {...data, birthDate: new Date(data.birthDate).toISOString()})
      .then((newAuthor) => {
        if (newAuthor.data) {
          setAuthorOptions((prev: any) => [...prev, newAuthor.data]);
          setIsVisible(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1 className="text-white">Cadastre o Autor</h1>
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

        <RegisterButton />
      </form>
    </div>
  );
};

export default RegisterAuthorForm;
