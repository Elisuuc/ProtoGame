<?php
    ///CONEXION A LA BASE DE DATOS CON PATRON SINGLETON (UNA UNICA CONEXION)///
    class Connect{
        private static $connection;

        private function __construct(){
            $this->connection=new PDO('mysql:host=localhost;dbname=elisuuc', 'root', '');
        }

        private function __clone(){}

        public static function connectdb(){
            if(!isset(self::$connection)){
                self::$connection=new self();
            }
            return self::$connection;
        }  

        public function getConexion(){
            return $this->connection;
        }
    };
?>