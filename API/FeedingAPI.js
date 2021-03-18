const FeedingRepository = require('../repository/mysql2/FeedingRepository');

exports.getFeeding = (req, res, next) => {
    FeedingRepository.getFeedings().then(feedings => {
        res.status(200).json(feedings);
    })
        .catch(err => {
            console.log(err);
        });
};

exports.getFeedingById = (req, res, next) => {
    const f_Id = req.params.feedingId;
    FeedingRepository.getFeedingById(f_Id)
        .then(feeding => {
            if (!feeding) {
                res.status(404).json({
                    message: 'Feeding with id: ' + f_Id + ' not found'
                })
            } else {
                res.status(200).json(feeding);
            }
        });
};

exports.createFeeding = (req, res, next) => {
    FeedingRepository.createFeeding(req.body)
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

exports.updateFeeding = (req, res, next) => {
    const feedingId = req.params.feedingId;
    FeedingRepository.updateFeeding(feedingId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Feeding updated!', feeding: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteFeeding = (req, res, next) => {
    const feedingId = req.params.feedingId;
    FeedingRepository.deleteFeeding(feedingId)
        .then(result => {
            res.status(200).json({ message: 'Removed feeding', feeding: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};