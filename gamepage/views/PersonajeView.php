<?php
    require_once 'MainView.php';

    class PersonajeView extends MainView{
        
        public function __construct(){}

        public static function RegistrarPersonaje(){
            $plantilla=file_get_contents('views/templates/personajeReg.html');
            self::mostrar($plantilla);
        }
    
        public static function EscogePersonaje($personajes){
            $plantilla=file_get_contents('views/templates/elegirPersonaje.html');

            //2. Obtención del código HTML iterativo en PHP:
            $regex = "/<!-- personajes -->(.|\n){1,}<!-- personajes -->/";
            preg_match($regex, $plantilla, $matches); # $matches se define al vuelo
            $match = $matches[0];

            //3. Sustitución iterativa en PHP:
            $render = "";
            foreach($personajes as $key=>$personaje) {
                $diccionario = [
                    '{IMAGEN}'=>$personaje->imagenes,
                    '{NOMBRE}'=>$personaje->nickName,
                    '{NIVEL}'=>$personaje->nivel,
                    '{EXPERIENCIA}'=>$personaje->experiencia,
                    '{MAXEXPERIENCIA}'=>$personaje->maxExperiencia,
                ];
                $render .= str_replace(array_keys($diccionario),
                array_values($diccionario), $match);
            }

            //4. Sustitución del match por el render en PHP:
            $plantilla = str_replace($match, $render, $plantilla);

            $diccionario=[
                '{NUMPERSONAJES}'=>$_SESSION['usuario']->NumPersonajes,
                '{MAXNUMPERSONAJES}'=>$_SESSION['usuario']->MaxNumPersonajes
            ];

            $render_final= str_replace(array_keys($diccionario),array_values($diccionario),$plantilla);

            self::mostrar($render_final);
        }

        public static function PanelPrincipal(){
            $plantilla=file_get_contents('views/templates/panelPrincipal.html');
            self::mostrar($plantilla);
        }
    };


?>