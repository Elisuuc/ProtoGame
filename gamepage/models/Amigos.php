<?php

require_once 'connect/connect.php';

class Amigos{
    private $conexion;
    public function __construct(){
        $this->conexion=Connect::connectdb();
        $this->conexion=$this->conexion->getConexion();
    }

    ////////////////////////////////////////
    ///////////Getters Y Seters Amigos//////
    ////////////////////////////////////////

    //////////BUSCAR UN AMIGO///////////////
    public function getAmigo($nickInvitado, $nickInvita){
        $consulta='SELECT * FROM AMIGOS 
                    WHERE PERSONAJES_nickName=:nickInvita 
                    AND PERSONAJES_nickName1=:nickInvitado
                    OR PERSONAJES_nickName=:nickInvitado
                    AND PERSONAJES_nickName1=:nickInvita';
        $select=$this->conexion->prepare($consulta);

        $select->bindParam(':nickInvita',$nickInvita);
        $select->bindParam(':nickInvitado',$nickInvitado);
        $select->execute();

        $resultado=$select->fetchAll(PDO::FETCH_OBJ);

        return $resultado[0];//Devuelve varios resultados

    }

    /////////////GUARDAR AMIGO//////////////
    public function setAmigo($amigo){
        $consulta='INSERT INTO AMIGOS
                    VALUES (:usuario1, :usuario2, :aceptado);';
        
        $insert=$this->conexion->prepare($consulta);
        $insert->bindParam(':usuario1',$amigo->PERSONAJES_nickName);
        $insert->bindParam(':usuario2',$amigo->PERSONAJES_nickName1);
        $insert->bindParam(':aceptado',$amigo->aceptado);

        return $insert->execute();
    }

    ////////////////////////////////////////
    ////////////Otras funcionalidades///////
    ////////////////////////////////////////

    //////////////UPDATE DE AMIGO///////////
    public function updateAmigo($nickInvita,$nickInvitado){
        $consulta='UPDATE AMIGOS
                    SET aceptado=1
                    WHERE PERSONAJES_nickName=:nickInvita 
                    AND PERSONAJES_nickName1=:nickInvitado;';
        
        $update=$this->conexion->prepare($consulta);

        $update->bindParam(':nickInvita',$nickInvita);
        $update->bindParam(':nickInvitado',$nickInvitado);
        return $update->execute();
    }

    ///////OBTENER TODOS LOS AMIGOS/////////
    public function getAmigos($nick){
        $consulta="SELECT * FROM AMIGOS 
        WHERE (PERSONAJES_nickName=:nick 
        OR PERSONAJES_nickName1=:nick)
        AND aceptado=1;";
        $select=$this->conexion->prepare($consulta);

        $select->bindParam(':nick',$nick);

        $select->execute();

        $resultado=$select->fetchAll(PDO::FETCH_OBJ);

        return $resultado;
    }

    ///////ELIMINAR UN AMIGO////////////
    public function deleteAmigo($nickInvita,$nickInvitado){
        $consulta='DELETE FROM AMIGOS
                    WHERE PERSONAJES_nickName=:nickInvita 
                    AND PERSONAJES_nickName1=:nickInvitado
                    OR PERSONAJES_nickName=:nickInvitado 
                    AND PERSONAJES_nickName1=:nickInvita;';
        
        $delete=$this->conexion->prepare($consulta);

        $delete->bindParam(':nickInvita',$nickInvita);
        $delete->bindParam(':nickInvitado',$nickInvitado);

        echo $delete->execute();
    }
};

?>