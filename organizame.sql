-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.6.17 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para organizame
CREATE DATABASE IF NOT EXISTS `organizame` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `organizame`;


-- Volcando estructura para tabla organizame.detalle
CREATE TABLE IF NOT EXISTS `detalle` (
  `documento_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `documento_id` int(11) NOT NULL,
  `unidad_medida` varchar(50) NOT NULL,
  `precio` decimal(10,4) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `subtotal` decimal(10,4) NOT NULL,
  PRIMARY KEY (`documento_detalle_id`),
  KEY `detalle_documento` (`documento_id`),
  CONSTRAINT `detalle_documento` FOREIGN KEY (`documento_id`) REFERENCES `documento` (`documento_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla organizame.detalle: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;


-- Volcando estructura para tabla organizame.documento
CREATE TABLE IF NOT EXISTS `documento` (
  `documento_id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `folio` int(11) NOT NULL,
  `nombre_comprador` varchar(150) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`documento_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla organizame.documento: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;


-- Volcando estructura para tabla organizame.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `username` varchar(254) NOT NULL,
  `nombre` varchar(254) NOT NULL,
  `password` varchar(254) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla organizame.usuario: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`username`, `nombre`, `password`) VALUES
	('eduin', 'Eduin Lòpez', 'eduin123');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
