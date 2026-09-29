"use client";

import { useState } from "react";

export default function Prueba() {
  const [contador, setContador] = useState(0);
  return <button onClick={() => setContador(contador + 1)}>{contador}</button>;
}
