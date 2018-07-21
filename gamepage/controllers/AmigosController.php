<?php

    require_once 'models/Amigos.php';

    class AmigosController{
        public function setAmigo(){
            @$model=new Amigos();

            $nickInvitado=$_POST['nickInvitado'];
            $nickInvita=$_SESSION['personaje']->nickName;
            $comprueba=$_POST['comprueba'];

            if($comprueba){
                @$resultado=$model->getAmigo($nickInvitado,$nickInvita);


                if(@$resultado->PERSONAJES_nickName1===$nickInvitado || @$resultado->PERSONAJES_nickName===$nickInvitado){
                    echo "Ya esta";
                }
            }
            else{
                $amigo=[
                    'PERSONAJES_nickName'=> $nickInvita,
                    'PERSONAJES_nickName1'=> $nickInvitado,
                    'aceptado'=>0
                ];

                $amigo=json_encode($amigo);
                $amigo=json_decode($amigo);

                echo $model->setAmigo($amigo);
            }
        }

        public function updateAmigo(){
            @$model=new Amigos();

            $nickInvita=$_POST['nick'];
            $nickInvitado=$_SESSION['personaje']->nickName;

            echo $model->updateAmigo($nickInvita,$nickInvitado);
        }

        public function deleteAmigo(){
            @$model=new Amigos();

            $nickInvita=$_POST['nick'];
            $nickInvitado=$_SESSION['personaje']->nickName;

            echo $model->deleteAmigo($nickInvita,$nickInvitado);
        }

        public function getAmigos(){
            @$model=new Amigos();

            $nick=$_SESSION['personaje']->nickName;

            $resultado=$model->getAmigos($nick);

            $resultado=json_encode($resultado);

            echo $resultado;
        }
    };

?>