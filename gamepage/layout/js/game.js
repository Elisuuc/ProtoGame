///////EL JUEGO//////////


    let comprueba=document.getElementsByTagName('canvas');
    ///////////Creamos el canvas//////////////
    //if(comprueba.length===0){
        let canvas=document.createElement('canvas');
        canvas.style='background-color:#202020';
        canvas.width=800;
        canvas.height=600;
        document.body.appendChild(canvas);
    //}

    let ctx=canvas.getContext('2d');
    ////////CARGA DE IMAGENES//////
    let spriteJugador1=new Image();
    spriteJugador1.src=app.combate.jugador1.sprites;//se obtiene los sprites del primer jugador
    spriteJugador1.onload=()=>{
        let spriteJugador2=new Image();
        spriteJugador2.src=app.combate.jugador2.sprites;//se obtiene los sprites del segundo jugador

        /////////////ACCIONES//////////
        

        let fotogramaP1=0;
        let fotogramaP2=0;
        let spritePosicionP1={
            spriteX:0,
            spriteY:0,
            anchoVentana:130,//alfinal
            altoVentana:146,//alfinal
            posicionCanvasX:150,
            posicionCanvasY:200,
        };
        let spritePosicionP2={
            spriteX:0,
            spriteY:0,
            anchoVentana:130,//alfinal
            altoVentana:146,//alfinal
            posicionCanvasX:540,
            posicionCanvasY:200,
        };

        let turno=0;

        let jugador1=jugador();
        let jugador2=jugador();

        let numeroAtaques=jugador().numAtaques(30);

        let arriba=false;
        let derecha=false;
        let abajo=false;
        let izquierda=false;
        let contadorAtaques=-1;


        canvas.onclick=(event)=>{
            //ataque arriba//
            if(event.clientX-canvas.offsetLeft>360 && event.clientX-canvas.offsetLeft<410){
                if(event.clientY-canvas.offsetTop>350 && event.clientY-canvas.offsetTop<400 && !arriba){
                    arriba=true;
                    contadorAtaques++;
                }
                else{
                    console.log("ya has atacado arriba");
                }
            }

            //ataque derecha//
            if(event.clientX-canvas.offsetLeft>410 && event.clientX-canvas.offsetLeft<460){
                if(event.clientY-canvas.offsetTop>400 && event.clientY-canvas.offsetTop < 450 && !derecha){
                    derecha=true;
                    contadorAtaques++;
                }
                else{
                    console.log('ya has atacado a la derecha');
                }
            }

            //ataque abajo//
            if(event.clientX-canvas.offsetLeft>360 && event.clientX-canvas.offsetLeft<410){
                if(event.clientY-canvas.offsetTop>450 && event.clientY-canvas.offsetTop<500 && !abajo){
                    abajo=true;
                    contadorAtaques++;
                }
                else{
                    console.log("ya has atacado abajo");
                }
            }

            //ataque derecha//
            if(event.clientX-canvas.offsetLeft>310 && event.clientX-canvas.offsetLeft<360){
                if(event.clientY-canvas.offsetTop>400 && event.clientY-canvas.offsetTop < 450 && !izquierda){
                    izquierda=true;
                    contadorAtaques++;
                }
                else{
                    console.log('ya has atacado a la izquierda');
                }
            }

            //cuando llega al maximo de ataques//
            if(contadorAtaques===numeroAtaques){
                jugador1.estado='ataque1';
                turno=1;
            }
        }




        //nucleo del juego//
        update=()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);

            //muestra los nombres de los jugadores//
            ctx.font="bold 22px sans-serif";
            ctx.fillStyle='white';
            ctx.fillText(app.combate.jugador1.nick,150,180);
            ctx.fillText(app.combate.jugador2.nick,550,180);
            ////////////////////////////////////////

            //muestra al primer jugador//
            jugador1.mostrar();

            //muestra al segundo jugador//
            jugador2.mostrar(1);

            if(turno===0 && app.combate.jugador1.nick===app.mipersonaje.nickName){
                //muestra los controles del primer jugador//
                jugador1.controles();
            }
            else if(turno===1 && app.combate.jugador2.nick===app.mipersonaje.nickName){
                jugador2.controles();
            }
        }


        setInterval(update,120);








        function jugador(){
            return{
                estado:'parado',
                
                animacion:{
                    parado:fotograma=>{
                        const parado=[3,4,5,4];
                        return parado[fotograma];
                    },
                    ataque1:fotograma=>{
                        const ataque1=[0,1,2,3];
                        return ataque1[fotograma];
                    },
                    ataque2:fotograma=>{
                        const ataque2=[0,1,2,3,4,5,6,7];
                        return ataque2[fotograma];
                    },
                    ataque3:fotograma=>{
                        const ataque3=[0,1,2,3,4,5,6];
                        return ataque3[fotograma];
                    }
                },
                mostrar:num=>{
                    if(num!==1){
                        switch(jugador1.estado){
                            case 'parado':
                                fotogramaP1>=3?fotogramaP1=0 : fotogramaP1++ ;
                                spritePosicionP1.spriteX=jugador1.animacion.parado(fotogramaP1)*130;
                                spritePosicionP1.spriteY=0;
                                console.log(numeroAtaques);
                            break;
                            case 'ataque1':
                                if(fotogramaP1>=3){
                                    if(numeroAtaques>=0){
                                        jugador1.estado='ataque2';
                                        numeroAtaques--;
                                        console.log(numeroAtaques);
                                    }
                                    else{
                                        jugador1.estado='parado';
                                    }
                                    fotogramaP1=0;
                                }
                                else
                                fotogramaP1++;
                
                                spritePosicionP1.spriteX=jugador1.animacion.ataque1(fotogramaP1)*130;
                                spritePosicionP1.spriteY=146;
                            break;
                            case 'ataque2':
                                if(fotogramaP1>=6){
                                    if(numeroAtaques>=0){
                                        jugador1.estado='ataque3';
                                        numeroAtaques--;
                                        console.log(numeroAtaques);
                                    }
                                    else
                                    jugador1.estado='parado';
                
                                    fotogramaP1=0;
                                }
                                else 
                                fotogramaP1++ ;
                
                                spritePosicionP1.spriteX=jugador1.animacion.ataque2(fotogramaP1)*130;
                                spritePosicionP1.spriteY=292;
                            break;
                            case 'ataque3':
                                if(fotogramaP1>=5){//if para ataquefinal
                                    jugador1.estado='parado';
                                    fotogramaP1=0;
                                    console.log(numeroAtaques);
                                }
                                else 
                                fotogramaP1++ ;
                
                                spritePosicionP1.spriteX=jugador1.animacion.ataque3(fotogramaP1)*130;
                                spritePosicionP1.spriteY=438;
                            break;
                        }

                        ctx.drawImage(
                            spriteJugador1,
                            spritePosicionP1.spriteX,
                            spritePosicionP1.spriteY,
                            spritePosicionP1.anchoVentana,
                            spritePosicionP1.altoVentana,
                            spritePosicionP1.posicionCanvasX,
                            spritePosicionP1.posicionCanvasY,
                            spritePosicionP1.anchoVentana,
                            spritePosicionP1.altoVentana
                        );
                    }
                    else{
                        switch(jugador2.estado){
                            case 'parado':
                                fotogramaP2>=3?fotogramaP2=0 : fotogramaP2++ ;
                                spritePosicionP2.spriteX=jugador2.animacion.parado(fotogramaP2)*130;
                                spritePosicionP2.spriteY=0;
                            break;
                            case 'ataque1':
                                if(fotogramaP2>=3){
                                    if(numeroAtaques>=0){
                                        jugador2.estado='ataque2';
                                        numeroAtaques--;
                                    }
                                    else{
                                        jugador2.estado='parado';
                                    }
                                    fotogramaP2=0;
                                }
                                else
                                fotogramaP2++;
                
                                spritePosicionP2.spriteX=jugador2.animacion.ataque1(fotogramaP2)*130;
                                spritePosicionP2.spriteY=146;
                            break;
                            case 'ataque2':
                                if(fotogramaP2>=6){
                                    if(numeroAtaques>=0){
                                        jugador2.estado='ataque3';
                                        numeroAtaques--;
                                    }
                                    else
                                    jugador2.estado='parado';
                
                                    fotogramaP2=0;
                                }
                                else 
                                fotogramaP2++ ;
                
                                spritePosicionP2.spriteX=jugador2.animacion.ataque2(fotogramaP2)*130;
                                spritePosicionP2.spriteY=292;
                            break;
                            case 'ataque3':
                                if(fotogramaP2>=5){//if para ataquefinal
                                    jugador2.estado='parado';
                                    fotogramaP2=0;
                                }
                                else 
                                fotogramaP2++ ;
                
                                spritePosicionP2.spriteX=jugador2.animacion.ataque3(fotogramaP2)*130;
                                spritePosicionP2.spriteY=438;
                            break;
                        }

                        ctx.drawImage(
                            spriteJugador2,
                            spritePosicionP2.spriteX,
                            spritePosicionP2.spriteY,
                            spritePosicionP2.anchoVentana,
                            spritePosicionP2.altoVentana,
                            spritePosicionP2.posicionCanvasX,
                            spritePosicionP2.posicionCanvasY,
                            spritePosicionP2.anchoVentana,
                            spritePosicionP2.altoVentana
                        );
                    }
                },
                numAtaques:agilidad=>{
                    let suerte;
                    let ataques=0;
                    for(let i=0;i<2;i++){
                        suerte=Math.floor((Math.random() * 100) + 0);
                        if(suerte>=0 && suerte<=agilidad){
                            ataques++;
                        }
                    }
                    return ataques;
                },
                
                controles:()=>{
                    //arriba//
                    if(!arriba){
                        ctx.fillStyle='white';
                        ctx.fillRect(360,350,50,50);
                    }  
                    else{
                        ctx.fillStyle='gray';
                        ctx.fillRect(360,350,50,50);
                    }

                    //derecha//
                    if(!derecha){
                        ctx.fillStyle='white';
                        ctx.fillRect(410,400,50,50);
                    }
                    else{
                        ctx.fillStyle='gray';
                        ctx.fillRect(410,400,50,50);
                    }

                    //abajo//
                    if(!abajo){
                        ctx.fillStyle='white';
                        ctx.fillRect(360,450,50,50);
                    }
                    else{
                        ctx.fillStyle='gray';
                        ctx.fillRect(360,450,50,50);
                    }

                    //izquierda//
                    if(!izquierda){
                        ctx.fillStyle='white';
                        ctx.fillRect(310,400,50,50);
                    }
                    else{
                        ctx.fillStyle='gray';
                        ctx.fillRect(310,400,50,50);
                    }
                }
            }
        }
    }








