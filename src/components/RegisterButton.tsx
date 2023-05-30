import React from 'react';

function RegisterButton({context}: {context?: string}) {
  return (
    <div>
      <button
        type="submit"
        className="self-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded w-full hover:transition-colors duration-300"
      >
        {context === 'edit' ? 'Editar Livro':'Cadastrar Livro'}
      </button>
    </div>
  );
}

export default RegisterButton;