<?php

    require_once 'models/Equipamiento.php';

    class EquipamientoController{
        public function getEquip(){
            $nick=$_SESSION['personaje']->nickName;
            @$model=new Equipamiento();

            $result=$model->getEquipamiento($nick);
            $result=json_encode($result);

            echo $result;
        }

        ///objetos por defecto de un personaje///
        public function setEquipDefault(){
            @$model=new Equipamiento();
            $equipamiento=[
                'PERSONAJES_nickName'=>$_SESSION['personaje']->nickName,
                'equipado'=>0,
                'cantidad'=>1,
                'nivel'=>1
            ];
            $equipamiento['OBJETOS_nombreObjeto']="Tary's sword";
            

            $espadaDefault=json_encode($equipamiento);
            $espadaDefault=json_decode($espadaDefault);
            echo $model->setEquipamiento($espadaDefault);

            $escudoDefault=$equipamiento['OBJETOS_nombreObjeto']='Bandit shield';
            

            $escudoDefault=json_encode($equipamiento);
            $escudoDefault=json_decode($escudoDefault);
            echo $model->setEquipamiento($escudoDefault);

            $pociones=$equipamiento['OBJETOS_nombreObjeto']='Health potion';
            $pociones=$equipamiento['cantidad']=3;

            $pociones=json_encode($equipamiento);
            $pociones=json_decode($pociones);
            echo $model->setEquipamiento($pociones);
        }


        public function actualizaEquipo(){
            $objeto=$_POST['objeto'];
            $objeto=json_encode($objeto);
            $objeto=json_decode($objeto);

            @$model=new Equipamiento();

            if($model->updateEquipamiento($objeto)){
                $result=$model->getEquipamiento($_SESSION['personaje']->nickName);

                echo json_encode($result);
            }
            else{
                echo 'no se ha podido actualizar correctament';
            }
        }
    };
?>