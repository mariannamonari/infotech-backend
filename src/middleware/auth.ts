import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
    const cabecalho = req.headers.authorization;
    const token = cabecalho?.startsWith("Bearer ")
        ? cabecalho.substring(7)
        : undefined;
    const segredo = process.env.JWT_SECRET;

    if (!segredo) {
        return res.status(500).json({
            mensagem: "JWT_SECRET não configurado"
        });
    }

    if (!token) {
        return res.status(401).json({
            mensagem: "Token de autenticação não informado"
        });
    }

    try {
        jwt.verify(token, segredo);
        return next();
    } catch {
        return res.status(401).json({
            mensagem: "Token de autenticação inválido ou expirado"
        });
    }
}