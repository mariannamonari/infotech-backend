import { Request, Response } from "express";
import Relatorio from "../model/Relatorio";

class RelatorioController {
    static async obterEstoque(_req: Request, res: Response) {
        try {
            const relatorio = await Relatorio.obterEstoque();
            return res.status(200).json(relatorio);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({
                mensagem: "Erro ao gerar relatório de estoque"
            });
        }
    }
}

export default RelatorioController;
