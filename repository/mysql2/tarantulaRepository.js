const db = require('../../config/mysql2/db');
const tarantulaSchema = require('../../model/joi/Tarantula');

exports.getTarantula = () => {

    return db.promise().query('SELECT * FROM Tarantula')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getTarantulaById = (tarantulaId) => {
    const query = `
    SELECT t.id_tarantula, t.species_name, t.stadium, t.gender, t.CITES, t.birthdate, 
        feed.id_feeding, feed.Tarantula_id_tarantula, feed.Food_id_food, feed.eaten_food, feed.date, feed.didEat, 
        food.name, food.size 
        FROM Tarantula t 
        LEFT JOIN Feeding feed on feed.Tarantula_id_tarantula = t.id_tarantula
        LEFT JOIN Food food on feed.Food_id_food = food.id_food
        where t.id_tarantula = ?`
    return db.promise().query(query, [tarantulaId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const tarantula = {
                id_tarantula: parseInt(tarantulaId),
                species_name: firstRow.species_name,
                stadium: firstRow.stadium,
                gender: firstRow.gender,
                CITES: firstRow.CITES,
                birthdate: firstRow.birthdate,
                feedings: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.Tarantula_id_tarantula) {
                    const feeding = {
                        id_feeding: row.id_feeding,
                        eaten_food: row.eaten_food,
                        date: row.date,
                        didEat: row.didEat,
                        food: {
                            name: row.name,
                            size: row.size
                        }
                    };
                    tarantula.feedings.push(feeding);
                }
            }
            console.log(tarantula);
            return tarantula;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createTarantula = (newTarantulaData) => {
    const vRes = tarantulaSchema.validate(newTarantulaData, { abortEarly: false });
    if (vRes.error) {
        console.log(vRes.error);
        return Promise.reject(vRes.error);
    }
    console.log('createTarantula');
    console.log(newTarantulaData);
    const sql = 'INSERT into Tarantula (species_name, gender, birthdate, stadium, CITES ) VALUES (?, ?, ?, ?, ?)';
    console.log(sql);

    console.log([newTarantulaData.species_name, newTarantulaData.gender, newTarantulaData.birthdate, newTarantulaData.stadium, newTarantulaData.CITES,]);
    try {
        return db.promise().execute(sql, [newTarantulaData.species_name, newTarantulaData.gender, newTarantulaData.birthDate, newTarantulaData.stadium, newTarantulaData.CITES,]);
    } catch (e) {
        console.log(e);
    }
};

exports.updateTarantula = (tarantulaId, tarantulaData) => {
    const vRes = tarantulaSchema.validate(tarantulaData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    console.log('updateTarantula');
    console.log(tarantulaData);
    const sql = `UPDATE Tarantula set species_name = ?, gender = ?, stadium = ?, birthdate= ?, CITES = ? WHERE id_tarantula = ?`;
    console.log(sql);
    console.log([tarantulaData.species_name, tarantulaData.gender, tarantulaData.stadium, tarantulaData.birthDate, tarantulaData.CITES, tarantulaId]);
    return db.promise().execute(sql, [tarantulaData.species_name, tarantulaData.gender, tarantulaData.stadium, tarantulaData.birthDate, tarantulaData.CITES, tarantulaId]);

};

exports.deleteTarantula = (tarantulaId) => {

    const sql1 = 'DELETE FROM Feeding where Tarantula_id_tarantula = ?'
    const sql2 = 'DELETE FROM Tarantula where id_tarantula = ?'
    console.log(sql1);
    console.log(sql2);
    try {
        return db.promise().execute(sql1, [tarantulaId])
            .then(() => {
                return db.promise().execute(sql2, [tarantulaId])
            });
    } catch (e) {
        console.log(e);
    }

};