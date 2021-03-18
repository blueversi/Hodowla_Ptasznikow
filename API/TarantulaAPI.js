const TarantulaRepository = require('../repository/mysql2/TarantulaRepository');

exports.getTarantula = (req, res, next) => {
    TarantulaRepository.getTarantula().then(tarantulas => {
        res.status(200).json(tarantulas);
    })
        .catch(err => {
            console.log(err);
        });
};

exports.getTarantulaById = (req, res, next) => {
    const t_Id = req.params.tarantulaId;
    TarantulaRepository.getTarantulaById(t_Id)
        .then(tarantula => {
            if (!tarantula) {
                res.status(404).json({
                    message: 'Tarantula with id: ' + t_Id + ' not found'
                })
            } else {
                res.status(200).json(tarantula);
            }
        });
};

exports.createTarantula = (req, res, next) => {
    TarantulaRepository.createTarantula(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateTarantula = (req, res, next) => {
    const tarantulaId = req.params.tarantulaId;
    TarantulaRepository.updateTarantula(tarantulaId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Tarantula updated!', tarantula: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTarantula = (req, res, next) => {
    const tarantulaId = req.params.tarantulaId;
    TarantulaRepository.deleteTarantula(tarantulaId)
        .then(result => {
            res.status(200).json({ message: 'Removed tarantula', tarantula: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};