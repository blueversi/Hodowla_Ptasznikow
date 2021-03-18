-- db
CREATE SCHEMA IF NOT EXISTS `tin-s18311`;

-- tables

-- Table: Tarantula
CREATE TABLE IF NOT EXISTS `tin-s18311`.`Tarantula`(
    id_tarantula int NOT NULL AUTO_INCREMENT,
    species_name varchar(300) NOT NULL,
    stadium int NOT NULL,
    gender varchar(10) NOT NULL,
    CITES boolean NOT NULL,
    birthdate date NOT NULL,
    CONSTRAINT Tarantula_pk PRIMARY KEY (id_tarantula)
);

-- Table: Food
CREATE TABLE IF NOT EXISTS `tin-s18311`.`Food`(
    id_food int NOT NULL AUTO_INCREMENT,
    name varchar(300) NOT NULL,
    protein_content double NOT NULL,
    fat_content double NOT NULL,
    carbs_content double NOT NULL,
    size varchar(25) NOT NULL,
    CONSTRAINT Food_pk PRIMARY KEY (id_food)
);




-- Table: Feeding
CREATE TABLE IF NOT EXISTS `tin-s18311`.`Feeding`(
    id_feeding int NOT NULL AUTO_INCREMENT,
    Tarantula_id_tarantula int NOT NULL,
    Food_id_food int NOT NULL,
    date date NOT NULL,
    eaten_food int NOT NULL,
    didEat boolean NOT NULL,
    CONSTRAINT id_feeding PRIMARY KEY (id_feeding,Tarantula_id_tarantula,Food_id_food)
);




-- foreign keys
-- Reference: Feeding_Food (table: Feeding)
ALTER TABLE `tin-s18311`.`Feeding` ADD CONSTRAINT Feeding_Food FOREIGN KEY Feeding_Food (Food_id_food)
    REFERENCES Food (id_food);

-- Reference: Feeding_Tarantula (table: Feeding)
ALTER TABLE `tin-s18311`.`Feeding` ADD CONSTRAINT Feeding_Tarantula FOREIGN KEY Feeding_Tarantula (Tarantula_id_tarantula)
    REFERENCES Tarantula (id_tarantula);

-- Inserts

-- Inserts Tarantula

INSERT INTO `tin-s18311`.`Tarantula` (species_name, stadium, gender, CITES, birthdate) VALUES ( "Brachypelma Hamorii", "8", "Female", true, '2017-12-05'); -- id 1
INSERT INTO `tin-s18311`.`Tarantula` (species_name, stadium, gender, CITES, birthdate) VALUES ( "Aphonopelma chalcodes", "15", "Female", false, '2015-01-20'); -- id 2
INSERT INTO `tin-s18311`.`Tarantula` (species_name, stadium, gender, CITES, birthdate) VALUES ( "Avicularia sp. Peru purple", "4", "Male", false, '2020-08-08'); -- id 3
INSERT INTO `tin-s18311`.`Tarantula` (species_name, stadium, gender, CITES, birthdate) VALUES ( "Chilobrachys sp. electric blue", "1", "N/S", false, '2020-12-21'); -- id 4
INSERT INTO `tin-s18311`.`Tarantula` (species_name, stadium, gender, CITES, birthdate) VALUES ( "Poecilotheria metallica", "9", "Male", True, '2019-10-03'); -- id 5

-- Inserts Food

INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Karaczan Turecki", 60, 20, 20, 'Wylęg'); 	-- id 1
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Karaczan Turecki", 65, 20, 15, 'Sub-Imago'); -- id 2
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Karaczan Turecki", 70, 20, 10, 'Imago'); -- id 3

INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Mącznik Młynarek", 15, 70, 15, 'Wylęg'); -- id 4
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Mącznik Młynarek", 10, 80, 10, 'Sub-Imago'); -- id 5
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Mącznik Młynarek", 5, 90, 5, 'Imago'); -- id 6

INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Świerszcz Bananowy", 20, 30, 50, 'Wylęg'); -- id 7
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Świerszcz Bananowy", 20, 20, 60, 'Sub-Imago'); -- id 8
INSERT INTO `tin-s18311`.`Food` (name, protein_content, fat_content, carbs_content, size) VALUES ( "Świerszcz Bananowy", 25, 15, 60, 'Imago'); -- id 9

-- Inserts Feeding

INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 1, 2, '2020-11-21', 5, true ); 	-- id 1
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 2, 3, '2020-11-25', 3, true ); 	-- id 2
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 3, 2, '2020-11-29', 0, false ); 	-- id 3
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 4, 7, '2020-11-30', 1, true ); 	-- id 4
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 5, 6, '2020-12-02', 3, true ); 	-- id 5
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 2, 5, '2020-12-05', 0, false ); 	-- id 6
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 2, 8, '2020-12-06', 2, true ); 	-- id 7
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 1, 9, '2020-12-10', 6, true ); 	-- id 8
INSERT INTO `tin-s18311`.`Feeding` (Tarantula_id_tarantula, Food_id_food, date, eaten_food, didEat) VALUES ( 3, 5, '2020-12-15', 0, false ); 	-- id 9

