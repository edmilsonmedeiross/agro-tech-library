import RegisterAuthorForm from '@/components/RegisterAuthorForm';
import React from 'react';

function authors() {
  return (
    <div>
      <RegisterAuthorForm context={ 'register' } />
    </div>
  );
}

export default authors;