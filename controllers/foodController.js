
const foodRepository = require('../repository/mysql2/foodRepository');


exports.showFoodList = (req, res, next) => {
    foodRepository.getFood()
        .then(foods => {
            res.render('pages/food/foodList', {
                foods: foods,
                navLocation: 'food'
            });
        });
}

exports.showFood = (req, res, next) => {
    const foodId = req.params.foodId;
    foodRepository.getFoodById(foodId)
        .then(food => {
            res.render('pages/food/foodDetails', {
                food: food,
                navLocation: 'food'
            });
        });
}

exports.showAddFood = (req, res, next) => {
    res.render('pages/food/form', {
        food: {},
        pageTitle: 'Dodawanie nowego pokarmu',
        formMode: 'createNew',
        btnLabel: 'Dodaj pokarm',
        formAction: '/food/add',
        navLocation: 'food',
        validation: 'off',
        validationErrors: []
    });
}


exports.showEditFood = (req, res, next) => {
    const foodId = req.params.foodId;
    foodRepository.getFoodById(foodId)
        .then(food => {
            res.render('pages/food/form', {
                food: food,
                formMode: 'edit',
                pageTitle: 'Edycja pokarmu',
                btnLabel: 'Edytuj pokarm',
                formAction: '/food/edit',
                navLocation: 'food',
                validation: 'off',
                validationErrors: []
            });
        });
}


exports.addFood = (req, res, next) => {
    const foodData = { ...req.body };
    foodRepository.createFood(foodData)
        .then(result => {
            res.redirect('/food');
        }).catch(err => {
            res.render('pages/food/form', {
                food: foodData,
                pageTitle: 'Dodawanie nowego pokarmu',
                formMode: 'createNew',
                btnLabel: 'Dodaj pokarm',
                formAction: '/food/add',
                navLocation: 'food',
                validation: 'on',
                validationErrors: err.details
            });
        });
};

exports.updateFood = (req, res, next) => {
    const foodId = req.body.id;
    const foodData = { ...req.body };
    foodRepository.updateFood(foodId, foodData)
        .then(result => {
            res.redirect('/food');
        }).catch(err => {
            res.render('pages/food/form', {
                food: foodData,
                formMode: 'edit',
                pageTitle: 'Edycja pokarmu',
                btnLabel: 'Edytuj pokarm',
                formAction: '/food/edit',
                navLocation: 'food',
                validation: 'on',
                validationErrors: err.details
            });
        });
};

exports.deleteFood = (req, res, next) => {
    const foodId = req.params.foodId;
    foodRepository.deleteFood(foodId)
        .then(() => {
            res.redirect('/food');
        });
};