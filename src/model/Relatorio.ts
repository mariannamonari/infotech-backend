import { pool } from "./DatabaseModel";

class Relatorio {
    static async obterEstoque() {
        const [resumo, produtosParaReposicao] = await Promise.all([
            pool.query(`
                SELECT
                    COUNT(*) FILTER (WHERE ativo = true)::int AS total_produtos_ativos,
                    COALESCE(SUM(quantidade_disponivel) FILTER (WHERE ativo = true), 0)::int AS total_itens_estoque,
                    COALESCE(SUM(quantidade_disponivel * preco_unitario) FILTER (WHERE ativo = true), 0) AS valor_total_estoque,
                    COUNT(*) FILTER (
                        WHERE ativo = true
                          AND quantidade_disponivel <= quantidade_minima
                    )::int AS total_produtos_para_reposicao
                FROM produto
            `),
            pool.query(`
                SELECT
                    id_produto,
                    id_categoria,
                    codigo,
                    nome,
                    quantidade_disponivel,
                    quantidade_minima
                FROM produto
                WHERE ativo = true
                  AND quantidade_disponivel <= quantidade_minima
                ORDER BY nome
            `)
        ]);

        return {
            resumo: resumo.rows[0],
            produtos_para_reposicao: produtosParaReposicao.rows
        };
    }
}

export default Relatorio;
