const FoodRepository = require('../repository/mysql2/FoodRepository');

exports.getFood = (req, res, next) => {
    FoodRepository.getFood().then(foods => {
        res.status(200).json(foods);
    })
        .catch(err => {
            console.log(err);
        });
};

exports.getFoodById = (req, res, next) => {
    const t_Id = req.params.foodId;
    FoodRepository.getFoodById(t_Id)
        .then(food => {
            if (!food) {
                res.status(404).json({
                    message: 'Food with id: ' + t_Id + ' not found'
                })
            } else {
                res.status(200).json(food);
            }
        });
};

exports.createFood = (req, res, next) => {
    FoodRepository.createFood(req.body)
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

exports.updateFood = (req, res, next) => {
    const foodId = req.params.foodId;
    FoodRepository.updateFood(foodId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Food updated!', food: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteFood = (req, res, next) => {
    const foodId = req.params.foodId;
    FoodRepository.deleteFood(foodId)
        .then(result => {
            res.status(200).json({ message: 'Removed food', food: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};