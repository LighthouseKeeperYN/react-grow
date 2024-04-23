'use client';

function Error({ error }: { error: Error }) {
  return (
    <p>
      Error:
      {error.message}
    </p>
  );
}

export default Error;
