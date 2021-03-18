
const tarantulaRepository = require('../repository/mysql2/tarantulaRepository');


exports.showTarantulaList = (req, res, next) => {
    tarantulaRepository.getTarantula()
        .then(tarantulas => {
            res.render('pages/tarantula/tarantulaList', {
                tarantulas: tarantulas,
                navLocation: 'tarantula'
            });
        });
}

exports.showTarantula = (req, res, next) => {
    const tarantulaId = req.params.tarantulaId;
    tarantulaRepository.getTarantulaById(tarantulaId)
        .then(tarantula => {
            res.render('pages/tarantula/tarantulaDetails', {
                tarantula: tarantula,
                navLocation: 'tarantula'
            });
        });

}

exports.showAddTarantula = (req, res, next) => {
    res.render('pages/tarantula/form', {
        tarantula: {},
        pageTitle: 'Dodawanie nowego ptasznika',
        formMode: 'createNew',
        btnLabel: 'Dodaj ptasznika',
        formAction: '/tarantula/add',
        navLocation: 'tarantula',
        validation: 'off',
        validationErrors: []
    });
}


exports.showEditTarantula = (req, res, next) => {
    const tarantulaId = req.params.tarantulaId;
    tarantulaRepository.getTarantulaById(tarantulaId)
        .then(tarantula => {
            res.render('pages/tarantula/form', {
                tarantula: tarantula,
                formMode: 'edit',
                pageTitle: 'Edycja ptasznika',
                btnLabel: 'Edytuj ptasznika',
                formAction: '/tarantula/edit',
                navLocation: 'tarantula',
                validation: 'off',
                validationErrors: []
            });
        });
}

exports.addTarantula = (req, res, next) => {
    const tarantulaData = { ...req.body };
    console.log(tarantulaData);
    console.log(tarantulaData.birthDate);
    tarantulaRepository.createTarantula(tarantulaData)
        .then(result => {
            res.redirect('/tarantula');
        }).catch(err => {
            res.render('pages/tarantula/form', {
                tarantula: tarantulaData,
                pageTitle: 'Dodawanie nowego ptasznika',
                formMode: 'createNew',
                btnLabel: 'Dodaj ptasznika',
                formAction: '/tarantula/add',
                navLocation: 'tarantula',
                validation: 'on',
                validationErrors: err.details
            });
        });
};

exports.updateTarantula = (req, res, next) => {
    const tarantulaId = req.body.id;
    const tarantulaData = { ...req.body };
    tarantulaRepository.updateTarantula(tarantulaId, tarantulaData)
        .then(result => {
            res.redirect('/tarantula');
        }).catch(err => {
            console.log('UWAGA UWAGA UWAGA UWAGA UWAGA ');
            console.log(tarantulaData);
            console.log('UWAGA UWAGA UWAGA UWAGA UWAGA ');
            res.render('pages/tarantula/form', {
                tarantula: tarantulaData,
                formMode: 'edit',
                pageTitle: 'Edycja ptasznika',
                btnLabel: 'Edytuj ptasznika',
                formAction: '/tarantula/edit',
                navLocation: 'tarantula',
                validation: 'on',
                validationErrors: err.details
            });
        });
};

exports.deleteTarantula = (req, res, next) => {
    const tarantulaId = req.params.tarantulaId;
    tarantulaRepository.deleteTarantula(tarantulaId)
        .then(() => {
            res.redirect('/tarantula');
        });
};