import { Outlet } from 'react-router-dom';

const RutaProtegida = () => {
  return (
    <>
      <h1>Esta es una Ruta Protegida</h1>
      <Outlet />
    </>
  );
};

export default RutaProtegida;
