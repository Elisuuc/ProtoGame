<?php

require_once './connect/connect.php';

class Lugar{
    private $conexion;
    
    public function __construct(){
        $this->conexion=Connect::connectdb();
        $this->conexion=$this->conexion->getConexion();
    }


    ///////////////////////////////////////////
    //////////Getters y Setters de Lugar///////
    ///////////////////////////////////////////

    //////////////AGREGAR UN LUGAR////////////
    public function setLugar($lugar){
        $consulta="INSERT INTO LUGAR
                    VALUES(:nombreLugar,:TIENDA_nombreTienda);";
        $insert=$this->conexion->prepare($consulta);

        $insert->bindParam(':nombreLugar',$lugar->nombreLugar);
        $insert->bindParam(':TIENDA_nombreTienda',$lugar->TIENDA_nombreTienda);

        return $insert->execute();
    }

    /////////////OBTENER UN LUGAR/////////////
    public function getLugar($nombreLugar){
        $consulta="SELECT * FROM LUGAR WHERE nombreLugar=?;";

        $select=$this->conexion->prepare($consulta);

        $select->bindParam(1,$nombreLugar);
        $select->execute();
        $resultado=$select->fetchAll(PDO::FETCH_OBJ);

        return $resultado[0];
    }
};


?>