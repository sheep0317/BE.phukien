CREATE DATABASE  IF NOT EXISTS `phukien` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `phukien`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: phukien
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `product_quantity` int NOT NULL,
  `total` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `paid_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bill_id`,`product_id`,`email`,`create_date`),
  KEY `productid_bill_idx` (`product_id`),
  KEY `email_bill_idx` (`email`),
  CONSTRAINT `email_bill` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (6,'Case Iphone13',1,2000000,3,'chaos.wizard@gmail.com','6/12/2021','2021-12-07T12:25:02.211Z'),(7,'Case Iphone13',1,2000000,2,'chaos.wizard@gmail.com','6/12/2021','2021-12-07T12:25:39.562Z'),(8,'Case Iphone13',1,2000000,2,'chaos.wizard@gmail.com','6/12/2021',''),(9,'Case Iphone13',1,2000000,2,'chaos.wizard@gmail.com','6/12/2021',''),(10,'Case Iphone13',1,2000000,2,'chaos.wizard@gmail.com','6/12/2021','');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productid` int NOT NULL,
  `product_description` longtext NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `product_price` varchar(45) NOT NULL,
  `product_quantity` varchar(45) NOT NULL,
  `product_status` tinyint NOT NULL,
  `product_type` varchar(45) DEFAULT NULL,
  `product_brand` varchar(45) NOT NULL,
  `product_image` longtext,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Case Iphone 13 pro max mau vang lap lanh','Case Iphone13','2000000','5',1,'Case','Rhino','https://cdn.shopify.com/s/files/1/0274/8717/files/newflow_category_solidsuit_iphone-13-pro.png?1634789531'),(2,'Case Iphone 13 pro max gon song','Case Iphone13','2000000','11',1,'Case','Rhino','https://cdn.shopify.com/s/files/1/0274/8717/files/newflow_category_solidsuit_iphone-13-pro.png?1634789531'),(4,'Case Iphone 11 vien xanh la','Case Iphone 11','1999992','4',1,'Case','Rhino','https://phukien24h.com.vn/wp-content/uploads/2019/10/%E1%BB%91p-vi%E1%BB%81n-iphone-11-rhinoshield-phukien24h-1-800x800.jpg'),(5,'Case Iphone 11 vien do','Case Iphone 11','2000000','2',1,'Case','Rhino','https://phukien24h.com.vn/wp-content/uploads/2019/10/%E1%BB%91p-vi%E1%BB%81n-iphone-11-rhinoshield-phukien24h-1-800x800.jpg'),(6,'Case Iphone 11 vien vang','Case Iphone 11','2000000','2',1,'Case','Rhino','https://phukien24h.com.vn/wp-content/uploads/2019/10/%E1%BB%91p-vi%E1%BB%81n-iphone-11-rhinoshield-phukien24h-1-800x800.jpg'),(7,'Case Iphone 11 vien den','Case Iphone 11','2000000','2',1,'Case','Rhino','https://phukien24h.com.vn/wp-content/uploads/2019/10/%E1%BB%91p-vi%E1%BB%81n-iphone-11-rhinoshield-phukien24h-1-800x800.jpg'),(8,'Case Iphone 11 van go','Case Iphone 11','2000000','2',1,'Case','Rhino','https://cf.shopee.vn/file/33e031e2a14ee29eacb31813b70943ab'),(9,'Case Iphone 11 vien xanh','Case Iphone 11','2000000','2',1,'Case','Rhino','https://sacnhanh.vn/wp-content/uploads/2021/01/15FBB16D-ADB7-475F-B580-E43D0AE4782B.jpeg'),(10,'Case Iphone 13 pro max chong soc den','Case Iphone 13','1700000','2',1,'Case','UAG','https://lesang.vn/images/san-pham/op-lung-iphone-13-pro-max-uag-monarch-kevlar-black-5-lop1632119682.jpg'),(11,'Case Iphone 13 pro max chong soc trong suot','Case Iphone 13','850000','2',1,'Case','UAG','https://cello.vn/image/cache/catalog/Cello/SanPham/Case/iPhone13ProMax/UAG/Plyo/Plyo_Ice_2-500x500.jpg'),(12,'Case Iphone 13 pro max chong soc trong suot nam cham','Case Iphone 13','1000000','2',1,'Case','UAG','https://cello.vn/image/cache/catalog/Cello/SanPham/Case/iPhone13ProMax/UAG/Plyo%20MagSafe/PlyoMagSafe_Ice_5-500x500.jpg'),(13,'Case Iphone 13 pro max chong soc xanh la','Case Iphone 13','1700000','2',1,'Case','UAG','https://uagvietnam.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/09/30112928/Op-lung-iPhone-11-Pro-Max-UAG-Pathfinder-Series_Olive-Drab_01_bengovn.jpg'),(14,'Case Iphone 13 pro max chong soc camo','Case Iphone 13','1700000','2',1,'Case','UAG','https://uagvietnam.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/10/22110804/Op-lung-iPhone-11-Pro-Max-UAG-Pathfinder-SE-Camo_MIDNIGHT_01_bengovn.jpg'),(15,'Case Iphone 13 pro max chong soc bac','Case Iphone 13','1700000','2',1,'Case','UAG','https://phukienx.vn/wp-content/uploads/2019/09/uag-Plasma-iphone-11-trong-570x571.jpg'),(16,'Case Iphone 13 pro max chong soc do','Case Iphone 13','1700000','2',1,'Case','UAG','https://phukienx.vn/wp-content/uploads/2019/09/UAG-Plasma-iphone-11-pro-do-570x570.jpg'),(17,'Case Iphone 13 pro max chong soc cam','Case Iphone 13','1700000','2',1,'Case','UAG','https://cellphones.com.vn/sforum/wp-content/uploads/2020/11/UAG-iPhone-12-12.jpg'),(18,'Case Iphone 13 pro max chong soc trang','Case Iphone 13','1700000','2',1,'Case','UAG','https://product.hstatic.net/1000016460/product/apple_iphone6.7_2020_pat_wht_std_pt01_eb63b679f58446638c6550ddc3660db8_large.png'),(19,'Case Iphone 13 pro max chong soc xanh','Case Iphone 13','1700000','2',1,'Case','UAG','https://bengo.vn/media/catalog/product/cache/82f9b2df01c71e94798af7673d817d3a/o/p/op-lung-iphone-11-uag-plasma-series_cobalt_01_bengovn.jpg'),(20,'Case Iphone 13 pro max chong soc xanh','Case Iphone 13','1700000','2',1,'Case','UAG','https://www.xtmobile.vn/vnt_upload/product/08_2019/thumbs/600_thumb-op-camo-ip11.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cart`
--

DROP TABLE IF EXISTS `user_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_cart` (
  `user_email` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`user_email`,`product_id`),
  KEY `product_in_cart_idx` (`product_id`),
  CONSTRAINT `user_cart` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cart`
--

LOCK TABLES `user_cart` WRITE;
/*!40000 ALTER TABLE `user_cart` DISABLE KEYS */;
INSERT INTO `user_cart` VALUES ('chaos.wizard@gmail.com',1,3),('chaos.wizard@gmail.com',2,1),('chaos.wizard@gmail.com',4,1),('chaos.wizard@gmail.com',5,1),('chaos.wizard@gmail.com',6,2),('chaos.wizard@gmail.com',8,1),('tranvietmar15@gmail.com',3,1);
/*!40000 ALTER TABLE `user_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `displayname` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `role` tinyint DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('chao@gmail.com','phuonga','$2b$10$aQOj4fC2OxzZKvEohduZHu1DG.2.m5eeJKb0stg1BTb5EuYsifazm','alsdsnahl',0,'1234567890',1),('chaos.15@gmail.com','phuonganh','$2b$10$fX41ERi.Qze1QCgeE8mOieT5Ml.GY6xXky7CE218Ldi3MOI3FZI9K','51 duong 6',0,'123456789',1),('chaos.wizard.15@gmail.com','admin02','$2b$10$TrADd/DV2fnX/IS5oRawOOGkrXk2jbm9LoVbku1Sxvd1PBOK0kq12','51 duong 6',0,'123456789',1),('chaos.wizard@gmail.com','Phương Anh','$2b$10$eXQC39m41ZigUbuKaU0Fve5e4JpiCV3eQlrd/zM4A8XmlVgPdpjaO','48 Thoai Ngoc Hau',0,'0123456789',1),('chaos@gmail.com','admin02','$2b$10$0ZzHTZmMTsncmkmOZzCmhOSUGB5l01VHZ8skCpKJhfha9BM9hJT.u','51 duong 6',0,'123456789',1),('tranvietmar15@gmail.com','admin4','$2b$10$gQ5xOIel1PWUhor0sVUmSe1QacqGFRBTWQEvSqdhPS4XKTUfMLr6C','48 bui thi xuan',1,'000000',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-08 18:13:50
