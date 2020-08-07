const Prize = require("../models/Prize");
const Category = require("../models/Category");
const obtenerPremio = async(req,res) =>{
  const {id} = req.params;
  const prize = await Prize.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  });

  if(!prize) return res.status(400).json({
    ok: false,
    err: {
      msg: "Premio no registrado"
    }
  });

  res.json({
    ok: true,
    prize
  });

}

const actualizarPremio = async(req,res) => {
  console.log("actualizando")
  const {id} = req.params;
  const data = req.body;
  const category = await Category.findOne({name: data.category});
  data.category = category._id;
  const prize = await Prize.findByIdAndUpdate(id,data,{new: true, runValidators: true}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!prize) return res.status(400).json({
    ok: false,
    err: {
      msg: "Premio no registrado"
    }
  });

  res.json({
    ok: true,
    prize
  });
}

