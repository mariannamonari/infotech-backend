interface MovimentacaoDTO {
    id_produto: number;
    id_movimentacao_origem?: number | null;
    tipo: string;
    motivo: string;
    quantidade: number;
    preco_unitario_praticado?: number | null;
    valor_total?: number | null;
    observacao: string;
}

export default MovimentacaoDTO;