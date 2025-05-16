'use client'

interface HomeErrorProps {
  error: { message: string };
  reset: () => void;
}

const HomeError = ({ error, reset }: HomeErrorProps) => {
  return (
    <div>
      <h2>Something bad happened :( </h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default HomeError