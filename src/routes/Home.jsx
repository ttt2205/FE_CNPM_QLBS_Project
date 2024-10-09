export default function Home({ children, message }) {
  return (
    <div>
      <h1>Home</h1>
      <p>{message.text}</p>
    </div>
  );
}
