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

