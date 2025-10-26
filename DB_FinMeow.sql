-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2025 a las 09:35:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_crediticia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_racha`
--

CREATE TABLE `historial_racha` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `evento_tipo` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `fecha_evento` datetime DEFAULT current_timestamp(),
  `impacto_score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas_financieras`
--

CREATE TABLE `metas_financieras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre_meta` varchar(255) NOT NULL,
  `tipo_meta` varchar(50) DEFAULT NULL,
  `objeto_id_banco` varchar(255) DEFAULT NULL,
  `monto_objetivo` decimal(18,2) NOT NULL,
  `monto_actual` decimal(18,2) DEFAULT 0.00,
  `fecha_limite` date DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorios`
--

CREATE TABLE `recordatorios` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `bill_id_banco` varchar(255) NOT NULL,
  `fecha_recordatorio` date NOT NULL,
  `mensaje` varchar(500) NOT NULL,
  `enviado` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `customer_id_banco` varchar(255) DEFAULT NULL,
  `score_racha` int(11) DEFAULT 100,
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password_hash`, `nombre`, `customer_id_banco`, `score_racha`, `creado_en`) VALUES
(1, 'laura@gmail.com', '$2y$10$2ONvgIm6G3zyDrzOPlabCu3IvmEmiB5/2RX9C7DnpFLnsxD41hxnC', NULL, NULL, 100, '2025-10-25 16:15:10'),
(2, 'analaura@gmail.com', '$2y$10$EqlQeuyv7XoFDETInLtQ9ODunGAQrU6Jja30RtNvyB619BIoHPecy', NULL, '68fcf1b19683f20dd51a4600', 100, '2025-10-25 16:16:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial_racha`
--
ALTER TABLE `historial_racha`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `metas_financieras`
--
ALTER TABLE `metas_financieras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial_racha`
--
ALTER TABLE `historial_racha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metas_financieras`
--
ALTER TABLE `metas_financieras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_racha`
--
ALTER TABLE `historial_racha`
  ADD CONSTRAINT `historial_racha_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `metas_financieras`
--
ALTER TABLE `metas_financieras`
  ADD CONSTRAINT `metas_financieras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
