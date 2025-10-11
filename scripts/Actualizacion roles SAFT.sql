-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-10-2025 a las 18:50:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avance_estudiante`
--

CREATE TABLE `avance_estudiante` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `id_modulo` bigint(20) UNSIGNED NOT NULL,
  `responsable` varchar(255) NOT NULL,
  `fecha` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `numero_item` varchar(255) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `tipo_contrato` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`id`, `per_id`, `numero_item`, `especialidad`, `tipo_contrato`, `estado`, `created_at`, `updated_at`) VALUES
(4, 5, 'DOC124', 'Matemáticas', 'permanente', 0, NULL, NULL),
(11, 34, 'DOC124', 'Física', 'permanente', 1, NULL, NULL),
(12, 39, 'DOC124', 'Física', 'permanente', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `id_programa_academico` bigint(20) UNSIGNED NOT NULL,
  `numero_matricula` varchar(255) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `per_id`, `id_programa_academico`, `numero_matricula`, `fecha_inscripcion`, `estado`, `created_at`, `updated_at`) VALUES
(8, 11, 1, '6263894', '2025-09-24', 1, NULL, NULL),
(9, 16, 1, '6263894', '2025-09-25', 1, NULL, NULL),
(11, 26, 1, '23321314', '2025-09-27', 1, NULL, NULL),
(12, 36, 1, 'gwrwgew', '2025-10-10', 1, NULL, NULL),
(13, 37, 1, '423255243', '2025-10-11', 1, NULL, NULL),
(14, 38, 1, '2434535634', '2025-10-11', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_auditoria`
--

CREATE TABLE `historial_auditoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `entidad_afectada` varchar(255) NOT NULL,
  `descripcion_operacion` varchar(255) NOT NULL,
  `fecha_operacion` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodologia`
--

CREATE TABLE `metodologia` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `objetivos` varchar(255) DEFAULT NULL,
  `numero_modulos` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metodologia`
--

INSERT INTO `metodologia` (`id`, `nombre`, `descripcion`, `objetivos`, `numero_modulos`, `fecha_inicio`, `fecha_finalizacion`, `created_at`, `updated_at`) VALUES
(3, 'Metodología Scrum', 'Metodología para desarrollo ágil', 'Mejorar eficiencia en proyectos', '5', '2025-01-01', '2025-06-30', NULL, NULL),
(4, 'Metodología Ágil Actualizada', 'Metodología mejorada', 'Optimizar procesos', '6', '2025-02-01', '2025-07-31', NULL, NULL),
(5, 'Metodología Scrum', 'Metodología para desarrollo ágil', 'Mejorar eficiencia en proyectos', '5', '2025-01-01', '2025-06-30', NULL, NULL),
(6, 'Metodología Scrull', 'Metodología para gestión de proyectos', 'Mejorar eficiencia en proyectos', '14', '2025-01-01', '2025-06-30', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_persona_table', 1),
(2, '0001_01_01_000001_create_users_table', 1),
(3, '0001_01_01_000002_create_cache_table', 1),
(4, '0001_01_01_000003_create_jobs_table', 1),
(5, '2025_04_21_154847_create_permission_tables', 1),
(6, '2025_05_04_234326_create_docente_table', 1),
(7, '2025_05_11_184009_create_programa_academico_table', 1),
(8, '2025_05_12_010246_create_estudiante_table', 1),
(9, '2025_05_30_182246_create_plantel_administrativo_table', 1),
(10, '2025_05_30_184831_create_proyecto_table', 1),
(11, '2025_05_30_191419_create_metodologia_table', 1),
(12, '2025_05_30_192120_create_modulo_table', 1),
(13, '2025_05_30_192840_create_pago_table', 1),
(14, '2025_05_30_193442_create_taller_table', 1),
(15, '2025_05_30_194418_create_avance_estudiante_table', 1),
(16, '2025_05_30_194822_create_observacion_table', 1),
(17, '2025_05_30_195141_create_historial_auditoria_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_docente` bigint(20) UNSIGNED NOT NULL,
  `id_metodologia` bigint(20) UNSIGNED NOT NULL,
  `duracion` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion`
--

CREATE TABLE `observacion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `metodo` enum('efectivo','qr','transferencia_bancaria') NOT NULL DEFAULT 'efectivo',
  `comprobante` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_roles`
--

CREATE TABLE `permisos_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_rol` bigint(20) UNSIGNED NOT NULL,
  `modulo` varchar(50) NOT NULL COMMENT 'Nombre del m?dulo (ej: personas, usuarios)',
  `puede_ver` tinyint(1) DEFAULT 1,
  `puede_crear` tinyint(1) DEFAULT 0,
  `puede_editar` tinyint(1) DEFAULT 0,
  `puede_eliminar` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permisos_roles`
--

INSERT INTO `permisos_roles` (`id`, `id_rol`, `modulo`, `puede_ver`, `puede_crear`, `puede_editar`, `puede_eliminar`, `created_at`, `updated_at`) VALUES
(1, 1, 'personas', 1, 1, 1, 1, NULL, NULL),
(2, 1, 'usuarios', 1, 1, 1, 1, NULL, NULL),
(3, 1, 'estudiantes', 1, 1, 1, 1, NULL, NULL),
(4, 1, 'docentes', 1, 1, 1, 1, NULL, NULL),
(5, 1, 'programas', 1, 1, 1, 1, NULL, NULL),
(6, 1, 'proyectos', 1, 1, 1, 1, NULL, NULL),
(7, 1, 'modulos', 1, 1, 1, 1, NULL, NULL),
(8, 1, 'pagos', 1, 1, 1, 1, NULL, NULL),
(9, 2, 'estudiantes', 1, 0, 0, 0, NULL, NULL),
(10, 2, 'proyectos', 1, 1, 1, 0, NULL, NULL),
(11, 2, 'modulos', 1, 0, 0, 0, NULL, NULL),
(12, 2, 'avances', 1, 1, 1, 0, NULL, NULL),
(13, 3, 'proyectos', 1, 1, 1, 0, NULL, NULL),
(14, 3, 'avances', 1, 0, 0, 0, NULL, NULL),
(15, 3, 'pagos', 1, 0, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'permiso.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(2, 'permiso.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(3, 'permiso.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(4, 'permiso.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(5, 'persona.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(6, 'persona.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(7, 'persona.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(8, 'persona.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(9, 'persona.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(10, 'usuario.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(11, 'usuario.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(12, 'usuario.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(13, 'usuario.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(14, 'usuario.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(15, 'plantel_administrativo.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(16, 'plantel_administrativo.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(17, 'plantel_administrativo.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(18, 'plantel_administrativo.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(19, 'plantel_administrativo.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(20, 'docente.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(21, 'docente.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(22, 'docente.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(23, 'docente.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(24, 'docente.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(25, 'programa_academico.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(26, 'programa_academico.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(27, 'programa_academico.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(28, 'programa_academico.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(29, 'programa_academico.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(30, 'estudiante.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(31, 'estudiante.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(32, 'estudiante.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(33, 'estudiante.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(34, 'estudiante.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(35, 'proyecto.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(36, 'proyecto.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(37, 'proyecto.revision', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(38, 'proyecto.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(39, 'proyecto.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(40, 'proyecto.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(41, 'metodologia.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(42, 'metodologia.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(43, 'metodologia.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(44, 'metodologia.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(45, 'metodologia.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(46, 'modulo.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(47, 'modulo.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(48, 'modulo.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(49, 'modulo.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(50, 'modulo.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(51, 'pago.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(52, 'pago.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(53, 'pago.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(54, 'pago.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(55, 'pago.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(56, 'taller.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(57, 'taller.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(58, 'taller.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(59, 'taller.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(60, 'taller.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(61, 'avance_estudiante.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(62, 'avance_estudiante.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(63, 'avance_estudiante.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(64, 'avance_estudiante.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(65, 'avance_estudiante.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidopat` varchar(255) DEFAULT NULL,
  `apellidomat` varchar(255) DEFAULT NULL,
  `carnet` varchar(15) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nombres`, `apellidopat`, `apellidomat`, `carnet`, `direccion`, `telefono`, `correo`, `fecha_nacimiento`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Pablo', 'Picazo', 'Gómez', '123456789', 'Avenida Siempre Viva 456', '987654321', 'john.Picazo.update33@example.com', '1990-02-01', 0, '2025-06-02 13:34:22', '2025-06-02 13:34:22'),
(2, 'Pablo', 'Picazo', 'Gómez', '123456789', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(5, 'Pablito', 'Picazo', 'Gónzales', '029393020', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(6, 'Estudiante', 'Picazo', 'Gónzales', '029393020', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(7, 'Estudiante2', 'Katy', 'Tony', '02830328398', 'Calle Falsa 1234', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(8, 'Estudiante3', 'Deyvid', 'Tony', '02830328398', 'Calle Falsa 1234', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(11, 'Jaziel', 'Vargas', 'Choque', '98293738', 'calle N5', '293887383', 'jazi@gmail.com', '2005-02-18', 1, NULL, NULL),
(16, 'Jaziel', 'Choque', 'Choque', '3243225', '14er23r13r23r', '123141414', 'jaielpro@gmail.com', '2005-02-02', 1, NULL, NULL),
(25, 'Jaziel', 'Vargas', 'Choque', '98293738', 'rgrehergwghrwh', '79532646', 'jazi@gmail.com', '2005-02-18', 1, NULL, NULL),
(26, 'Lucke', 'Skiwallker', 'Dark', '297237293', 'fmkfkwmdkwm', '927972947', 'Luke@gmail.com', '2005-03-23', 1, NULL, NULL),
(34, 'Charles', 'Francis', 'Xavier', '24133513515', '1esfwfwfwrwf', '131412414', 'XavierX@gmail.com', '2005-02-02', 1, NULL, NULL),
(35, 'Charles', '', '', '', NULL, NULL, 'XavierX@gmail.com', NULL, 1, NULL, NULL),
(36, 'Roke', 'Kino', 'Miley', '333131131313', 'dsewgfrghgf', '244255366754', 'roke@gmail.com', '2002-06-11', 1, NULL, NULL),
(37, 'Jaziel', 'Francis', 'Vargas', '463552', 'sadqedqdqd', '3242525252', 'jazi777@gmail.com', '2005-02-10', 1, NULL, NULL),
(38, 'Jaziel', 'alan', 'Xavier', 'w5252543535', 'fgergehthethh', '143424245522', 'jalan@gmail.com', '2025-10-17', 1, NULL, NULL),
(39, 'juan', 'Vargas', 'Dark', '241455525624', 'wfrsgrgrwgrf', '13222354255652', 'jugas@gmail.com', '2005-06-24', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantel_administrativo`
--

CREATE TABLE `plantel_administrativo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `unidad` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_academico`
--

CREATE TABLE `programa_academico` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre_programa` varchar(255) NOT NULL,
  `modalidad` varchar(255) NOT NULL,
  `facultad` varchar(255) NOT NULL,
  `nivel` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `programa_academico`
--

INSERT INTO `programa_academico` (`id`, `codigo`, `nombre_programa`, `modalidad`, `facultad`, `nivel`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'PROG101', 'Ingeniería de Sistemas', 'presencial', 'Ingeniería', 'pregrado', 1, NULL, NULL),
(2, 'PROG102', 'Ingeniería Informática', 'semipresencial', 'Ingeniería', 'pregrado', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_docente_guia` bigint(20) UNSIGNED NOT NULL,
  `id_docente_revisor` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `linea_investigacion` varchar(255) NOT NULL,
  `area_conocimiento` varchar(255) NOT NULL,
  `calificacion` varchar(255) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `fecha_defensa` date DEFAULT NULL,
  `resumen` text DEFAULT NULL,
  `observacion` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `start_path` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `descripcion`, `start_path`, `is_default`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Administrador del sistema con acceso completo', 'inicio', 0, 'web', '2025-06-02 13:34:25', '2025-06-02 13:34:25'),
(2, 'Docente', 'Docente del sistema acad?mico', '/docente', 0, 'web', '2025-06-02 13:39:58', '2025-06-02 13:39:58'),
(3, 'Super Admin', NULL, '/dashboard', 1, 'api', NULL, NULL),
(4, 'Estudiante', 'Estudiante del sistema acad?mico', '/estudiante', 1, 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('WJp49qhnZezAppIZdNRjlmyAteUjXnbTniJGFmpE', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 OPR/118.0.0.0', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoidmpRSm9yVzhYS0E3SlBySk9UYnVzYWhmTnc4MDd4eTVCMkFNVHpQSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbmlzdHJhY2lvbi9wZXJzb25hcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czo0OiJhdXRoIjthOjE6e3M6MjE6InBhc3N3b3JkX2NvbmZpcm1lZF9hdCI7aToxNzQ4ODcxMzU4O31zOjQ6InVzZXIiO2E6Mzp7czo3OiJ1c2VyX2lkIjtpOjE7czo5OiJ1c2VyX25hbWUiO3M6NToiQWRtaW4iO3M6MTA6InVzZXJfbmFtZXMiO047fX0=', 1748871608);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `id_metodologia` bigint(20) UNSIGNED NOT NULL,
  `tipo_taller` varchar(255) NOT NULL,
  `evaluacion_final` varchar(255) NOT NULL,
  `duracion` varchar(255) NOT NULL,
  `resultado` varchar(255) DEFAULT NULL,
  `fecha_realizacion` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `taller`
--

INSERT INTO `taller` (`id`, `titulo`, `id_metodologia`, `tipo_taller`, `evaluacion_final`, `duracion`, `resultado`, `fecha_realizacion`, `created_at`, `updated_at`) VALUES
(3, 'Taller de Capacitacion', 5, 'Práctico', 'Proyecto', '20 horas', NULL, '2025-03-01', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `id_roles` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user_name`, `per_id`, `id_roles`, `status`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, '', 1, 1, 1, 'john.Picazo.update33@example.com', '2025-06-02 13:34:24', '$2y$12$ZfFIdgvk1hWFlOhqt.8fYONfqw6JEjp84jOz1tdLwQy2UnHxS/f8m', 'TmVgnAFCBr', '2025-06-02 13:34:25', '2025-06-02 13:34:25'),
(16, 'ProfesorX', 35, 1, 1, 'XavierX@gmail.com', NULL, '$2a$10$WgHEb06XZr5sUXOOOSf.z.RcF/5WwSwkhHH6dO1xmUHuwyteCKCH2', NULL, NULL, NULL),
(17, 'roke', 36, 3, 1, 'roke@gmail.com', NULL, '$2a$10$yGPGGlQkgJXi1pTlHnK8w.WHMci5gfLlpgDX2AGpInbc7Wmff5/6.', NULL, NULL, NULL),
(18, 'jaziel', 37, 4, 1, 'jazi777@gmail.com', NULL, '$2a$10$g2OQB2VSnEmj8qQz4VTEJ.fto9ddfs6Vg6MFto84U6neMCEGHJ2j2', NULL, NULL, NULL),
(19, 'jalan', 38, 4, 1, 'jalan@gmail.com', NULL, '$2a$10$AsygXiFC25RaBqjqBA0Ewe19fxmxDuqtfowL5GhWq2KrJ/hrjgnK.', NULL, NULL, NULL),
(20, 'juan', 39, 2, 1, 'jugas@gmail.com', NULL, '$2a$10$BhlD7e.HzfCyMBRtM.JqX.gCmtZ9OuupFQ4hfYamvhFtp88029.5a', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `avance_estudiante_id_estudiante_foreign` (`id_estudiante`),
  ADD KEY `avance_estudiante_id_modulo_foreign` (`id_modulo`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docente_per_id_foreign` (`per_id`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_per_id_foreign` (`per_id`),
  ADD KEY `estudiante_id_programa_academico_foreign` (`id_programa_academico`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `historial_auditoria`
--
ALTER TABLE `historial_auditoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodologia`
--
ALTER TABLE `metodologia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modulo_id_docente_foreign` (`id_docente`),
  ADD KEY `modulo_id_metodologia_foreign` (`id_metodologia`);

--
-- Indices de la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `observacion_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pago_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permisos_roles_id_rol_foreign` (`id_rol`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plantel_administrativo_per_id_foreign` (`per_id`);

--
-- Indices de la tabla `programa_academico`
--
ALTER TABLE `programa_academico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyecto_id_docente_guia_foreign` (`id_docente_guia`),
  ADD KEY `proyecto_id_docente_revisor_foreign` (`id_docente_revisor`),
  ADD KEY `proyecto_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taller_id_metodologia_foreign` (`id_metodologia`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_per_id_foreign` (`per_id`),
  ADD KEY `users_id_roles_foreign` (`id_roles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_auditoria`
--
ALTER TABLE `historial_auditoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodologia`
--
ALTER TABLE `metodologia`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `observacion`
--
ALTER TABLE `observacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programa_academico`
--
ALTER TABLE `programa_academico`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  ADD CONSTRAINT `avance_estudiante_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avance_estudiante_id_modulo_foreign` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `docente_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_id_programa_academico_foreign` FOREIGN KEY (`id_programa_academico`) REFERENCES `programa_academico` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `estudiante_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD CONSTRAINT `modulo_id_docente_foreign` FOREIGN KEY (`id_docente`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `modulo_id_metodologia_foreign` FOREIGN KEY (`id_metodologia`) REFERENCES `metodologia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD CONSTRAINT `observacion_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  ADD CONSTRAINT `permisos_roles_id_rol_foreign` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  ADD CONSTRAINT `plantel_administrativo_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_id_docente_guia_foreign` FOREIGN KEY (`id_docente_guia`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proyecto_id_docente_revisor_foreign` FOREIGN KEY (`id_docente_revisor`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proyecto_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `taller`
--
ALTER TABLE `taller`
  ADD CONSTRAINT `taller_id_metodologia_foreign` FOREIGN KEY (`id_metodologia`) REFERENCES `metodologia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_roles_foreign` FOREIGN KEY (`id_roles`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
