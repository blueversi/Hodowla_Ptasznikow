const db = require('../../config/mysql2/db');
const feedingSchema = require('../../model/joi/Feeding');

exports.getFeeding = () => {

    return db.promise().query('SELECT * FROM Feeding')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getFeedings = () => {
    const query = `   
    SELECT feed.id_feeding, feed.Tarantula_id_tarantula, feed.Food_id_food, feed.eaten_food, feed.date, feed.didEat, t.species_name, food.name, food.size
    FROM Feeding feed
    LEFT JOIN Tarantula t on feed.Tarantula_id_tarantula = t.id_tarantula
    LEFT JOIN Food food on feed.Food_id_food = food.id_food
    `
    return db.promise().query(query)
        .then((results, fields) => {
            const feedings = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const feeding = {
                    id_feeding: row.id_feeding,
                    eaten_food: row.eaten_food,
                    date: row.date,
                    didEat: row.didEat,
                    tarantula: {
                        id_tarantula: row.Tarantula_id_tarantula,
                        species_name: row.species_name
                    },
                    food: {
                        id_food: row.Food_id_food,
                        name: row.name,
                        size: row.size
                    }
                };
                feedings.push(feeding);
            }
            console.log(feedings);
            return feedings;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getFeedingById = (feedingId) => {
    const query = `   
    SELECT feed.id_feeding, feed.Tarantula_id_tarantula, feed.Food_id_food,  feed.eaten_food, feed.date, feed.didEat, t.species_name, food.name, food.size
    FROM Feeding feed
    LEFT JOIN Tarantula t on feed.Tarantula_id_tarantula = t.id_tarantula
    LEFT JOIN Food food on feed.Food_id_food = food.id_food
    where feed.id_feeding = ?`

    return db.promise().query(query, [feedingId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return {};
            }
            const feeding = {
                id_feeding: row.id_feeding,
                eaten_food: row.eaten_food,
                date: row.date,
                didEat: row.didEat,
                tarantula: {
                    id_tarantula: row.Tarantula_id_tarantula,
                    species_name: row.species_name
                },
                food: {
                    id_food: row.Food_id_food,
                    name: row.name,
                    size: row.size
                }
            };
            console.log(feeding);
            return feeding;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createFeeding = (newFeedingData) => {
    const vRes = feedingSchema.validate(newFeedingData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    console.log('createFeeding');
    console.log(newFeedingData);

    const sql = 'INSERT into Feeding (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES (?, ?, ?, ?, ?)';
    console.log([newFeedingData.id_tarantula, newFeedingData.id_food, newFeedingData.date, newFeedingData.eaten_food, newFeedingData.didEat]);
    return db.promise().execute(sql, [newFeedingData.id_tarantula, newFeedingData.id_food, newFeedingData.date, newFeedingData.eaten_food, newFeedingData.didEat]);
};

exports.updateFeeding = (feedingId, feedingData) => {
    const vRes = feedingSchema.validate(feedingData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    console.log('updateFeeding');
    console.log(feedingData);

    const sql = `UPDATE Feeding set Tarantula_id_tarantula = ?, Food_id_food = ?, date = ?, eaten_food = ?, didEat = ? where id_feeding = ?`;

    console.log('sql');
    console.log([feedingData.id_tarantula, feedingData.id_food, feedingData.date, feedingData.eaten_food, feedingData.didEat, feedingId]);
    return db.promise().execute(sql, [feedingData.id_tarantula, feedingData.id_food, feedingData.date, feedingData.eaten_food, feedingData.didEat, feedingId]);
}

exports.deleteFeeding = (feedingId) => {
    const sql = 'DELETE FROM Feeding where id_feeding = ?'
    return db.promise().execute(sql, [feedingId]);
}

exports.deleteManyFeedings = (feedingIds) => {
    const sql = 'DELETE FROM Feeding where id_feeding IN (?)'
    return db.promise().execute(sql, [feedingIds]);
}