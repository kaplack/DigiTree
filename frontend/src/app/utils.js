export const consultaFetch = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Si usas autenticación
    },
  });

  return response;
};
