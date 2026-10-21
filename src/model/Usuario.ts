import { scryptSync, timingSafeEqual } from "crypto";
import { pool } from "./DatabaseModel";

class Usuario {
    static async buscarPorEmail(email: string) {
        const resultado = await pool.query(`
            SELECT
                id_usuario,
                email,
                senha
            FROM usuario
            WHERE LOWER(email) = LOWER($1)
        `, [email]);

        return resultado.rows[0];
    }

    static verificarSenha(senha: string, senhaArmazenada: string) {
        const [salt, hashArmazenado] = senhaArmazenada.split(":");

        if (!salt || !hashArmazenado) {
            return false;
        }

        const hash = Buffer.from(hashArmazenado, "hex");
        const hashCalculado = scryptSync(senha, salt, hash.length);

        return hash.length === hashCalculado.length && timingSafeEqual(hash, hashCalculado);
    }
}

export default Usuario;