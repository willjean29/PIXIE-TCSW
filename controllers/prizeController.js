const Prize = require("../models/Prize");

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
module.exports = {
  obtenerPremio
}