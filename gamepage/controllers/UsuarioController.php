<?php

    require_once "models/Usuario.php";
    require_once "views/UsuarioView.php";

    class UsuarioController{
        public function loginPage(){
            $vista = new UsuarioView();
            $vista->Login();
        }

        public function registrar(){
            $correo=$_REQUEST['correo'];
            $pass=$_REQUEST['pass'];

            @$usuario=new Usuario();
            $existe=null;

            if($existe=$usuario->getUsuario($correo)){
                echo false;
            }
            else{
                $nuevoUsuario=[
                    "correo"=>$correo,
                    "pass"=>$pass,
                    "descuentoAcumulado" => 0,
                    "NumPersonajes" => 0,
                    "MaxNumPersonajes" => 3,
                    "monedasPago" => 50,
                    "monedasJuego" => 200,
                    "fechaRegistro" => date('y-m-d'),
                    "activo" => 0,
                ];

                //TRANSFORMAMOS EL ARRAY EN OBJETO//
                $nuevoUsuario=json_encode($nuevoUsuario);
                $nuevoUsuario=json_decode($nuevoUsuario);

                $_SESSION['usuario']=$nuevoUsuario;

                echo $usuario->setUsuario($nuevoUsuario);
            }
            
        }

        public function login(){
            $correo=$_REQUEST['correo'];
            $pass=$_REQUEST['pass'];

            @$modelo=new Usuario();

            if($usuario=$modelo->getUsuario($correo)){
                if($pass===$usuario->pass){
                    $_SESSION['usuario']=$usuario;
                    echo true;
                }
                else{
                    echo false;
                }
            }
            else{
                echo "noesta";
            }
        }
    };

?>