<?php

require_once './connect/connect.php';


/////////////////Este modelo solo puede ser modificado por mi, por lo tanto solo necesitamos un get///////////////
class Objeto{
    private $conexion;

    public function __construct(){
        $this->conexion=Connect::connectdb();
        $this->conexion=$this->conexion->getConexion();
    }

    /////////////////////////////////////////
    ////////Getters y Setters de Objeto//////
    /////////////////////////////////////////

    //////////OBTENER UN OBJECTO/////////////
    public function getObjeto($nombreObjeto){
        $consulta='SELECT * FROM OBJETOS WHERE nombreObjeto=?;';

        $select=$this->conexion->prepare($consulta);
        $select->bindParam(1,$nombreObjeto);

        $select->execute();

        $resultado=$select->fetchAll(PDO::FETCH_OBJ);
        return $resultado[0];
    }
};

?>