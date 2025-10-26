<?php
    /**
     * Script para conectar a MySQL y obtener todos los datos necesarios
     * para alimentar la IA, usando la base de datos 'app_crediticia'.
     */
    // --- CONFIGURACIÓN DE LA BASE DE DATOS ---
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "app_crediticia"; // Nombre de la BD según tu script de MySQL

    /**
     * Establece la conexión a la base de datos MySQL.
     * @return mysqli|null La conexión o null en caso de error.
     */
    function connectDB() {
        global $db_server, $db_user, $db_pass, $db_name;

        // Usamos mysqli orientado a objetos
        $conn = new mysqli($db_server, $db_user, $db_pass, $db_name);

        if ($conn->connect_error) {
            // En un entorno de producción, loguearías esto, no usarías 'die'.
            error_log("Error de conexión a la base de datos: " . $conn->connect_error);
            return null;
        }
        return $conn;
    }


    // --- FUNCIONES DE RECOLECCIÓN DE DATOS PARA LA IA ---

    /**
     * 1. Obtiene los datos principales del cliente y su ID de banco asociado.
     * Campos necesarios: first_name (si existe), customer_id_banco
     * @param int $appUserId El ID interno del usuario logueado en tu tabla 'Usuarios'.
     * @return array|null Datos del usuario y su ID de banco o null.
     */
    function getCustomerInfoForAI($appUserId) {
        $conn = connectDB();
        if (!$conn) return null;
        
        // Consulta a tu tabla 'Usuarios'
        $stmt = $conn->prepare("SELECT customer_id_banco, nombre, email FROM Usuarios WHERE id = ?");
        $stmt->bind_param("i", $appUserId);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $conn->close();

        if ($user) {
            // Usar nombre o parte del email
            $firstName = $user['nombre'] ?? explode('@', $user['email'])[0];
            // En caso de que el nombre sea NULL, usamos la parte del email (como en tu ejemplo)
            if ($firstName === NULL || $firstName === '') {
                $firstName = explode('@', $user['email'])[0];
            }

            return [
                'first_name' => $firstName,
                'customer_id_banco' => $user['customer_id_banco'],
                // Simulamos el campo 'address' con datos ficticios o estáticos si no está en la BD
                'address' => [
                    'street_number' => '123',
                    'street_name' => 'Fake St',
                    'city' => 'Anytown',
                    'state' => 'CA',
                    'zip' => '90210'
                ]
            ];
        }
        return null;
    }

    /**
     * 2. Obtiene las cuentas (tarjetas de crédito/ahorro)
     * Campos necesarios: balance, type, nickname
     * @param string $customerIdBanco El ID del cliente de banco (customer_id_banco).
     * @return array|null Lista de cuentas.
     */
    function getAccountsDataFromDB($customerIdBanco) {
        $conn = connectDB();
        if (!$conn) return null;

        // CONSULTA CORREGIDA: Eliminada la columna 'rewards' ya que no existe en tu tabla Cuentas.
        $sql = "SELECT account_id, type, nickname, balance FROM Cuentas WHERE customer_id_banco = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $customerIdBanco);
        $stmt->execute();
        $result = $stmt->get_result();
        $accounts = $result->fetch_all(MYSQLI_ASSOC);
        $conn->close();

        return $accounts;
    }

    /**
     * 3. Obtiene los detalles de las compras y comerciantes asociados.
     * Campos necesarios: purchase_date, amount, description, category
     * @param string $customerIdBanco El ID del cliente de banco (customer_id_banco).
     * @return array|null Lista detallada de compras con su categoría.
     */
    function getPurchasesWithCategoryFromDB($customerIdBanco) {
        $conn = connectDB();
        if (!$conn) return null;

        // Unimos Compras con Cuentas (para filtrar por cliente) y Comerciantes (para la categoría)
        $sql = "SELECT 
                    p.purchase_date, 
                    p.amount, 
                    p.description, 
                    m.category 
                FROM Compras p
                JOIN Cuentas c ON p.account_id = c.account_id
                JOIN Comerciantes m ON p.merchant_id = m.merchant_id
                WHERE c.customer_id_banco = ?
                ORDER BY p.purchase_date DESC";
                
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $customerIdBanco);
        $stmt->execute();
        $result = $stmt->get_result();
        $purchases = $result->fetch_all(MYSQLI_ASSOC);
        $conn->close();

        return $purchases;
    }

    /**
     * FUNCIÓN FINAL: Consolida todos los datos del usuario en un único array para la IA.
     * Esta función es la que llama tu script del dashboard para obtener todos los datos.
     * @param int|null $appUserId El ID interno del usuario (tomado de la sesión, si existe).
     * @return array Un array con la información estructurada.
     */
    function compileAIData($appUserId = null) {
        // Si no se pasa el ID, intenta tomarlo de la sesión
        if ($appUserId === null && isset($_SESSION['usuario_id'])) {
            $appUserId = $_SESSION['usuario_id'];
        }

        if ($appUserId === null) {
            return ['error' => 'Usuario no autenticado o ID de sesión no encontrado.'];
        }
        
        // Paso 1: Obtener el ID del banco del usuario de tu aplicación
        $customerInfo = getCustomerInfoForAI($appUserId);

        if (empty($customerInfo) || empty($customerInfo['customer_id_banco'])) {
            return ['error' => 'No se encontró la información del cliente o no tiene un ID de banco asociado.'];
        }

        $customerIdBanco = $customerInfo['customer_id_banco'];

        // Paso 2: Obtener Cuentas
        $accounts = getAccountsDataFromDB($customerIdBanco);

        // Paso 3: Obtener Compras y Categorías
        $purchases = getPurchasesWithCategoryFromDB($customerIdBanco);

        // --- Estructura de salida limpia y consolidada para la IA ---
        $dataForAI = [
            'customer' => $customerInfo,
            'accounts_summary' => [],
            'purchases_detail' => $purchases
        ];

        // Procesamos las cuentas
        if (is_array($accounts)) {
            foreach ($accounts as $account) {
                $dataForAI['accounts_summary'][] = [
                    'type' => $account['type'],
                    'nickname' => $account['nickname'],
                    'balance' => $account['balance']
                ];
            }
        }
        
        return $dataForAI;
    }
?>