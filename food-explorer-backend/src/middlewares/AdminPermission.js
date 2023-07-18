const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function AdminPermission(request, response, next) {
  const user_id = request.user.id;

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.is_admin) {
    throw new AppError("Apenas usuários com a função de adm  podem realizar esta ação.", 403);
  }

  return next();
}

module.exports = AdminPermission;
