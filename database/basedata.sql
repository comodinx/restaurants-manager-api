# ================================================================================================
# Database Restaurants Manager API
# ================================================================================================

USE `restaurants`;

# ================================================================================================

# columns
#
# id
# description
#

LOCK TABLES `reservation_statuses` WRITE;
/*!40000 ALTER TABLE `reservation_statuses` DISABLE KEYS */;
INSERT INTO `reservation_statuses` VALUES
  (1, 'reserved'),
  (2, 'confirmed'),
  (3, 'cancelled');
/*!40000 ALTER TABLE `reservation_statuses` ENABLE KEYS */;
UNLOCK TABLES;

# ================================================================================================

# columns
#
# id
# active
# description
# email
# phone
# address
# created_at
# updated_at
#

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES
  (1, 1, 'Italian Corner', 'reservas@italiancorner.com', NULL, 'Chau. de Bruxelles 351, 6042 Charleroi, Tigre, Argentina', NOW(), NULL),
  (2, 1, 'Kansas', 'contact@kansas.com', '555-5678', 'Avenida de la Libertad 123, San Isidro, Argentina', NOW(), NULL),
  (3, 1, 'Taco Box', 'contact@tacobox.com', '555-1234', 'Calle de las Flores 45, Vicente Lopez, Argentina', NOW(), NULL),
  (4, 1, 'CampoBravo', 'contact@campobravo.com', '555-4321', 'Plaza Mayor 67, CABA, Argentina', NOW(), NULL),
  (5, 1, 'Pope', 'contact@pope.com', '555-8765', 'Avenida Central 89, Pilar, Argentina', NOW(), NULL),
  (6, 1, 'Casa Blanca', 'contact@casablanca.com', '555-5678', 'Calle Principal 101, CABA, Argentina', NOW(), NULL);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

# ================================================================================================

# columns
#
# id
# restaurant_id
# capacity
# observations
# created_at
# updated_at
#

LOCK TABLES `restaurant_tables` WRITE;
/*!40000 ALTER TABLE `restaurant_tables` DISABLE KEYS */;
INSERT INTO `restaurant_tables` VALUES
  -- Italian Corner
  (NULL, 1, 2, 'Mesa cuadrada', NOW(), NULL),
  (NULL, 1, 2, 'Mesa cuadrada', NOW(), NULL),
  (NULL, 1, 4, 'Mesa rectangular', NOW(), NULL),
  (NULL, 1, 4, 'Mesa rectangular', NOW(), NULL),
  (NULL, 1, 6, 'Mesa redonda', NOW(), NULL),
  -- Kansas
  (NULL, 2, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 2, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 2, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 2, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 2, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 2, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 2, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 2, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 2, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 2, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 2, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 2, 12, 'Mesa extra grande', NOW(), NULL),
  (NULL, 2, 12, 'Mesa extra grande', NOW(), NULL),
  -- Taco Box
  (NULL, 3, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 3, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 3, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 3, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 3, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 3, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 3, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 3, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 3, 8, 'Mesa muy grande', NOW(), NULL),
  -- CampoBravo
  (NULL, 4, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 4, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 4, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 4, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 4, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 4, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 4, 12, 'Mesa extra grande', NOW(), NULL),
  -- Pope
  (NULL, 5, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 5, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 5, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 5, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 5, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 5, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 5, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 5, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 5, 8, 'Mesa muy grande', NOW(), NULL),
  -- Casa Blanca
  (NULL, 6, 2, 'Mesa pequeña', NOW(), NULL),
  (NULL, 6, 4, 'Mesa mediana', NOW(), NULL),
  (NULL, 6, 6, 'Mesa grande', NOW(), NULL),
  (NULL, 6, 8, 'Mesa muy grande', NOW(), NULL),
  (NULL, 6, 12, 'Mesa extra grande', NOW(), NULL);
/*!40000 ALTER TABLE `restaurant_tables` ENABLE KEYS */;
UNLOCK TABLES;
