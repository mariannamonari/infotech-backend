import { Router } from "express";
import CategoriaController from "./controller/CategoriaController";
import MovimentacaoController from "./controller/MovimentacaoController";
import ProdutoController from "./controller/ProdutoController";

const router = Router();

// Listar todos os produtos
router.get(
    "/produtos",
    ProdutoController.listarProdutos
);

// Buscar um produto pelo ID
router.get(
    "/produtos/:id",
    ProdutoController.buscarProduto
);

// Cadastrar um novo produto
router.post(
    "/produtos",
    ProdutoController.cadastrarProduto
);

// Listar produtos que precisam de reposição
router.get(
    "/produtos/reposicao",
    ProdutoController.listarProdutosReposicao
);

// Listar todas as categorias
router.get(
    "/categorias",
    CategoriaController.listarCategorias
);

// Buscar uma categoria pelo ID
router.get(
    "/categorias/:id",
    CategoriaController.buscarCategoria
);

// Cadastrar uma nova categoria
router.post(
    "/categorias",
    CategoriaController.cadastrarCategoria
);

// Listar todas as movimentações
router.get(
    "/movimentacoes",
    MovimentacaoController.listarMovimentacoes
);

// Buscar uma movimentação pelo ID
router.get(
    "/movimentacoes/:id",
    MovimentacaoController.buscarMovimentacao
);

// Cadastrar uma nova movimentação
router.post(
    "/movimentacoes",
    MovimentacaoController.cadastrarMovimentacao
);

export default router;