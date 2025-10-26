<?php
    session_start();

    include 'SQLito.php';

    // Obtener el ID de usuario logueado de la sesión
    $usuario_id_logueado = $_SESSION['usuario_id'] ?? null;

    // Establece el encabezado para indicar que la respuesta será JSON
    header('Content-Type: text/plain');

    if ($usuario_id_logueado) {
        $aiInput = compileAIData($usuario_id_logueado);
        echo json_encode($aiInput, JSON_PRETTY_PRINT);
        exit(); 
        
    } else {
        // Si no hay sesión, enviar un JSON de error de autenticación.
        $error_response = [
            'error' => 'Acceso denegado.', 
            'message' => 'Por favor, inicie sesión para acceder a los datos.'
        ];
        http_response_code(401);
        echo json_encode($error_response, JSON_PRETTY_PRINT);
        exit();
    }

?>
