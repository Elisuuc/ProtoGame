<?php

require_once 'connect/connect.php';

class Usuario{
    private $conexion;

    public function __construct(){
        $this->conexion=Connect::connectdb();
        $this->conexion=$this->conexion->getConexion();
    }

    //////////////////////////////////////
    ///////////Getters y setters//////////
    //////////////////////////////////////

    /////////REGISTRAR USUARIO////////////
    public function setUsuario($usuario){
        $consulta='INSERT INTO USUARIO
                    VALUES(:correo,:pass,:descuento,:personajes,:maxpersonajes,:monpago,:monjuego,:fechaR,:activo);';

        $insert=$this->conexion->prepare($consulta);
        
        $insert->bindParam(':correo',$usuario->correo);
        $insert->bindParam(':pass',$usuario->pass);
        $insert->bindParam(':descuento',$usuario->descuentoAcumulado);
        $insert->bindParam(':personajes',$usuario->NumPersonajes);
        $insert->bindParam(':maxpersonajes',$usuario->MaxNumPersonajes);
        $insert->bindParam(':monpago',$usuario->monedasPago);
        $insert->bindParam(':monjuego',$usuario->monedasJuego);
        $insert->bindParam(':fechaR',$usuario->fechaRegistro);
        $insert->bindParam(':activo',$usuario->activo);
    
        return $insert->execute();
    }

    //////////OBTENER UN USUARIO//////////
    public function getUsuario($correo){
        
        $consulta='SELECT * FROM USUARIO WHERE correo=?;';
        $stmt=$this->conexion->prepare($consulta);
        $stmt->bindParam(1,$correo);
        $stmt->execute();

        if($resultado=$stmt->fetchAll(PDO::FETCH_OBJ)){
            return $resultado[0];
        }
        else{
            return false;
        }
        
    }

    ///////////ACTUALIZAR EL USUARIO//////////
    public function updateUsuario($usuario){
        $consulta='UPDATE USUARIO
                    SET NumPersonajes=:NumPersonajes
                    WHERE correo=:correo;';
        
        $update=$this->conexion->prepare($consulta);
        $update->bindParam(':NumPersonajes',$usuario->NumPersonajes);
        $update->bindParam(':correo',$usuario->correo);

        $update->execute();
    }
};

?>