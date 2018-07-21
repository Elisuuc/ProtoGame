<?php

    require_once 'MainView.php';

    class UsuarioView extends MainView{
        
        public function __construct(){}//Constructor vacio solo para instanciar el objeto
        
        public static function Login(){
            $plantilla=file_get_contents('views/templates/login.html');
            self::mostrar($plantilla);
        } 
    };

?>