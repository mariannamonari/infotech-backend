import { Request, Response } from "express";
import MovimentacaoDTO from "../dto/MovimentacaoDTO";
import Movimentacao from "../model/Movimentacao";

class MovimentacaoController {
    static listarTipos(req: Request, res: Response) {
        return res.status(200).json([
            "ENTRADA",
            "SAIDA"
        ]);
    }

    static listarMotivos(req: Request, res: Response) {
        return res.status(200).json([
            "COMPRA",
            "VENDA",
            "DEVOLUCAO",
            "AJUSTE",
            "PERDA",
            "TRANSFERENCIA"
        ]);
    }

    private static converterNumero(valor: number | string | null | undefined) {
        if (valor === undefined || valor === null || valor === "") {
            return null;
        }

        const numero = typeof valor === "string"
            ? Number(valor.replace(",", "."))
            : Number(valor);

        return Number.isFinite(numero) ? numero : null;
    }

    static async listarMovimentacoes(req: Request, res: Response) {
        try {
            const movimentacoes = await Movimentacao.listarMovimentacoes();

            return res.status(200).json(movimentacoes);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao listar movimentações"
            });
        }
    }

    static async buscarMovimentacao(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    mensagem: "ID da movimentação inválido"
                });
            }

            const movimentacao = await Movimentacao.buscarMovimentacao(id);

            if (!movimentacao) {
                return res.status(404).json({
                    mensagem: "Movimentação não encontrada"
                });
            }

            return res.status(200).json(movimentacao);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao buscar movimentação"
            });
        }
    }

    static async cadastrarMovimentacao(req: Request, res: Response) {
        try {
            const {
                id_produto,
                id_movimentacao_origem,
                tipo,
                motivo,
                quantidade,
                preco_unitario_praticado,
                valor_total,
                observacao
            }: MovimentacaoDTO = req.body;

            if (!id_produto || !Number.isInteger(Number(id_produto))) {
                return res.status(400).json({
                    mensagem: "O produto é obrigatório"
                });
            }

            if (!tipo || tipo.trim() === "") {
                return res.status(400).json({
                    mensagem: "O tipo é obrigatório"
                });
            }

            if (!motivo || motivo.trim() === "") {
                return res.status(400).json({
                    mensagem: "O motivo é obrigatório"
                });
            }

            if (quantidade === undefined || quantidade === null || !Number.isInteger(Number(quantidade)) || Number(quantidade) <= 0) {
                return res.status(400).json({
                    mensagem: "A quantidade deve ser um inteiro positivo"
                });
            }

            if (!observacao || observacao.trim() === "") {
                return res.status(400).json({
                    mensagem: "A observação é obrigatória"
                });
            }

            const precoUnitarioPraticado = MovimentacaoController.converterNumero(preco_unitario_praticado);
            const valorTotal = MovimentacaoController.converterNumero(valor_total);

            if (preco_unitario_praticado !== undefined && preco_unitario_praticado !== null && precoUnitarioPraticado === null) {
                return res.status(400).json({
                    mensagem: "O preço unitário praticado é inválido"
                });
            }

            if (valor_total !== undefined && valor_total !== null && valorTotal === null) {
                return res.status(400).json({
                    mensagem: "O valor total é inválido"
                });
            }

            const movimentacao = await Movimentacao.cadastrarMovimentacao(
                Number(id_produto),
                id_movimentacao_origem === undefined || id_movimentacao_origem === null
                    ? null
                    : Number(id_movimentacao_origem),
                tipo.trim(),
                motivo.trim(),
                Number(quantidade),
                precoUnitarioPraticado,
                valorTotal,
                observacao.trim()
            );

            return res.status(201).json(movimentacao);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao cadastrar movimentação"
            });
        }
    }
}

export default MovimentacaoController;