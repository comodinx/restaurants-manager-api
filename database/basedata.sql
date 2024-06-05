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
  (1, 1, 'Italian Corner', 'reservas@italiancorner.com', NULL, 'Chau. de Bruxelles 351, 6042 Charleroi, Bélgica', NOW(), NULL);
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
  (NULL, 1, 2, 'ala norte A. mesa cuadrada', NOW(), NULL),
  (NULL, 1, 2, 'ala norte B. mesa cuadrada', NOW(), NULL),
  (NULL, 1, 4, 'ala norte este A. mesa rectangular', NOW(), NULL),
  (NULL, 1, 4, 'ala norte este B. mesa rectangular', NOW(), NULL),
  (NULL, 1, 6, 'ala central. mesa redonda', NOW(), NULL);
/*!40000 ALTER TABLE `restaurant_tables` ENABLE KEYS */;
UNLOCK TABLES;
