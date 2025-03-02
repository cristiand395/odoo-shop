const ODOO_JSONRPC_ENDPOINT = process.env.ODOO_JSONRPC_ENDPOINT ?? ""; // Evita undefined
const {
  ODOO_DATABASE: db,
  ODOO_ROOT_USERNAME: username,
  ODOO_ROOT_PASSWORD: password,
} = process.env;
if (!ODOO_JSONRPC_ENDPOINT) {
  throw new Error("❌ ODOO_JSONRPC_ENDPOINT no está definido en las variables de entorno.");
}
/**
 * Función genérica para hacer peticiones a la API de Odoo.
 */
async function odooRequest<T>(params: object): Promise<T | null> {
  try {
    const request = await fetch(ODOO_JSONRPC_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        id: crypto.randomUUID(),
        params,
      }),
    });

    if (!request.ok) {
      throw new Error(`❌ Error HTTP ${request.status}: ${request.statusText}`);
    }

    const response = await request.json();
    if (response.error) {
      const {
        message,
        data
      } = response.error;
      console.error("❌ Error en Odoo:", data.message);
    }

    return response.result;
  } catch (error) {
    console.error("❌ Error en la petición a Odoo:", error);
    return null; // Ahora el tipo es compatible con la firma de la función
  }
}

/**
 * Función para autenticarse en Odoo y obtener el UID.
 */
export async function getAuthUid(db, username, password): Promise<number> {
  console.log("db", db);
  console.log("username", username);

  const result = await odooRequest<number>({
    service: "common",
    method: "authenticate",
    args: [db, username, password, {}],
  });

  if (!result) {
    throw new Error("❌ Error en la autenticación con Odoo.");
  }

  return result;
}

/**
 * Convierte un filtro en una estructura válida para Odoo.
 */
function transformedFilter(input: string | []): any[] {
  if (!input || typeof input !== "string") return [input];

  const jsonLikeString = input
    .replaceAll("True", "true")
    .replaceAll("False", "false")
    .replaceAll("(", "[")
    .replaceAll(")", "]");

  try {
    return [JSON.parse(jsonLikeString)];
  } catch (error) {
    console.error("❌ Error al convertir filtro:", error);
    return [];
  }
}

type OrderDirection = "asc" | "desc";

interface SearchReadProps {
  model: string;
  filter?: string | [];
  fields: string[];
  limit?: number;
  offset?: number;
  order?: `${string} ${OrderDirection}` | "";
}

/**
 * Obtiene registros de un modelo en Odoo.
 */
export async function SearchRead({
  model,
  filter = [],
  fields,
  limit = -1,
  offset = 0,
  order = "",
}: SearchReadProps) {
  const uid = await getAuthUid(db, username, password);
  return odooRequest({
    service: "object",
    method: "execute_kw",
    args: [
      db,
      uid,
      password,
      model,
      "search_read",
      transformedFilter(filter),
      { fields, limit, offset, order },
    ],
  });
}


type CreateProps = {
  model: string;
  values: object;
};

/**
 * Crea un nuevo registro en un modelo de Odoo.
 */
export async function Create({ model, values }: CreateProps) {
  const uid = await getAuthUid();
  return odooRequest({
    service: "object",
    method: "execute_kw",
    args: [db, uid, password, model, "create", [values]],
  });
}

/**
 * Actualiza un registro en Odoo.
 */
export async function Update({ model, id, values }: { model: string; id: number; values: object }) {
  const uid = await getAuthUid();
  return odooRequest({
    service: "object",
    method: "execute_kw",
    args: [db, uid, password, model, "write", [[id], values]],
  });
}

/**
 * Elimina un registro en Odoo.
 */
export async function Delete({ model, id }: { model: string; id: number }) {
  const uid = await getAuthUid();
  return odooRequest({
    service: "object",
    method: "execute_kw",
    args: [db, uid, password, model, "unlink", [[id]]],
  });
}
