const Category = require('../models/Category');
//Registrar Categoria
const registrarCategoria = async(req,res) => {
  const data = req.body;
  console.log("hola categoey")
  console.log(data)
  const category = new Category(data);
  await category.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  })

  res.json({
    ok: true,
    category
  });
}

const obtenerCategorias = async(req,res) =>{
  const categories = await Category.find()
    .sort('name');

  if(!categories) return res.status(400).json({
    ok: false,
    err: {
      msg: "No hay categorias registradas"
    }
  });

  res.json({
    ok: true,
    categories
  });
}
module.exports = {
  registrarCategoria,
  obtenerCategorias
}