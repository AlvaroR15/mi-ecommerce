-- creando la base de datos y colocándose en ella para trabajar
CREATE DATABASE IF NOT EXISTS `uptown_urban_db`;
USE `uptown_urban_db`;

-- creando las tablas
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fullname` varchar(80) NOT NULL,
  `email` varchar(80) UNIQUE NOT NULL,
  `password` varchar(500) NOT NULL,
  `profilePicture` varchar(900)
);

CREATE TABLE IF NOT EXISTS `Products` (
  `idProd` int PRIMARY KEY AUTO_INCREMENT,
  `nombreProd` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `precio` double NOT NULL,
  `talle` varchar(10) NOT NULL,
  `idCategoria` int NOT NULL,
  `imagen` varchar(900) NOT NULL
);

CREATE TABLE IF NOT EXISTS `UsersProducts` (
  `idUser` int,
  `idProd` int,
  `cantidad` int,
  PRIMARY KEY (`idUser`, `idProd`)
);

CREATE TABLE IF NOT EXISTS `ProductCategories` (
  `idCategoria` int PRIMARY KEY AUTO_INCREMENT,
  `categoria` varchar(50) UNIQUE NOT NULL
);

-- estableciendo las relaciones
ALTER TABLE `Products` ADD FOREIGN KEY (`idCategoria`) REFERENCES `ProductCategories` (`idCategoria`);

ALTER TABLE `UsersProducts` ADD FOREIGN KEY (`idUser`) REFERENCES `Users` (`id`);

ALTER TABLE `UsersProducts` ADD FOREIGN KEY (`idProd`) REFERENCES `Products` (`idProd`);

