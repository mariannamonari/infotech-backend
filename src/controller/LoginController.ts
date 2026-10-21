import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import LoginDTO from "../dto/LoginDTO";
import Usuario from "../model/Usuario";

class LoginController {
    static async login(req: Request, res: Response) {
        try {
            const { email, senha }: LoginDTO = req.body;

            if (!email || !senha || email.trim() === "" || senha.trim() === "") {
                return res.status(400).json({
                    mensagem: "E-mail e senha são obrigatórios"
                });
            }

            const usuario = await Usuario.buscarPorEmail(email.trim());

            if (!usuario || !Usuario.verificarSenha(senha, usuario.senha)) {
                return res.status(401).json({
                    mensagem: "E-mail ou senha inválidos"
                });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({
                    mensagem: "JWT_SECRET não configurado"
                });
            }

            const token = jwt.sign(
                { id_usuario: usuario.id_usuario, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                token,
                tipo: "Bearer",
                expira_em: "1h",
                usuario: {
                    id_usuario: usuario.id_usuario,
                    email: usuario.email
                }
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao realizar login"
            });
        }
    }
}

export default LoginController;