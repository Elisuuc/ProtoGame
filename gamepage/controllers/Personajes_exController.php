<?php

    require_once 'models/Personajes_ex.php';

    class Personajes_exController{
        public function getAll(){
            @$Personajes=new Personajes_ex();

            $lista_personajes=$Personajes->getAll();

            $lista_personajes=json_encode($lista_personajes);

            echo $lista_personajes;
        }

        public function getPersonaje(){
            @$model=new Personajes_ex();

            $user_data=$_SESSION['personaje'];

            $personaje=$model->getPersonaje($user_data->PERSONAJES_EXISTENTES_nombre);

            echo json_encode($personaje);
        }
    };

?>