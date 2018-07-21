<?php

    require_once 'controllers/EquipamientoController.php';
    require_once 'controllers/UsuarioController.php';
    require_once 'controllers/PersonajeController.php';
    require_once 'controllers/Personajes_exController.php';
    require_once 'controllers/AmigosController.php';
    
    session_start();
    //Comprueba lo que se solicita en la url//
    $uri=explode('/',$_SERVER['REQUEST_URI']);
    
    //REDIRECCIONES POR DEFECTO//
    if(isset($uri[2]) && isset($uri[3])){
        $controller=$uri[2];
        $action=$uri[3];
    }
    else{
        if(isset($_SESSION['usuario']) && !isset($_SESSION['personaje'])){
            header('Location:Character/ChooseCharacter');
        }
        elseif(isset($_SESSION['usuario']) && isset($_SESSION['personaje'])){
            header('Location:Character/MainPanel');
        }
        else{
            header('Location:User/loginPage');
        }
    }
    ///////////////////////////////
    
    if(isset($_SESSION['usuario']) && isset($_SESSION['personaje'])){//Si el usuario tiene un personaje iniciado
        switch($controller){
            case "User":
                echo "aun no esta implementado";
            break;

            case "Character":
                switch($action){
                    case "MainPanel":
                        PersonajeController::panelPrincipal();
                    break;
                    case "GetCharacter":
                        PersonajeController::getPersonaje();
                    break;
                    case "DataCharacter":
                        Personajes_exController::getPersonaje();
                    break;
                    case "GetEquip":
                        EquipamientoController::getEquip();
                    break;
                    case "UpdateEquipment":
                        EquipamientoController::actualizaEquipo();
                    break;
                    case "GetFriend":
                        PersonajeController::getAmigo();
                    break;
                    case "SetFriend":
                        AmigosController::setAmigo();
                    break;
                    case "UpdateFriend":
                        AmigosController::updateAmigo();
                    break;
                    case "DeleteFriend":
                        AmigosController::deleteAmigo();
                    break;
                    case "GetFriends":
                        AmigosController::getAmigos();
                    break;
                    case "Logout":
                        PersonajeController::logout();
                    break;
                    case "GoToList":
                        PersonajeController::volverEscoger();
                    break;
                    case "prueba":
                        EquipamientoController::setEquipDefault();
                    break;
                    case "Ranking":
                        PersonajeController::obtenerRanking();
                    break;
                }
            break;
        }
    }
    elseif(isset($_SESSION['usuario'])){//Esto solo estara disponible si el usuario ha iniciado la session
        switch($controller){
            case "User":
                echo "aun no esta implementado";
            break;

            case "Character":
                switch($action){
                    case "SignInCharacter":
                        PersonajeController::nuevoPersonaje(); //Pagina de registro del nuevo personaje
                    break;
                    case "ChooseCharacter":
                        PersonajeController::escogePersonaje();//Pagina para la eleccion de personajes ya creados
                    break;
                    case "GetCharacters":
                        Personajes_exController::getAll();//Peticion para mostrar los personajes del juego existentes
                    break;
                    case "SetCharacter":
                        if($_SESSION['usuario']->NumPersonajes!==$_SESSION['usuario']->MaxNumPersonajes){
                            PersonajeController::setPersonaje();
                            EquipamientoController::setEquipDefault();
                        }
                        else{
                            
                        }
                    break;
                    case "SaveCharacter":
                        PersonajeController::guardaPersonaje();
                    break;
                    case "DeleteCharacter":
                        PersonajeController::eliminarPersonaje();
                    break;
                }
            break;   
        }
    }
    else{
        switch($controller){//esto estara disponible si el usuario no ha iniciado la sesion
            case "User":
                switch($action){
                    case "loginPage":
                        UsuarioController::loginPage();
                    break;
                    case "signin":
                        UsuarioController::registrar();
                    break;
                    case "login":
                        UsuarioController::login();
                    break;
                    default:
                        echo "No tienes acceso";
                    break;
                }
            break;
            default:
                echo "No tienes acceso";
            break;
        }
    }
?>