<?php

    require_once 'connect/connect.php';

    class Equipamiento{
        private $conexion;
    
        public function __construct(){
            $this->conexion=Connect::connectdb();
            $this->conexion=$this->conexion->getConexion();
        }

        ////////////////////////////////////////////////
        ////////Getter y Setters de Equipamiento////////
        ////////////////////////////////////////////////

        public function setEquipamiento($equipamiento){
            $consulta='INSERT INTO EQUIPAMIENTO
                        VALUES(:nick,:nombreObjeto,:equipado,:cantidad,:nivel);';

            $insert=$this->conexion->prepare($consulta);
            $insert->bindParam(':nick',$equipamiento->PERSONAJES_nickName);
            $insert->bindParam(':nombreObjeto',$equipamiento->OBJETOS_nombreObjeto);
            $insert->bindParam(':equipado',$equipamiento->equipado);
            $insert->bindParam(':cantidad',$equipamiento->cantidad);
            $insert->bindParam(':nivel',$equipamiento->nivel);
           
            return $insert->execute();
        }

        public function getEquipamiento($nick){
            $consulta='SELECT * FROM EQUIPAMIENTO, OBJETOS 
                        WHERE nombreObjeto=OBJETOS_nombreObjeto
                        AND PERSONAJES_nickName=?;';

            $select=$this->conexion->prepare($consulta);
            $select->bindParam(1,$nick);

            $select->execute();

            $resultado=$select->fetchAll(PDO::FETCH_OBJ);

            return $resultado;//Devuelve varios resultados
        }

        ///////////OTRAS OPCIONES DEL EQUIPAMIENTO/////////
        public function updateEquipamiento($equipamiento){
            $consulta='UPDATE EQUIPAMIENTO
                        SET PERSONAJES_nickName=:nick, OBJETOS_nombreObjeto=:nombreObjeto, equipado=:equipado, cantidad=:cantidad, nivel=:nivel
                        WHERE PERSONAJES_nickName=:nick AND OBJETOS_nombreObjeto=:nombreObjeto;';
            
            $update=$this->conexion->prepare($consulta);
            $update->bindParam(':nick',$equipamiento->PERSONAJES_nickName);
            $update->bindParam(':nombreObjeto',$equipamiento->OBJETOS_nombreObjeto);
            $update->bindParam(':equipado',$equipamiento->equipado);
            $update->bindParam(':cantidad',$equipamiento->cantidad);
            $update->bindParam(':nivel',$equipamiento->nivel);

            return $update->execute();
        }
    };

?>