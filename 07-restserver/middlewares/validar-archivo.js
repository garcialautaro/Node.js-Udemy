const { request, response } = require("express")

const validarUndefined = (req= request, res = response, next) => { 

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {

        return res.status(400).json({
            msg: 'No se seleccionÃ³ ningun archivo.'
        });
        
    }
    next();

}

module.exports = {
    validarUndefined
}