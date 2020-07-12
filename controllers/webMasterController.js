const WebMaster = require('../models/WebMaster');

const registrerWebMaster = async (req,res) => {
  console.log(req.body);
  const master = new WebMaster(req.body);
  try {
    await master.save();
    res.json({
      ok: true,
      mag: 'webMaster registrado'
    })
  } catch (error) {
    res.json({
      ok: false,
      err: error
    })
  }
}

module.exports = {
  registrerWebMaster
}