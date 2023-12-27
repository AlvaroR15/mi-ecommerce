-- creando usuarios de ejemplo
INSERT INTO Users (fullname, email, password, profilePicture) VALUES
('Juan Pérez', 'juan@gmail.com', '01234567', 'perfil1.jpg'),
('María López', 'maria@gmail.com', '89012345', 'perfil2.png'),
('Carlos Rodríguez', 'carlos@outlook.com', '67890123', 'perfil3.jpg'),
('Ana García', 'ana@yahoo.com', '45678901', 'perfil4.png'),
('Luis Martínez', 'luis@outlook.com', '23456789', 'perfil5.png');

-- creando las categorias
INSERT INTO ProductCategories (categoria) VALUES
('remera'),
('campera'),
('pantalon'),
('calzado'),
('accesorio');

-- creando usuarios de ejemplo
INSERT INTO Products (nombreProd, descripcion, precio, talle, idCategoria, imagen) VALUES
('Remera Roja', 'Remera de algodón roja', 6500.00, 'M', 1, 'remera1.jpg'),
('Campera Azul', 'Campera de invierno azul', 8000.00, 'L', 2, 'campera1.jpg'),
('Pantalón Negro', 'Pantalón de vestir negro', 6000.00, '32', 3, 'pantalon1.jpg'),
('Zapatillas Blancas', 'Zapatillas deportivas blancas', 13000.00, '9', 4, 'zapatillas1.jpg'),
('Cadena de Acero', 'Cadena pequeña de acero inoxidable', 1999.99, '30cm', 5, 'cadena1.png');

