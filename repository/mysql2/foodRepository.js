const db = require('../../config/mysql2/db');
const foodSchema = require('../../model/joi/Food');


exports.getFood = () => {

    return db.promise().query('SELECT * FROM Food')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getFoodById = (foodId) => {
    const query = `
    SELECT f.id_food, f.name, f.protein_content, f.fat_content, f.carbs_content, f.size,
        feed.id_feeding, feed.Tarantula_id_tarantula, feed.Food_id_food, feed.eaten_food, feed.date, feed.didEat,
        t.species_name
    	FROM Food f
        LEFT JOIN Feeding feed on feed.Food_id_food = f.id_food
        LEFT JOIN Tarantula t on t.id_tarantula = feed.Tarantula_id_tarantula
        where f.id_food = ?`
    return db.promise().query(query, [foodId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const food = {
                id_food: parseInt(foodId),
                name: firstRow.name,
                protein_content: firstRow.protein_content,
                fat_content: firstRow.fat_content,
                carbs_content: firstRow.carbs_content,
                size: firstRow.size,
                feedings: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                console.log(row.Food_id_food);
                if (row.Food_id_food) {
                    const feeding = {
                        id_feeding: row.id_feeding,
                        eaten_food: row.eaten_food,
                        date: row.date,
                        didEat: row.didEat,
                        tarantula: {
                            species_name: row.species_name,
                        }
                    };
                    food.feedings.push(feeding);
                }
            }
            console.log(food);
            return food;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createFood = (newFoodData) => {

    const vRes = foodSchema.validate(newFoodData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    console.log('createFood');
    console.log(newFoodData);
    const sql = 'INSERT into Food (name, protein_content, fat_content, carbs_content, size) VALUES (?, ?, ?, ?, ?)';

    return db.promise().execute(sql, [newFoodData.name, newFoodData.protein_content, newFoodData.fat_content, newFoodData.carbs_content, newFoodData.size]);

};

exports.updateFood = (foodId, foodData) => {

    const vRes = foodSchema.validate(foodData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    console.log('updateFood');
    console.log(foodData);
    const sql = `UPDATE Food set name = ?, protein_content = ?, fat_content = ?, carbs_content = ?, size= ? where id_food = ?`;

    return db.promise().execute(sql, [foodData.name, foodData.protein_content, foodData.fat_content, foodData.carbs_content, foodData.size, foodId]);

};

exports.deleteFood = (foodId) => {

    const sql1 = 'DELETE FROM Feeding where Food_id_food = ?'
    const sql2 = 'DELETE FROM Food where id_food = ?'

    return db.promise().execute(sql1, [foodId])
        .then(() => {
            return db.promise().execute(sql2, [foodId])
        });
};