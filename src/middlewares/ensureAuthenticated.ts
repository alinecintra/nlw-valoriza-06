import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // receber o token
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { user_id } = request;
    console.log(user_id);

    // validar se o token é válido
    const { sub } = verify(token, "5105377ab78a49f7d09ed8d0227b2d76") as IPayload;

    // Recuperar informações do usuário.
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }


}