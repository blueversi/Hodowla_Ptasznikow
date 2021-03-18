
const feedingRepository = require('../repository/mysql2/feedingRepository');
const tarantulaRepository = require('../repository/mysql2/tarantulaRepository');
const foodRepository = require('../repository/mysql2/foodRepository');

exports.showFeedingList = (req, res, next) => {
    feedingRepository.getFeedings()
        .then(feedings => {
            res.render('pages/feeding/feedingList', {
                feedings: feedings,
                navLocation: 'feeding'
            });
        });
}

exports.showFeeding = (req, res, next) => {
    const feedingId = req.params.feedingId;
    feedingRepository.getFeedingById(feedingId)
        .then(feeding => {
            res.render('pages/feeding/feedingDetails', {
                feeding: feeding,
                navLocation: 'feeding'
            });
        });
}

exports.showAddFeeding = (req, res, next) => {

    let allTarnatulas, allFoods;
    tarantulaRepository.getTarantula()
        .then(tarantulas => {
            allTarnatulas = tarantulas;
            return foodRepository.getFood();
        })
        .then(foods => {
            allFoods = foods;
            res.render('pages/feeding/form', {
                feeding: {},
                formMode: 'createNew',
                allTarnatulas: allTarnatulas,
                allFoods: allFoods,
                pageTitle: 'Dodawanie nowego karmienia',
                btnLabel: 'Dodaj karmienie',
                formAction: '/feeding/add',
                navLocation: 'feeding',
                validation: 'off',
                validationErrors: []
            });
        });
}

exports.showEditFeeding = (req, res, next) => {
    const feedingId = req.params.feedingId;
    let allTarnatulas, allFoods;
    tarantulaRepository.getTarantula()
        .then(tarantulas => {
            allTarnatulas = tarantulas;
            return foodRepository.getFood();
        })
        .then(foods => {
            allFoods = foods;
            return feedingRepository.getFeedingById(feedingId);
        }).then(feeding => {
            res.render('pages/feeding/form', {
                feeding: feeding,
                formMode: 'edit',
                allTarnatulas: allTarnatulas,
                allFoods: allFoods,
                pageTitle: 'Edytowanie karmienia',
                btnLabel: 'Edytuj karmienie',
                formAction: '/feeding/edit',
                navLocation: 'feeding',
                validation: 'off',
                validationErrors: []
            });
        });

}

exports.addFeeding = (req, res, next) => {
    let allTarnatulas, allFoods, errDetails;
    const feedingData = { ...req.body };
    feedingRepository.createFeeding(feedingData)
        .then(result => {
            res.redirect('/feeding');
        }).catch(err => {
            errDetails = err.details;
            return tarantulaRepository.getTarantula()
        })
        .then(tarantulas => {
            allTarnatulas = tarantulas;
            return foodRepository.getFood();
        })
        .then(foods => {
            allFoods = foods;
            res.render('pages/feeding/form', {
                feeding: feedingData,
                formMode: 'createNew',
                allTarnatulas: allTarnatulas,
                allFoods: allFoods,
                pageTitle: 'Dodawanie nowego karmienia',
                btnLabel: 'Dodaj karmienie',
                formAction: '/feeding/add',
                navLocation: 'feeding',
                validation: 'on',
                validationErrors: errDetails
            });
        });
};

exports.updateFeeding = (req, res, next) => {
    let allTarnatulas, allFoods, errDetails;
    const feedingId = req.body.id;
    const feedingData = { ...req.body };
    feedingRepository.updateFeeding(feedingId, feedingData)
        .then(result => {
            res.redirect('/feeding');
        }).catch(err => {
            errDetails = err.details;
            return tarantulaRepository.getTarantula()
        })
        .then(tarantulas => {
            allTarnatulas = tarantulas;
            console.log('d--------------------------------------------------------------------d');
            console.log(allTarnatulas);
            return foodRepository.getFood();
        })
        .then(foods => {
            allFoods = foods;
            console.log('d--------------------------------------------------------------------d');
            console.log(allFoods);
            console.log('d--------------------------------------------------------------------d');
            console.log(feedingData);
            res.render('pages/feeding/form', {
                feeding: feedingData,
                formMode: 'edit',
                allTarnatulas: allTarnatulas,
                allFoods: allFoods,
                pageTitle: 'Edytowanie karmienia',
                btnLabel: 'Edytuj karmienie',
                formAction: '/feeding/edit',
                navLocation: 'feeding',
                validation: 'on',
                validationErrors: errDetails
            });
        });
};

exports.deleteFeeding = (req, res, next) => {
    const feedingId = req.params.feedingId;
    feedingRepository.deleteFeeding(feedingId)
        .then(() => {
            res.redirect('/feeding');
        });
};