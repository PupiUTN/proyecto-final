CREATE DATABASE  IF NOT EXISTS `pupi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pupi`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: aa1pu9gjmwalalf.caexa3xou8ho.us-east-2.rds.amazonaws.com    Database: pupi
-- ------------------------------------------------------
-- Server version	5.6.35-log

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
  `estado` char(10) DEFAULT NULL,
  `dni` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3rj0f9g1npir9nss6c400rjt9` (`user_id`),
  KEY `FKl8rourkwax3s2qxy58yg4hk4u` (`tamaño_id`),
  CONSTRAINT `FK3rj0f9g1npir9nss6c400rjt9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKl8rourkwax3s2qxy58yg4hk4u` FOREIGN KEY (`tamaño_id`) REFERENCES `tamaño` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador`
--

LOCK TABLES `cuidador` WRITE;
/*!40000 ALTER TABLE `cuidador` DISABLE KEYS */;
INSERT INTO `cuidador` VALUES (1,4,'Me defino como un buen cuidador, tengo habitos muy buenos y soy la persona mas cool para tu perro. Dejalo con confianza que pasará hermosos dias, soy bueno, hurra por mi y por ti que me eligirás ',360,1,3,'completed',0),(2,2,'Excelente cuidador, desde que nací tengo perros y siempre me gusta pasar tiempo con ellos. Considero que se merecen lo mejor por ser el mejor amigo del hombre.',250,3,5,'completed',39301709),(3,2,'Soy un apasionado de los canes ya que desde mi infancia tuve siempre perros a los cuales cuidar y educar lo que me hizo inclinar y dedicarme al cuidado de ellos de una manera especial siempre buscando su bienestar y que sienta en familia cuando no esta con los suyos. Conmigo tendrá una estadía agradable y divertida, aparte del envio de fotos y videos constantes para que el dueño sepa como la esta pasando. Siempre fui una persona de gran caminar y de buena resistencia por lo cual no tengo dificultades en paseos largos y sobre todo en ejercitarlos.',300,6,2,'completed',0),(4,5,'Cuidar a tu mascota será un placer, lo haremos con todos el amor y todos los cuidados posibles. Somos gente confiable, honesta y buena onda. Recibimos animales pequeños y medianos ya que vivimos en un departamento y quizás para los animales más grandes no sería cómodo. Somos accesibles con los horarios de llegada y salida. Vivimos en el centro histórico, cerca de calles buenas para pasear mascotas y tenemos un pequeño patio. El departamento es seguro y el edificio también, no hay forma de que una mascota pueda escapar sin ser vista por nosotras. Animate a reservar y cuéntanos más de ti y de tu preciad@ compañer@ de vida.',120,2,1,'completed',0),(5,1,'Prueba de sistema',240,7,1,'completed',0),(14,0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget commodo ipsum. Suspendisse potenti. Mauris at nisl porttitor, dapibus tortor et',0,11,NULL,'pending',11111111),(15,0,'soy un buen cuidador',0,10,NULL,'approved',12312312),(16,0,'soy un buen cuidador',0,24,NULL,'pending',12312312),(17,0,'HOLA QUIERO SER CUIDADOR PORFA',0,22,NULL,'rejected',12123);
/*!40000 ALTER TABLE `cuidador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuidador_dni_imagenes`
--

DROP TABLE IF EXISTS `cuidador_dni_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuidador_dni_imagenes` (
  `cuidador_id` bigint(20) NOT NULL,
  `dni_imagenes_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_h9i10wvtbpnn4jx48hopfq0hg` (`dni_imagenes_id`),
  KEY `FK54qwuld0usd0bbp9acvnx8hyj` (`cuidador_id`),
  CONSTRAINT `FK54qwuld0usd0bbp9acvnx8hyj` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`),
  CONSTRAINT `FKo1cg3xks12myq2hmyjevbb74w` FOREIGN KEY (`dni_imagenes_id`) REFERENCES `imagen` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador_dni_imagenes`
--

LOCK TABLES `cuidador_dni_imagenes` WRITE;
/*!40000 ALTER TABLE `cuidador_dni_imagenes` DISABLE KEYS */;
INSERT INTO `cuidador_dni_imagenes` VALUES (14,2),(14,3),(15,41),(15,42),(16,43),(16,44),(17,45),(17,46);
/*!40000 ALTER TABLE `cuidador_dni_imagenes` ENABLE KEYS */;
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
INSERT INTO `cuidador_lista_imagenes` VALUES (1,1),(1,2),(1,3),(1,4),(2,5),(2,6),(2,7),(2,8),(3,9),(3,10),(3,11),(3,12),(4,13),(4,14),(4,15),(4,16),(5,29),(5,30),(5,31),(5,32);
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
INSERT INTO `cuidador_lista_servicios` VALUES (1,1),(2,1),(3,1),(5,1),(1,2),(2,2),(3,2),(5,2),(1,3),(2,3),(3,3),(5,3),(1,4),(3,4),(5,4),(1,5),(3,5),(5,5),(3,6),(2,7);
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
  `direccion_linea1` varchar(255) NOT NULL,
  `direccion_linea2` varchar(255) DEFAULT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `numero` int(11) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `place_id` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `codigo_postal` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
INSERT INTO `direccion` VALUES (1,'Evasio Garrone','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Evasio Garrone 6971',NULL,-31.3892107,-64.27353249999999,6971,'Argentina','EihFdmFzaW8gR2Fycm9uZSA2OTcxLCBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba',''),(2,'Obispo Clara','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Obispo Clara 235',NULL,-31.3940788,-64.1980058,235,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba',''),(3,'Alfredo L. Palacios','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Alfredo palacios 630 Cordoba',NULL,-31.4475484,-64.1868513,630,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba',''),(4,'Alfredo L. Palacios','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Alfredo L palacios 630',NULL,-31.4475484,-64.1868513,630,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','Córdoba',''),(5,'Ramón Cárcano','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Ramón Cárcano 396',NULL,-31.386134,-64.263547,390,'Argentina','ChIJRwrzN4SiMpQRDaLH17nXn10','Córdoba',''),(6,'Obispo Clara copia','Córdoba','ChIJaVuPR1-YMpQRkrBmU5pPorA','Obispo Clara 235',NULL,-31.3940788,-64.1980058,235,'Argentina','Ei5PYmlzcG8gQ2xhcmEgMjM1LCBYNTAwOEdNRSBDw7NyZG9iYSwgQXJnZW50aW5h','cordoba copia','');
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES (1,'/file_upload/1d1f8fb1-8328-4aa9-9b03-dbf057615f1b.jpg'),(2,'/file_upload/imagen_cuidador_2.jpg'),(3,'/file_upload/imagen_cuidador_3.jpg'),(4,'/file_upload/imagen_cuidador_4.jpg'),(5,'/file_upload/jorge1.jpg'),(6,'/file_upload/jorge2.jpg'),(7,'/file_upload/jorge3.jpg'),(8,'/file_upload/jorge4.jpg'),(9,'/file_upload/172e4da0-3f15-4f9a-b736-00a410ac4c63.jpg'),(10,'/file_upload/6a077310-3c12-4c7d-9abf-5fed74108a60.jpeg'),(11,'/file_upload/40920a98-cef5-41b3-ab78-f8033e7baa82.jpeg'),(12,'/file_upload/gabi5.jpg'),(13,'/img/perfil-jose/jose-2.jpg'),(14,'/img/perfil-jose/jose-1.jpg'),(15,'/img/perfil-jose/jose-3.jpg'),(16,'/img/perfil-jose/jose-4.jpg'),(21,''),(22,''),(23,''),(24,''),(25,''),(26,''),(27,''),(28,''),(29,''),(30,''),(31,''),(32,''),(41,'/file_upload/6754607f-3441-43e3-87cd-2f73cbbaf248.jpeg'),(42,'/file_upload/e428acde-277b-4eab-874c-242251b04322.jpeg'),(43,'/file_upload/6887ecfe-4480-4efe-977f-b9a660b6c2b6.jpg'),(44,'/file_upload/e4f2f87b-0ef0-460f-8357-e7654f62fc2a.jpg'),(45,'/file_upload/46b587fe-b4b4-4a3b-b33f-c20ea9d8e319.png'),(46,'/file_upload/b6fe7fcb-b96b-42e3-be52-a5fa08baeb59.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perro`
--

LOCK TABLES `perro` WRITE;
/*!40000 ALTER TABLE `perro` DISABLE KEYS */;
INSERT INTO `perro` VALUES (1,NULL,'/file_upload/32aa1f10-4723-4576-af17-4b60f0b7fb53.jpg','Cleo',1,1,1,'2016-02-02','Hembra'),(5,NULL,'/file_upload/0a348d46-f0e3-455e-9782-eb96e6a79c40.jpg','Pachi',85,3,1,'24-08-2017','Macho'),(11,NULL,'/file_upload/ad9cdb45-0ada-40f2-b82c-7d439338267d.jpg','Borges',45,4,1,'23-08-2015','Macho'),(12,NULL,'/file_upload/adcdfadb-074e-4a9c-8bc4-904ea0b8e357.jpg','Esteban',63,2,1,'21-03-2015','Macho'),(13,NULL,'/file_upload/86d76335-5398-478f-8bc9-f47acf1c155d.jpg','Fritz',39,4,1,'10-11-2010','Macho'),(17,NULL,'/file_upload/64f7f8d8-90d6-4ecc-a7cb-a6be508d315d.jpg','Clara',15,2,5,'18-08-2017','Hembra'),(18,NULL,'/file_upload/7d6e2245-6459-4830-8b22-b30e168742f6.jpg','test',3,2,1,'','Macho'),(19,NULL,'/file_upload/22670147-18f5-4384-86ef-2f7ad8c57206.jpg','soy mi propio perro',37,5,12,'','Macho'),(20,NULL,'/file_upload/bc1a03aa-39fc-471f-b65a-d339c0cb2820.jpg','test',5,4,1,'','Macho'),(21,NULL,'/file_upload/6eae9939-79b4-4ea0-85c6-ac110ad79c94.jpg','lalalalla',2,2,1,'','Hembra'),(22,NULL,'/file_upload/88aa6be2-2f25-4643-93ae-c2c3ba3b0ec7.jpg','hola',7,2,1,'','Hembra'),(23,NULL,'/file_upload/d71d9f8f-a1e4-4b08-a7a1-201ce8e2ba9d.jpg','lalal',6,3,1,'','Hembra'),(24,NULL,'/file_upload/58e33fc8-ecb3-4b0d-9056-2d182a7e7c19.jpg','llalal',5,2,1,'','Macho'),(25,NULL,'/file_upload/3d83f756-ae03-45c9-b773-e090a64a0a3c.jpg','Ernesto',5,1,16,'','Macho'),(26,NULL,'/file_upload/a8e7edd3-fa85-4a39-b2b8-565ed79fa946.jpg','Juan Carlos',47,4,20,'','Macho'),(27,NULL,'/file_upload/0e689f13-38c1-45a3-8b79-188a60877c40.jpg','Juan Carlos',79,4,22,'','Macho'),(28,NULL,'/file_upload/46aa0886-768a-4eba-8e6a-326b34dfe4b1.jpg','dog',12,2,23,'','Hembra'),(29,NULL,'/file_upload/18aba11e-68eb-4531-96ef-5601738f959f.jpg','Dog',5,4,2,'','Hembra');
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
INSERT INTO `perro_lista_vacunas` VALUES (11,2),(12,5),(12,6),(12,7),(13,6),(13,5),(13,4),(17,5),(17,3),(18,3),(18,4),(19,6),(19,8),(19,4),(19,5),(19,2),(20,3),(20,5),(21,4),(22,2),(22,5),(23,9),(23,3),(24,2),(25,3),(25,5),(25,4),(1,1),(1,2),(1,3),(26,2),(26,3),(26,1),(27,6),(27,5),(27,1),(28,5),(28,1),(28,4),(28,2),(28,3),(29,4),(29,5),(29,6),(29,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;
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
  `status` varchar(255) NOT NULL,
  `cuidador_id` bigint(20) NOT NULL,
  `perro_id` bigint(20) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8ql350vw0khts0b2f7uwym4yu` (`cuidador_id`),
  KEY `FKcj80cfjhegx1mb0w0jvjb8eq9` (`perro_id`),
  CONSTRAINT `FK8ql350vw0khts0b2f7uwym4yu` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`),
  CONSTRAINT `FKcj80cfjhegx1mb0w0jvjb8eq9` FOREIGN KEY (`perro_id`) REFERENCES `perro` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (29,'2017-09-27','2017-09-18','2017-09-19 12:47:45',450,'CANCEL',4,1,'hola man'),(30,'2017-09-21','2017-09-18','2017-09-19 13:09:49',150,'CANCEL',4,19,'Hola titan'),(31,'2017-09-29','2017-09-18','2017-09-19 13:26:03',8800,'CANCEL',3,1,'hola gabi, estoy testeando lo tuyo'),(32,'2017-09-21','2017-09-19','2017-09-20 01:54:23',1600,'CONFIRMATION_PENDING',3,1,'hola papa'),(33,'2017-09-26','2017-09-25','2017-09-26 03:08:51',250,'CANCEL_BY_USER',2,25,'Holis!'),(34,'2017-09-26','2017-09-25','2017-09-26 04:15:28',50,'CANCEL',4,1,'test'),(35,'2017-09-30','2017-09-29','2017-09-26 04:49:55',250,'CANCEL_BY_USER',2,25,'Holis'),(36,'2017-09-30','2017-09-29','2017-09-26 04:55:39',250,'CANCEL_BY_USER',2,25,'Va de vuelta'),(37,'2017-09-28','2017-09-27','2017-09-28 22:31:32',50,'CANCEL',4,1,'Hola! Quiero hacer una reserva!'),(38,'2017-10-03','2017-10-02','2017-10-03 02:24:04',250,'CONFIRMATION_PENDING',2,26,'Hola yorchi, te dejo al juanca'),(39,'2017-10-03','2017-10-02','2017-10-03 03:11:23',800,'CANCEL',3,27,'Gabi, te dejo al juanca. Guarda que muerde'),(40,'2017-10-26','2017-10-02','2017-10-03 03:43:15',1200,'ACCEPTED',4,28,'hola jose'),(41,'2017-10-11','2017-10-02','2017-10-03 03:59:08',3240,'CONFIRMATION_PENDING',1,29,'Hola fede, por favor, completa tu perfil que esta vacio'),(42,'2017-10-04','2017-10-02','2017-10-03 04:08:37',1600,'ACCEPTED',3,27,'Gabi, te dejo al juanca, no muerde mas'),(43,'2017-10-03','2017-10-02','2017-10-03 04:18:08',800,'CANCEL',3,27,'Guarda que muerde de vuelta'),(44,'2017-10-04','2017-10-02','2017-10-03 04:36:13',1600,'ACCEPTED',3,27,'Holis'),(45,'2017-10-03','2017-10-02','2017-10-03 04:40:50',800,'CANCEL',3,27,'jojo');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'pupi@pupi.com','Fede','Femenino','$2a$11$N.osDwRhOahl0Dyhu6Ce5.HyhdkRHPOrZ3SBwtRO8o7eu0SZuT7y.','3513462364','/file_upload/1d1f8fb1-8328-4aa9-9b03-dbf057615f1b.jpg','ROLE_ADMIN','pupi',1),(2,NULL,'joseboretto@gmail.com','Jose Boretto','Masculino','$2a$11$ZuW7WPom6rZjP2WkRAvYzuaPDbpJcqIBG3ZmcwmT3lZa.g1NXeReu','3535644404','/file_upload/4b58e2b6-7041-4793-89d1-7a782076d81e.jpg','ROLE_CUIDADOR','jose',5),(3,'11-09-1995','jorge@mail.com','Jorge Constable','Masculino','$2a$11$AzvpxR9ZAsDLcoWS.WyN6.3YUOXc7ZL.FGqj.l8rj4QQTrOnYt2kq','3513070776','/img/Jorge.jpeg','ROLE_CUIDADOR','jorge',2),(4,NULL,'demo@pupi.com.ar',NULL,NULL,'$2a$11$JOlbPl8BmAjXdrt.G4QR..UvXPMDIFB4VQ3nf6dsxrl2WU9X0FOVG',NULL,'/img/no-avatar.png','ROLE_USER','demo',NULL),(5,NULL,'nico@pupi.com.ar',NULL,NULL,'$2a$11$bu5btw423xtRi0BCJ9N2Bur0MejfdKmwaym0UFef4VKzdoc3gJ/Ha',NULL,'/img/no-avatar.png','ROLE_USER','nico',NULL),(6,NULL,'gaabil73@gmail.com','Gabriel Lorenzatti','Masculino','$2a$11$N.osDwRhOahl0Dyhu6Ce5.HyhdkRHPOrZ3SBwtRO8o7eu0SZuT7y.','03514615361','/file_upload/439a303a-e877-4eb1-859f-1935d725ac9d.jpg','ROLE_CUIDADOR','Gabriel Lorenzatti',3),(7,NULL,'efra@pupi.com','Efra diaz','Masculino','$2a$11$N.osDwRhOahl0Dyhu6Ce5.HyhdkRHPOrZ3SBwtRO8o7eu0SZuT7y.','03514615361','/file_upload/439a303a-e877-4eb1-859f-1935d725ac9d.jpg','ROLE_CUIDADOR','Efra Diaz',NULL),(8,NULL,'test@test.com2',NULL,NULL,'$2a$11$m5Xg1sKBFH6NclS.CSV8ruq77xw9UBZtQThFou80LHqI6BPGDGpie',NULL,'/img/no-avatar.png','ROLE_USER','tes',NULL),(9,NULL,'jose@jose.com',NULL,NULL,'$2a$11$4kVo3Fe.iQ6YotvvCAu0wemq413ELftb.f6tZaq0Em7aTHrwpXtJC',NULL,'/img/no-avatar.png','ROLE_USER','sad',NULL),(10,'14-10-1997','jorge@test.com','Prueba Jorge','Masculino','$2a$11$3tm5r7LQt6eGcvevbyD0FeIAvjAATBCdEYN2E4CzCTa7pmuQEwzVC','111111','/img/no-avatar.png','ROLE_CUIDADOR','test_jorge',6),(11,NULL,'testAltaJose@pupi.com.ar','Prueba','Masculino','$2a$11$EEZuPI5VdPUuvRAfmhAaYujVitHXvhZjSpQAOT3phvzqviLRlBs1e','12312312','/img/no-avatar.png','ROLE_USER','testAltaJose',1),(12,NULL,'prueba@prueba.com.ar',NULL,NULL,'$2a$11$HgsQcvoXD9Vt5u.b9Hu5vOJw9TjGoD7yFIfyFBNSMJXmYrgvyvjjK',NULL,'/img/no-avatar.png','ROLE_USER','prueba',NULL),(13,NULL,'gabriellorenzatti94@gmail.com',NULL,NULL,'$2a$11$P5BAvirwIS8LbIksl.mFjOjzk0cmXFeJUz/ugCa3BeRpdOpHuwJum',NULL,'/img/no-avatar.png','ROLE_USER','Gabi Matias',NULL),(14,NULL,'prueba@gmail.com',NULL,NULL,'$2a$11$CLzF2QJR/cIqUpIZTYo4Iu8GdW8X8jOYujYdFrgQ./I2V5nhgb576',NULL,'/img/no-avatar.png','ROLE_USER','prueba1',NULL),(15,NULL,'prueba2@gmail.com',NULL,NULL,'$2a$11$nX/fHrhfKAk.q42chKqQWexFNgoC6ouW9M3sOm.mTnGrrORbXI9F.',NULL,'/img/no-avatar.png','ROLE_USER','prueba2',NULL),(16,NULL,'prueba3@gmail.com',NULL,NULL,'$2a$11$mN2/5Bl8y.RYYJU5JhQIJ.jnV408NYR6b1/EoEX8XyisYkLKnClpC',NULL,'/img/no-avatar.png','ROLE_USER','prueba3',NULL),(17,NULL,'fede_xeneize_94@hotmail.com',NULL,NULL,'$2a$11$jAtZLnPd8gbx1gjiPzKiau4fhMW42hNK3pden7KOJJCoPUD6I0vnu',NULL,'/img/no-avatar.png','ROLE_USER','el_loco_pupi_77',NULL),(18,NULL,'choro@hotmail.com',NULL,NULL,'$2a$11$qeuYI4nfAZGHcl/mOjVZVOEEZQ1sW7133u9xSkfPB7A2UZsbXLcnC',NULL,'/img/no-avatar.png','ROLE_USER','holis',NULL),(19,NULL,'gorditasexy@gmail.com',NULL,NULL,'$2a$11$nVAAcSi.JBBJx0N8t44hoORwSYETids8MWt.42xpP1r66CatMUHDa',NULL,'/img/no-avatar.png','ROLE_USER','La Novia Gabi',NULL),(20,NULL,'prueba@outlook.com',NULL,NULL,'$2a$11$caqNWZfrhuiGREv4yrqrMOVG9bpzy7Q50.1El3g7IqscK0OpmY/zy',NULL,'/img/no-avatar.png','ROLE_USER','pruebaout',NULL),(21,NULL,'nda@nda.com',NULL,NULL,'$2a$11$0Otng20R1khKJxu3xgDui.4zdXv48rVm09CQ4aiEE1fT6PmTGo5Oa',NULL,'/img/no-avatar.png','ROLE_USER','fbackhaus7',NULL),(22,NULL,'fbackhaus94@gmail.com',NULL,NULL,'$2a$11$K/2meyHCGhr45yIW2A0JFOgL/MQMRHnuJrn9U/mFLyrkCLZL8l7U6',NULL,'/img/no-avatar.png','ROLE_CUIDADOR','fbackhaus',1),(23,NULL,'test1@test.com',NULL,NULL,'$2a$11$I7phbK4xzApkIOHlcf6xUO4ARlSX9GEURRMcFL4gi6cDTmxnn8lcu',NULL,'/img/no-avatar.png','ROLE_USER','test1',NULL),(24,NULL,'jorge2@test.com',NULL,NULL,'$2a$11$tK.BMbHawUN4RmC7LO6ftOeYbfV.V1EHz3WDIsNMMiBdG4YcYYeBu',NULL,'/img/no-avatar.png','ROLE_USER','jorge prueba 2',NULL);
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

-- Dump completed on 2017-10-03 17:41:40
