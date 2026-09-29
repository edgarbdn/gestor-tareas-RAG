export async function Usuarios() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await res.json();

  return (
    <div>
      <ul>
        {usuarios.map((u: any) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
