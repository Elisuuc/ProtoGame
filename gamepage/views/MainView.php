<?php

    //////////Se encarga de introducir todas las vistas en el layout principal////////////

    class MainView{
        public function __construct(){}
        
        protected function mostrar($plantilla){

            $plantillaMain=file_get_contents('layout/main.html');
            
            $diccionario=[
                '{CONTENT}'=>$plantilla
            ];

            $render= str_replace(array_keys($diccionario),
            array_values($diccionario),$plantillaMain);

            echo $render;
        }
    };

?>