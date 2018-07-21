<?php

    require_once 'models/Usuario.php';
    require_once 'models/Personaje.php';
    require_once 'views/PersonajeView.php';

    class PersonajeController{
        public function nuevoPersonaje(){
            $vista=new PersonajeView();
            $vista->RegistrarPersonaje();
        }

        public function escogePersonaje(){
            $vista=new PersonajeView();
            @$model=new Personaje();

            $personajes=$model->getMyPersonajes($_SESSION['usuario']->correo);

            $vista->EscogePersonaje($personajes);
        }

        public function panelPrincipal(){
            $vista=new PersonajeView();
            $vista->panelPrincipal();
        }

        public function setPersonaje(){
            @$model=new Personaje();
            @$modelUsuario=new Usuario();
            $personaje=[
                'nickName'=>$_POST['nick'],
                'nivel'=>1,
                'experiencia'=>0,
                'maxExperiencia'=>100,
                'puntosVitalidad'=>$_POST['puntosVitalidad'],
                'puntosResistencia'=>$_POST['puntosResistencia'],
                'puntosFuerza'=>$_POST['puntosFuerza'],
                'puntosAgilidad'=>$_POST['puntosAgilidad'],
                'puntosDestreza'=>$_POST['puntosDestreza'],
                'activo'=>1,
                'puntuacion'=>0,
                'LUGAR_nombreLugar'=>'dojo',
                'USUARIO_correo'=>$_SESSION['usuario']->correo,
                'CLANES_nombreClan'=>null,
                'PERSONAJES_EXISTENTES_nombre'=>$_POST['nombrePersonaje']
            ];

            $personaje=json_encode($personaje);
            $personaje=json_decode($personaje);

            $_SESSION['personaje']=$personaje;

            $_SESSION['usuario']->NumPersonajes++;

            $modelUsuario->updateUsuario($_SESSION['usuario']);

            echo $model->setPersonaje($personaje);
        }

        public function guardaPersonaje(){
            @$model=new Personaje();
            $nick=$_POST['nick'];

            $personaje=$model->getPersonaje($nick);
            $_SESSION['personaje']=$personaje;
        }

        public function logout(){
            unset($_SESSION['usuario']);
            session_destroy();
            header('Location:../');
        }

        public function volverEscoger(){
            unset($_SESSION['personaje']);
            header('Location:../');
        }

        public function getPersonaje(){
            
            $personaje=$_SESSION['personaje'];

            $personaje=json_encode($personaje);

            echo $personaje;
        }

        public function getPersonajes(){
            @$model=new Personaje();
            $personajes=$model->getPersonajes();

            $personajes=json_encode($personajes);

            return $personajes;
        }

        public function getAmigo(){
            @$model=new Personaje();
            $nickAmigo=$_POST['nick'];
            
            $personaje=$model->getPersonaje($nickAmigo);
            if($personaje===null){
                echo false;
            }
            else{
                echo json_encode($personaje);
            }
        }

        public function eliminarPersonaje(){
            @$model=new Personaje();
            @$modelUsuario=new Usuario();

            $_SESSION['usuario']->NumPersonajes--;

            $modelUsuario->updateUsuario($_SESSION['usuario']);

            $estado=$model->deletePersonaje($_POST['nick']);
        }

        public function obtenerRanking(){
            @$model=new Personaje();
            $ranking=$model->obtenerRanking();

            echo json_encode($ranking);
        }
    };

?>