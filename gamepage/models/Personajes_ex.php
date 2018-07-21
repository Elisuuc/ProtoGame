<?php

    require_once 'connect/connect.php';

    class Personajes_ex{
        private $conexion;

        public function __construct(){
            $this->conexion=Connect::connectdb();
            $this->conexion=$this->conexion->getConexion();
        }


        /////////OPTENER UNO DE LOS PERSONAJES CREADOS////////
        public function getPersonaje($nombre){
            $consulta='SELECT * FROM PERSONAJES_EXISTENTES WHERE nombre=:nombrePersonaje;';

            $select=$this->conexion->prepare($consulta);

            $select->bindParam(':nombrePersonaje',$nombre);
            $select->execute();

            $resultado=$select->fetchAll(PDO::FETCH_OBJ);
            return $resultado[0];
        }

        ///////////OPTENER TODOS LOS PERSONAJES EXISTENTEs EN EL JUEGO/////////
        public function getAll(){
            $consulta='SELECT * FROM PERSONAJES_EXISTENTES';

            $select=$this->conexion->prepare($consulta);

            $select->execute();

            $resultado=$select->fetchAll(PDO::FETCH_OBJ);

            return $resultado;
        }
    };

?>