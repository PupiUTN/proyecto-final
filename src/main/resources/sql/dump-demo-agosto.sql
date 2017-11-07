-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: 130.211.214.126    Database: pupi
-- ------------------------------------------------------
-- Server version	5.7.14-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calificacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(255) DEFAULT NULL,
  `puntaje` int(11) NOT NULL,
  `reserva_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKilq2qws9a61ybq5j6mday7cvg` (`reserva_id`),
  CONSTRAINT `FKilq2qws9a61ybq5j6mday7cvg` FOREIGN KEY (`reserva_id`) REFERENCES `reserva` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuidador`
--

DROP TABLE IF EXISTS `cuidador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuidador` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad_max_de_perros` int(11) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `precio_por_noche` float NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `tamaño_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3rj0f9g1npir9nss6c400rjt9` (`user_id`),
  KEY `FKl8rourkwax3s2qxy58yg4hk4u` (`tamaño_id`),
  CONSTRAINT `FK3rj0f9g1npir9nss6c400rjt9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKl8rourkwax3s2qxy58yg4hk4u` FOREIGN KEY (`tamaño_id`) REFERENCES `tamaño` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador`
--

LOCK TABLES `cuidador` WRITE;
/*!40000 ALTER TABLE `cuidador` DISABLE KEYS */;
INSERT INTO `cuidador` VALUES (1,1,'Dale la oportunidad a tu mascota de ser feliz y ser cuidado con amor mientras no estas. Siempre he sido amante de los animales, he tenido la posibilidad de cuidar a diferentes perros y poder darles el amor que necesitan y la felicidad necesaria. Tengo diferentes parques cercanos para que tu mascota se divierta.',100,1,3),(2,2,'Excelente cuidador, desde que nací tengo perros y siempre me gusta pasar tiempo con ellos. Considero que se merecen lo mejor por ser el mejor amigo del hombre.',250,3,5),(3,2,'Soy un apasionado de los canes ya que desde mi infancia tuve siempre perros a los cuales cuidar y educar lo que me hizo inclinar y dedicarme al cuidado de ellos de una manera especial siempre buscando su bienestar y que sienta en familia cuando no esta con los suyos. Conmigo tendrá una estadía agradable y divertida, aparte del envio de fotos y videos constantes para que el dueño sepa como la esta pasando. Siempre fui una persona de gran caminar y de buena resistencia por lo cual no tengo dificultades en paseos largos y sobre todo en ejercitarlos.',800,6,2),(4,5,'Cuidar a tu mascota será un placer, lo haremos con todos el amor y todos los cuidados posibles. Somos gente confiable, honesta y buena onda. Recibimos animales pequeños y medianos ya que vivimos en un departamento y quizás para los animales más grandes no sería cómodo. Somos accesibles con los horarios de llegada y salida. Vivimos en el centro histórico, cerca de calles buenas para pasear mascotas y tenemos un pequeño patio. El departamento es seguro y el edificio también, no hay forma de que una mascota pueda escapar sin ser vista por nosotras. Animate a reservar y cuéntanos más de ti y de tu preciad@ compañer@ de vida.',50,2,1);
/*!40000 ALTER TABLE `cuidador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuidador_lista_imagenes`
--

DROP TABLE IF EXISTS `cuidador_lista_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuidador_lista_imagenes` (
  `cuidador_id` bigint(20) NOT NULL,
  `lista_imagenes_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_fb6k1rnm0yjhcuneeq9p9tcmh` (`lista_imagenes_id`),
  KEY `FK8j1p5oynxhh19y4td7f7esb9g` (`cuidador_id`),
  CONSTRAINT `FK8asw84whajx7m6i3oqiiu863p` FOREIGN KEY (`lista_imagenes_id`) REFERENCES `imagen` (`id`),
  CONSTRAINT `FK8j1p5oynxhh19y4td7f7esb9g` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador_lista_imagenes`
--

LOCK TABLES `cuidador_lista_imagenes` WRITE;
/*!40000 ALTER TABLE `cuidador_lista_imagenes` DISABLE KEYS */;
INSERT INTO `cuidador_lista_imagenes` VALUES (1,1),(1,2),(1,3),(1,4),(2,5),(2,6),(2,7),(2,8),(3,9),(3,10),(3,11),(3,12),(4,13),(4,14),(4,15),(4,16);
/*!40000 ALTER TABLE `cuidador_lista_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuidador_lista_servicios`
--

DROP TABLE IF EXISTS `cuidador_lista_servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuidador_lista_servicios` (
  `cuidador_id` bigint(20) NOT NULL,
  `lista_servicios_id` bigint(20) NOT NULL,
  PRIMARY KEY (`cuidador_id`,`lista_servicios_id`),
  KEY `FK9nbxb60cplgy97bwn72ti5tr2` (`lista_servicios_id`),
  CONSTRAINT `FK6wblyncxf484vnfhbcymam7gb` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`),
  CONSTRAINT `FK9nbxb60cplgy97bwn72ti5tr2` FOREIGN KEY (`lista_servicios_id`) REFERENCES `servicio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador_lista_servicios`
--

LOCK TABLES `cuidador_lista_servicios` WRITE;
/*!40000 ALTER TABLE `cuidador_lista_servicios` DISABLE KEYS */;
INSERT INTO `cuidador_lista_servicios` VALUES (1,1),(2,1),(3,1),(1,2),(2,2),(3,2),(1,3),(2,3),(1,4),(3,4),(2,7);
/*!40000 ALTER TABLE `cuidador_lista_servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direccion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `calle` varchar(255) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `ciudad_place_id` varchar(255) NOT NULL,
  `codigo_postal` varchar(255) NOT NULL,
  `direccion_linea1` varchar(255) NOT NULL,
  `direccion_linea2` varchar(255) DEFAULT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `numero` int(11) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `place_id` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
INSERT INTO `direccion` VALUES (1,'Evasio Garrone','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','5000','Evasio Garrone 6971',NULL,-31.3892107,-64.27353249999999,6971,'Argentina','EihFdmFzaW8gR2Fycm9uZSA2OTcxLCBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba'),(2,'Obispo Clara','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','5000','Obispo Clara 235',NULL,-31.3940788,-64.1980058,235,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba'),(3,'Alfredo L. Palacios','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','5016','Alfredo palacios 630 Cordoba',NULL,-31.4475484,-64.1868513,630,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba'),(4,'Alfredo L. Palacios','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','X5016','Alfredo L palacios 630',NULL,-31.4475484,-64.1868513,630,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba'),(5,'Ramón Cárcano','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','5009','Ramón Cárcano 396',NULL,-31.386134,-64.263547,390,'Argentina','ChIJRwrzN4SiMpQRDaLH17nXn10','Córdoba');
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES (1,'/file_upload/imagen_cuidador_1.jpg'),(2,'/file_upload/imagen_cuidador_2.jpg'),(3,'/file_upload/imagen_cuidador_3.jpg'),(4,'/file_upload/imagen_cuidador_4.jpg'),(5,'/file_upload/jorge1.jpg'),(6,'/file_upload/jorge2.jpg'),(7,'/file_upload/jorge3.jpg'),(8,'/file_upload/jorge4.jpg'),(9,'/file_upload/gabi2.jpg'),(10,'/file_upload/gabi3.jpg'),(11,'/file_upload/imagen_cuidador_1.jpg'),(12,'/file_upload/gabi5.jpg'),(13,'/img/perfil-jose/jose-2.jpg'),(14,'/img/perfil-jose/jose-1.jpg'),(15,'/img/perfil-jose/jose-3.jpg'),(16,'/img/perfil-jose/jose-4.jpg');
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owner` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `birthday` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `direccion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perro`
--

DROP TABLE IF EXISTS `perro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perro` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(255) DEFAULT NULL,
  `foto_perfil` tinyblob NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `raza_id` bigint(20) NOT NULL,
  `tamaño_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfhc0d8l84m76cfp9gnm6mcrgl` (`raza_id`),
  KEY `FKpe1o0opup0xr9d7vrg1s2lm4d` (`tamaño_id`),
  KEY `FKphw17c59n4owqc115m8qbdtcm` (`user_id`),
  CONSTRAINT `FKfhc0d8l84m76cfp9gnm6mcrgl` FOREIGN KEY (`raza_id`) REFERENCES `raza` (`id`),
  CONSTRAINT `FKpe1o0opup0xr9d7vrg1s2lm4d` FOREIGN KEY (`tamaño_id`) REFERENCES `tamaño` (`id`),
  CONSTRAINT `FKphw17c59n4owqc115m8qbdtcm` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perro`
--

LOCK TABLES `perro` WRITE;
/*!40000 ALTER TABLE `perro` DISABLE KEYS */;
INSERT INTO `perro` VALUES (1,NULL,'/file_upload/32aa1f10-4723-4576-af17-4b60f0b7fb53.jpg','Cleo',1,1,1,'2017-02-02','Hembra'),(2,NULL,'/img/no-avatar.png','firulai',1,1,1,'',''),(3,NULL,'/img/no-avatar.png','betoben',1,1,1,'',''),(4,NULL,'/img/no-avatar.png','bolt',1,1,1,'',''),(5,NULL,'/file_upload/0a348d46-f0e3-455e-9782-eb96e6a79c40.jpg','Pachi',85,3,1,'24-08-2017','Macho'),(11,NULL,'/file_upload/ad9cdb45-0ada-40f2-b82c-7d439338267d.jpg','Borges',45,4,1,'23-08-2015','Macho'),(12,NULL,'/file_upload/adcdfadb-074e-4a9c-8bc4-904ea0b8e357.jpg','Esteban',63,2,1,'21-03-2015','Macho'),(13,NULL,'/file_upload/86d76335-5398-478f-8bc9-f47acf1c155d.jpg','Fritz',39,4,1,'10-11-2010','Macho'),(17,NULL,'/file_upload/64f7f8d8-90d6-4ecc-a7cb-a6be508d315d.jpg','Clara',15,2,5,'18-08-2017','Hembra');
/*!40000 ALTER TABLE `perro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perro_lista_imagenes`
--

DROP TABLE IF EXISTS `perro_lista_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perro_lista_imagenes` (
  `perro_id` bigint(20) NOT NULL,
  `lista_imagenes_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_bonu8g7nnjado6ppxy1yr4e01` (`lista_imagenes_id`),
  KEY `FK47n7ye5891nnrleec9e8ucban` (`perro_id`),
  CONSTRAINT `FK47n7ye5891nnrleec9e8ucban` FOREIGN KEY (`perro_id`) REFERENCES `perro` (`id`),
  CONSTRAINT `FKmsjdejad4w3ie20ll9v6tclu4` FOREIGN KEY (`lista_imagenes_id`) REFERENCES `imagen` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perro_lista_imagenes`
--

LOCK TABLES `perro_lista_imagenes` WRITE;
/*!40000 ALTER TABLE `perro_lista_imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `perro_lista_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perro_lista_vacunas`
--

DROP TABLE IF EXISTS `perro_lista_vacunas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perro_lista_vacunas` (
  `perro_id` bigint(20) NOT NULL,
  `lista_vacunas_id` bigint(20) NOT NULL,
  KEY `FKrp5qvoveswjpef2rmmoac1m1t` (`lista_vacunas_id`),
  KEY `FKmf4ssqorn68yoqx0h50kuwnji` (`perro_id`),
  CONSTRAINT `FKmf4ssqorn68yoqx0h50kuwnji` FOREIGN KEY (`perro_id`) REFERENCES `perro` (`id`),
  CONSTRAINT `FKrp5qvoveswjpef2rmmoac1m1t` FOREIGN KEY (`lista_vacunas_id`) REFERENCES `vacuna` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perro_lista_vacunas`
--

LOCK TABLES `perro_lista_vacunas` WRITE;
/*!40000 ALTER TABLE `perro_lista_vacunas` DISABLE KEYS */;
INSERT INTO `perro_lista_vacunas` VALUES (11,2),(12,5),(12,6),(12,7),(13,6),(13,5),(13,4),(17,5),(17,3);
/*!40000 ALTER TABLE `perro_lista_vacunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raza`
--

DROP TABLE IF EXISTS `raza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `raza` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raza`
--

LOCK TABLES `raza` WRITE;
/*!40000 ALTER TABLE `raza` DISABLE KEYS */;
INSERT INTO `raza` VALUES (1,'Alano'),(2,'Alaskan Malamute '),(3,'American Staffordshire Terrier '),(4,'American Water Spaniel '),(5,'Antiguo Pastor Inglés'),(6,'Basset Azul de Gaseogne '),(7,'Basset Hound '),(8,'Basset leonado de Bretaña'),(9,'Beagle '),(10,'Bearded Collie '),(11,'Bichón Maltés '),(12,'Bobtail '),(13,'Border Collie '),(14,'Boston Terrier '),(15,'Boxer '),(16,'Bull Terrier '),(17,'Bulldog Americano '),(18,'Bulldog Francés '),(19,'Bulldog Inglés'),(20,'Caniche '),(21,'Carlino'),(22,'Chihuahua'),(23,'Cirneco del Etna'),(24,'Chow Chow '),(25,'Cocker Spaniel Americano '),(26,'Cocker Spaniel Inglés'),(27,'Dálmata '),(28,'Dobermann '),(29,'Dogo Alemán'),(30,'Dogo Argentino'),(31,'Dogo de Burdeos'),(32,'Finlandés'),(33,'Fox Terrier de pelo liso '),(34,'Fox Terrier '),(35,'Foxhound Americano'),(36,'Foxhound Inglés'),(37,'Galgo Afgano '),(38,'Gigante de los Pirineos'),(39,'Golden Retriever '),(40,'Gos d\'Atura '),(41,'Gran Danés'),(42,'Husky Siberiano'),(43,'Laika de Siberia Occidental'),(44,'Laika Ruso-europeo'),(45,'Labrador Retriever'),(46,'Mastín del Pirineo'),(47,'Mastin del Tibet'),(48,'Mastín Español'),(49,'Mastín Napolitano'),(50,'Pastor Alemán'),(51,'Pastor Australiano'),(52,'Pastor Belga '),(53,'Pastor de Brie'),(54,'Pastor de los Pirineos de Cara Rosa '),(55,'Pekinés'),(56,'Perdiguero Chesapeake Bay'),(57,'Perdiguero de Drentse'),(58,'Perdiguero de Pelo lido'),(59,'Perdiguero de pelo rizado'),(60,'Perdiguero Portugués'),(61,'Pitbull '),(62,'Podenco Ibicenco'),(63,'Podenco Portugués'),(64,'Presa canario '),(65,'Presa Mallorquin'),(66,'Rottweiler '),(67,'Rough Collie'),(68,'Sabueso Español'),(69,'Sabueso Hélenico'),(70,'Sabueso Italiano'),(71,'Sabueso Suizo'),(72,'Samoyedo '),(73,'San Bernardo '),(74,'Scottish Terrier '),(75,'Setter Irlandés '),(76,'Shar Pei '),(77,'Shiba Inu '),(78,'Siberian Husky '),(79,'Staffordshire Bull Terrier'),(80,'Teckel'),(81,'Terranova '),(82,'Terrier Australiano'),(83,'Terrier Escocés '),(84,'Terrier Irlandés '),(85,'Terrier Japonés'),(86,'Terrier Negro Ruso'),(87,'Terrier Norfolk'),(88,'Terrier Norwich'),(89,'Yorkshire Terrier');
/*!40000 ALTER TABLE `raza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reserva` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_fin` date NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_transaccion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `precio_total` float NOT NULL,
  `status` int(11) NOT NULL,
  `cuidador_id` bigint(20) NOT NULL,
  `perro_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8ql350vw0khts0b2f7uwym4yu` (`cuidador_id`),
  KEY `FKcj80cfjhegx1mb0w0jvjb8eq9` (`perro_id`),
  CONSTRAINT `FK8ql350vw0khts0b2f7uwym4yu` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`),
  CONSTRAINT `FKcj80cfjhegx1mb0w0jvjb8eq9` FOREIGN KEY (`perro_id`) REFERENCES `perro` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,'2017-08-31','2017-08-29','2017-08-27 00:00:00',1,0,1,1),(2,'2017-08-30','2017-08-26','2017-08-28 03:02:01',1,0,1,3),(3,'2017-08-29','2017-08-27','2017-08-28 03:10:34',1,0,1,2),(4,'2017-08-29','2017-08-27','2017-08-28 04:02:07',1,0,1,4),(5,'2017-08-30','2017-08-27','2017-08-28 04:10:16',1,0,1,3),(6,'2017-08-30','2017-08-28','2017-08-28 04:10:54',1,0,1,4),(7,'2017-08-30','2017-08-27','2017-08-28 04:12:31',1,0,1,3),(8,'2017-08-31','2017-08-31','2017-08-28 04:29:34',1,0,1,3),(9,'2018-08-31','2018-08-31','2017-08-28 04:30:45',1,0,1,3),(10,'2018-08-31','2018-08-31','2017-08-28 04:32:24',1,0,1,3),(11,'2018-06-09','2018-05-09','2017-08-28 23:08:25',1,0,1,3),(12,'2017-08-30','2017-08-27','2017-08-28 23:28:14',1,0,1,2),(13,'2017-09-29','2018-08-31','2017-08-28 23:48:01',1,0,1,1),(14,'2017-08-29','2017-08-28','2017-08-29 02:21:20',1,0,1,2),(16,'2017-08-28','2017-08-28','2017-08-29 13:45:38',1,0,2,13),(17,'2017-08-28','2017-08-28','2017-08-29 18:38:59',1,0,2,17);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'Baño diaro'),(2,'Paseo Diario'),(3,'Foto Diaria'),(4,'Recoger y Entegrar a domicilio'),(5,'Primeros Auxilios'),(6,'Auto para emergencia'),(7,'Administración de medicamentos');
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tamaño`
--

DROP TABLE IF EXISTS `tamaño`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tamaño` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` char(2) NOT NULL,
  `valor_maximo` int(11) NOT NULL,
  `valor_minimo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tamaño`
--

LOCK TABLES `tamaño` WRITE;
/*!40000 ALTER TABLE `tamaño` DISABLE KEYS */;
INSERT INTO `tamaño` VALUES (1,'XS',5,0),(2,'S',10,5),(3,'M',25,10),(4,'L',45,25),(5,'XL',100,45);
/*!40000 ALTER TABLE `tamaño` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `birthday` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `direccion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `FKd6fw075itt6l2535daajce3vv` (`direccion_id`),
  CONSTRAINT `FKd6fw075itt6l2535daajce3vv` FOREIGN KEY (`direccion_id`) REFERENCES `direccion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'pupi@pupi.com','Pupi Backhaus','Masculino','$2a$11$N.osDwRhOahl0Dyhu6Ce5.HyhdkRHPOrZ3SBwtRO8o7eu0SZuT7y.','3513462364','/img/Fede.jpeg','ROLE_USER','pupi',1),(2,NULL,'jose@pupi.com.ar','Jose Boretto','Masculino','$2a$11$ZuW7WPom6rZjP2WkRAvYzuaPDbpJcqIBG3ZmcwmT3lZa.g1NXeReu','3535644404','/img/no-avatar.png','ROLE_USER','jose',5),(3,NULL,'jorge@mail.com','Jorge Constable','Masculino','$2a$11$AzvpxR9ZAsDLcoWS.WyN6.3YUOXc7ZL.FGqj.l8rj4QQTrOnYt2kq','4730000','/img/Jorge.jpeg','ROLE_USER','jorge',2),(4,NULL,'demo@pupi.com.ar',NULL,NULL,'$2a$11$JOlbPl8BmAjXdrt.G4QR..UvXPMDIFB4VQ3nf6dsxrl2WU9X0FOVG',NULL,'/img/no-avatar.png','ROLE_USER','demo',NULL),(5,NULL,'nico@pupi.com.ar',NULL,NULL,'$2a$11$bu5btw423xtRi0BCJ9N2Bur0MejfdKmwaym0UFef4VKzdoc3gJ/Ha',NULL,'/img/no-avatar.png','ROLE_USER','nico',NULL),(6,NULL,'gaabil73@gmail.com','Gabriel Lorenzatti','Masculino','$2a$11$PUac631y32msCbm76CHjsedZYVpc3dRVQESKMVWKpBn6HgUAQH7J.','03514615361','/file_upload/439a303a-e877-4eb1-859f-1935d725ac9d.jpg','ROLE_USER','Gabriel Lorenzatti',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacuna`
--

DROP TABLE IF EXISTS `vacuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacuna` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacuna`
--

LOCK TABLES `vacuna` WRITE;
/*!40000 ALTER TABLE `vacuna` DISABLE KEYS */;
INSERT INTO `vacuna` VALUES (1,'ParvoVirus'),(2,'Rabia'),(3,'Moquillo'),(4,'AdenoVirus'),(5,'CoronaVirus'),(6,'ParaInfluenza'),(7,'Leptospira'),(8,'Giardia'),(9,'Bordetella');
/*!40000 ALTER TABLE `vacuna` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-29 17:20:08
