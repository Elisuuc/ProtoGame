<?php

    require_once 'connect/connect.php';

    class Personaje{
        private $conexion;

        public function __construct(){
            $this->conexion=Connect::connectdb();
            $this->conexion=$this->conexion->getConexion();
        }

        //////////////////////////////////////
        ///////////Getters y setters//////////
        //////////////////////////////////////

        ///////////REGISTRA EL PERSONAJE//////
        public function setPersonaje($personaje){
            $consulta='INSERT INTO PERSONAJES(nickName,puntosVitalidad,puntosResistencia,puntosFuerza,puntosAgilidad,puntosDestreza,LUGAR_nombreLugar,USUARIO_correo,CLANES_nombreClan,PERSONAJES_EXISTENTES_nombre)
                        VALUES(
                            :nick,
                            :puntosVitalidad,
                            :puntosResistencia,
                            :puntosFuerza,
                            :puntosAgilidad,
                            :puntosDestreza,
                            :LUGAR,
                            :USUARIO,
                            :CLANES,
                            :PERSONAJES_EXISTENTES
                        );';
            
            $insert=$this->conexion->prepare($consulta);
            $insert->bindParam(':nick',$personaje->nickName);
            $insert->bindParam(':puntosVitalidad',$personaje->puntosVitalidad);
            $insert->bindParam(':puntosResistencia',$personaje->puntosResistencia);
            $insert->bindParam(':puntosFuerza',$personaje->puntosFuerza);
            $insert->bindParam(':puntosAgilidad',$personaje->puntosAgilidad);
            $insert->bindParam(':puntosDestreza',$personaje->puntosDestreza);
            $insert->bindParam(':LUGAR',$personaje->LUGAR_nombreLugar);
            $insert->bindParam(':USUARIO',$personaje->USUARIO_correo);
            $insert->bindParam(':CLANES',$personaje->CLANES_nombreClan);
            $insert->bindParam(':PERSONAJES_EXISTENTES',$personaje->PERSONAJES_EXISTENTES_nombre);

            return $insert->execute();
        }

        //////////OBTIENE LOS DATOS DEL PERSONAJE//////
        public function getPersonaje($nickPersonaje){
            $consulta='SELECT * FROM PERSONAJES WHERE nickName=:nick;';
            $select=$this->conexion->prepare($consulta);
            $select->bindParam(':nick',$nickPersonaje);
            $select->execute();

            $resultado=$select->fetchAll(PDO::FETCH_OBJ);

            if(count($resultado)===0){
                return null;
            }
            else{
                return $resultado[0];
            } 
        }

        /////////OBTIENE LOS PRIMEROS 20 PERSONAJES//////
        public function getPersonajes(){
            $consulta='SELECT * FROM PERSONAJES LIMIT 20;';

            $select=$this->conexion->prepare($consulta);
            $select->execute();

            $resultado=$select->fetchAll(PDO::FETCH_OBJ);

            return $resultado;
        }

        ////////OBTIENE LOS PERSONAJES DEL USUARIO//////
        public function getMyPersonajes($correo){
            $consulta='SELECT nickName,nivel,experiencia,maxExperiencia,imagenes
                        FROM PERSONAJES, PERSONAJES_EXISTENTES
                        WHERE nombre=PERSONAJES_EXISTENTES_nombre
                        AND USUARIO_correo=:micorreo;';
        
            $select=$this->conexion->prepare($consulta);
            $select->bindParam(':micorreo',$correo);
            
            $resultado=$select->execute() ? $resultado=$select->fetchAll(PDO::FETCH_OBJ) : "ERROR";

            return $resultado;
        }


        ///////////////////////////////////////////////
        ////////OTROS METODOS PARA PEROSNAJE///////////
        ///////////////////////////////////////////////

        //////ACTUALIZA LOS DATOS DEL PERSONAJE////////
        public function actualizarPersonaje($personaje){
            $consulta='UPDATE PERSONAJES
                        SET nivel=:nivel, experiencia=:experiencia, maxExperiencia=:maxExperiencia, puntosVitalidad=:puntosVitalidad, puntosResistencia=:puntosResistencia, puntosFuerza=:puntosFuerza, puntosAgilidad=:puntosAgilidad, puntosDestreza=:puntosDestreza , CLANES_nombreClan=:CLAN
                        WHERE nickName=:nickname;';
            $update=$this->conexion->prepare($consulta);
            $update->bindParam(':nivel',$personaje->nivel);
            $update->bindParam(':experiencia',$personaje->experiencia);
            $update->bindParam(':masExperiencia',$personaje->maxExperiencia);
            $update->bindParam(':puntosVitalidad',$personaje->puntosVitalidad);
            $update->bindParam(':puntosResistencia',$personaje->puntosResistencia);
            $update->bindParam(':puntosFuerza',$personaje->puntosFuerza);
            $update->bindParam(':puntosAgilidad',$personaje->puntosAgililidad);
            $update->bindParam(':puntosDestreza',$personaje->puntosDestreza);
            $update->bindParam(':CLAN',$personaje->CLANES_nombreClan);

            return $update->execute();
        }

        public function deletePersonaje($nick){
            $consulta='DELETE FROM PERSONAJES
                        WHERE nickName=:nick';

            $delete=$this->conexion->prepare($consulta);
            $delete->bindParam(':nick',$nick);

            return $delete->execute();
        }

        public function obtenerRanking(){
            $consulta='SELECT nickName, puntuacion
                        FROM PERSONAJES
                        ORDER BY puntuacion DESC
                        LIMIT 10';
            
            $select=$this->conexion->prepare($consulta);
            $select->execute();

            return $select->fetchAll(PDO::FETCH_OBJ);
        }
    };

?>