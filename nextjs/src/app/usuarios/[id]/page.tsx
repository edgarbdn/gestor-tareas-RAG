export default async function DetalleUsuario({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const usuario = await res.json();

  return (
    <div>
      <h1>{usuario.name}</h1>
      <p>{usuario.email}</p>
    </div>
  );
}
