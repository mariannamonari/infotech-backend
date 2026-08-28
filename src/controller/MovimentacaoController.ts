import { Request, Response } from "express";
import MovimentacaoDTO from "../dto/MovimentacaoDTO";
import Movimentacao from "../model/Movimentacao";

class MovimentacaoController {
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

            const movimentacao = await Movimentacao.cadastrarMovimentacao(
                Number(id_produto),
                id_movimentacao_origem === undefined || id_movimentacao_origem === null
                    ? null
                    : Number(id_movimentacao_origem),
                tipo.trim(),
                motivo.trim(),
                Number(quantidade),
                preco_unitario_praticado === undefined || preco_unitario_praticado === null
                    ? null
                    : Number(preco_unitario_praticado),
                valor_total === undefined || valor_total === null
                    ? null
                    : Number(valor_total),
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