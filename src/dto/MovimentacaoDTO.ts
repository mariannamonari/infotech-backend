interface MovimentacaoDTO {
    id_produto: number | string;
    id_movimentacao_origem?: number | string | null;
    tipo: string;
    motivo: string;
    quantidade: number | string;
    preco_unitario_praticado?: number | string | null;
    valor_total?: number | string | null;
    observacao: string;
}

export default MovimentacaoDTO;