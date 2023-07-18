const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class CartsController {
  async create(request, response) {
      // Obtém os itens do carrinho a partir do corpo da requisição
    const { cart_items } = request.body;
    const user_id = request.user.id;

      // Insere um novo registro na tabela "carts" e retorna o ID gerado
    const [cart_id] = await knex("carts").insert({
      created_by: user_id,
    });

    // Mapeia os itens do carrinho para o formato desejado na tabela "cart_items"
    const itemsInsert = cart_items.map(async ({ dish_id, name, quantity }) => {
      return {
        cart_id,
        dish_id,
        name,
        quantity,
      };
    });

    // Insere os itens do carrinho na tabela "cart_items" utilizando Promise.all para esperar todas as inserções concluírem
    await knex("cart_items").insert(await Promise.all(itemsInsert));

    return response.json({ id: cart_id });
  }

  async show(request, response) {
    const { id } = request.params;

    const cart = await knex("carts").where({ id }).first();
    const cart_items = await knex("cart_items").where({ cart_id: id });


      // Retorna o carrinho e seus itens como resposta em formato JSON
    return response.json({
      ...cart,
      cart_items,
    });
  }

  async update(request, response) { 
    const { id } = request.params;
    const { cart_items } = request.body;

    const cart = await knex("carts").where({ id }).first();

    if (!cart) {
      throw new AppError("Carrinho não encontrado.", 404);
    }

      // Atualiza a data de atualização do carrinho
    const cartUpdate = {
      updated_at: knex.fn.now(),
    };
  
    const existingItems = await knex("cart_items")
      .where({ cart_id: id })
      .select("dish_id");
  
    const updatedItems = cart_items.map(({ dish_id, name, quantity }) => {
      if (existingItems.some((item) => item.dish_id === dish_id)) 
      // Verifica se o item já existe na tabela "cart_items" com base no dish_id
    // Se existir, realiza o update na quantidade do item
      {
        return knex("cart_items")
          .where({ cart_id: id, dish_id })
          .update({ quantity });
      } else {
        return knex("cart_items").insert({
          cart_id: id,
          dish_id,
          name,
          quantity,
        });
      }
    });

    // Executa as atualizações e inserções na tabela "cart_items"
    await Promise.all(updatedItems);
    await knex("carts").where({ id }).update(cartUpdate);

    return response.json();
  }    

  async index(request, response) {
    const user_id = request.user.id;

    const carts = await knex("carts")
      .select("id", "created_at")
      .where({ created_by: user_id })
      .orderBy("created_at", "desc");

    return response.json(carts);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("cart_items").where({ cart_id: id }).delete();
    await knex("carts").where({ id }).delete();

    return response.json();
  }
}

module.exports = CartsController;