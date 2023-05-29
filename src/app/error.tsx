'use client';

function error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={ reset }>Reset</button>

    </div>
  );
}

export default error;