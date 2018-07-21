/////////////////////////////////////////////////////
//DACLARO LAS URL DE LAS PETICIONES Y REDIRECCIONES//
/////////////////////////////////////////////////////
'use strict';
/////PETICIONES//////
const registro='../User/signin';
const logeo='../User/login';
const galeriaPersonajes='../Character/GetCharacters';
const setPersonaje='../Character/SetCharacter';
const getPersonaje='../Character/GetCharacter';
const getDataP='../Character/DataCharacter';
const getEquip='../Character/GetEquip';
const actualizaEquipo='../Character/UpdateEquipment';
const obtenAmigo='../Character/GetFriend';
const relacionarAmigos='../Character/SetFriend';
const aceptarAmigo='../Character/UpdateFriend';
const rechazarAmigo='../Character/DeleteFriend';
const getAmigos='../Character/GetFriends';
const guardaPersonaje='../Character/SaveCharacter';
const cierraSesion='../Character/Logout';
const volverEscoger='../Character/GoToList';
const eliminarPersonaje='../Character/DeleteCharacter';
const ranking='../Character/Ranking';

////REDIRECCIONES////
const registroPersonaje='../Character/SignInCharacter';
const escogePersonaje='../Character/ChooseCharacter';
const panelPrincipal='../Character/MainPanel';


//INICIALIZAMOS FIREBASE//
// Initialize Firebase
let config = {
    apiKey: "AIzaSyAOCuMNtQE-87JY3Zn-RqPxfmDYN3uYUyE",
    authDomain: "protogame-3e1d9.firebaseapp.com",
    projectId: "protogame-3e1d9",
};
firebase.initializeApp(config);

let db=firebase.firestore();


///////////////////////////////////////////////
//INSTANCIA DE LA APLICACION PRINCIPAL EN VUE//
///////////////////////////////////////////////

let app=new Vue({
    el:"#app",
    data:{
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////DATOS ZONA USUARIO//////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////

        //MUESTRA O NO EL FORMULARIO(ERRORES,etc.)//
        mostrarForm:false,
        mostrarErrorExiste:false,
        mostrarErrorPassDiferente:false,
        mostrarErrorUsuarioNoExiste:false,
        mostrarErrorPassIncorrecto:false,
        ////////////////////////////////////////////

        //DATOS DEL REGISTRO O LOGIN(USUARIO)//
        correo:'',
        pass:'',
        rpass:'',
        ///////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////DATOS ZONA PERSONAJE////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////

        /////////Personajes existentes en el videojuego////////
        galeria: [],
        ///////////////////////////////////////////////////////

        /////////Datos del registro del nuevo personaje////////
        nick:'',
        puntosVitalidad:0,
        puntosResistencia:0,
        puntosFuerza:0,
        puntosAgilidad:0,
        puntosDestreza:0,
        nombrePersonaje:'',

        //para el form//

        puntosIniciales:5,
        Vitalidad:0,
        Resistencia:0,
        Fuerza:0,
        Agilidad:0,
        Destreza:0,

        tempR:0,
        tempF:0,
        tempA:0,
        tempD:0,

        ////////////////
        
        //errores del form//
        noNick:false,
        existeNick:false,
        repartePuntos:false,
        ////////////////////

        ////////////////////////////////////////////////////////


        ////////////////////////////////EL PANEL PRINCIPAL//////////////////////////////

        //////PERSONAJE///////
        mipersonaje:'',
        misStats:'',
        //////////////////////


        ///////MODAL OBJETOS DEL USUARIO///////
        modalObjetos:false,
        equipamiento:false,
        buscadorAmigos:false,
        listaAmigos:false,
        ///////////////////////////////////////

        objetos:[],

        ////////////////////////////////////////////////////////////////////////////////

        //SISTEMA DE AMIGOS//
        listaInvitaciones:[],
        numeroInvitaciones:0,
        misAmigos:[],
        //amigo que buscas
        samigo:'',
        samigoD:'',
        /////////////////////

        //SISTEMA DE RETAR A PERSONAJES//
        listaCombates:[],
        combate:[],
        combatiendo:false,//para mostrar o no el canvas

        //LISTA DEL RANKING//
        ranking:[],

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
    },
    methods:{
        /////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////FUNCIONES ZONA USUARIO////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////

        //BOTON DE INICIO//
        play:()=>{
            app.mostrarForm=true;
        },
        ///////////////////

        ///////////////////
        //PETICIONES AJAX//
        ///////////////////

        //REGISTRO DE USUARIO//
        registrar:()=>{
            if(app.pass===app.rpass){
                axios.post(registro, $.param({
                    correo: app.correo,
                    pass: app.pass
                }))
                .then(respuesta=>{
                    if(respuesta.data){
                        console.log(respuesta.data)
                        window.location.href=registroPersonaje;
                    }
                    else{
                        app.mostrarErrorExiste=true;
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            else{
                app.mostrarErrorPassDiferente=true;
            }
        },
        ///////////////////////

        //LOGIN DE USUARIO//
        login:()=>{
            axios.post(logeo,$.param({
                correo:app.correo,
                pass:app.pass,
            }))
            .then(respuesta=>{
                let estado=respuesta.data;
                if(estado!=="noesta"){
                    if(estado){
                        window.location.href=escogePersonaje;
                    }
                    else{
                        app.mostrarErrorPassIncorrecto=true;
                    }
                }
                else{
                    app.mostrarErrorUsuarioNoExiste=true;
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        ////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////FUNCIONES ZONA PERSONAJES////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        //////////////Animacion del personaje en el preview//////////////////
        previewPersonaje:(ruta,nombre,Vitalidad,Resistencia,Fuerza,Agilidad,Destreza)=>{
            let escenario=$('#personaje');

            //reseteamos stats//
            app.puntosVitalidad=0;
            app.puntosResistencia=0;
            app.puntosFuerza=0;
            app.puntosAgilidad=0;
            app.puntosDestreza=0;
            app.puntosIniciales=5;
            ////////////////////

            //Asignamos los valores por defecto para mostrarlos por el formulario de puntos//
            app.nombrePersonaje=nombre;//indicamos el nombre de el personaje escogido
            app.Vitalidad=parseInt(Vitalidad);
            app.Resistencia=parseInt(Resistencia);
            app.Fuerza=parseInt(Fuerza);
            app.Agilidad=parseInt(Agilidad);
            app.Destreza=parseInt(Destreza);

            app.tempR=app.Resistencia;
            app.tempF=app.Fuerza;
            app.tempA=app.Agilidad;
            app.tempD=app.Destreza;
            ///////////////////////////////////////////////////////////////////////////////////

            //para evitar que se sobrepongan las animaciones//
            escenario.remove();
            $('.preview-personaje').append('<div id="personaje"></div>');
            escenario=$('#personaje');
            //////////////////////////////////////////////////

            let index=0;

            setInterval(()=>{
                if(index===0){
                    escenario.css('width','130');
                    escenario.css('height','146');
                    escenario.css('background','url('+ ruta +') 0 0');
                    index=1;
                }
                else if(index===1 || index===3){
                    escenario.css('background','url('+ ruta +') -130px 0');
                    if(index===1){
                        index=2;
                    }
                    else{
                        index=0;
                    }
                }
                else{
                    escenario.css('background','url('+ ruta +') -260px 0');
                    index=3;
                }

            },150);  
            
        },

        ////funciones para añadir y quitar puntos////

        aPuntosV:()=>{
            let temp;
            if(app.puntosIniciales!==0 && app.puntosVitalidad!==5){
                temp=app.puntosVitalidad*10;
                app.Vitalidad=app.Vitalidad-temp;

                app.puntosVitalidad++;
                app.puntosIniciales--;

                temp=app.puntosVitalidad*10;
                app.Vitalidad=app.Vitalidad+temp;
            }
        },
        dPuntosV:()=>{
            let temp;
            if(app.puntosIniciales!==5 && app.puntosVitalidad!==0){
                temp=app.puntosVitalidad*10;
                app.Vitalidad=app.Vitalidad-temp;

                app.puntosVitalidad--;
                app.puntosIniciales++;

                temp=app.puntosVitalidad*10;
                app.Vitalidad=app.Vitalidad+temp;
            }
        },

        aPuntosR:()=>{
            let temp;
            if(app.puntosIniciales!==0 && app.puntosResistencia!==5){

                app.puntosResistencia++;
                app.puntosIniciales--;

                temp=app.puntosResistencia*20;
                app.Resistencia=app.tempR+(app.tempR*temp/100);
                temp=app.puntosDestreza*10;
                app.Resistencia=parseFloat(app.Resistencia-(app.tempR*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosFuerza*20;
                app.Fuerza=app.tempF+(app.tempF*temp/100);
                temp=app.puntosResistencia*10;
                app.Fuerza=parseFloat(app.Fuerza-(app.tempF*temp/100)).toFixed(2);
            }
        },
        dPuntosR:()=>{
            let temp;
            if(app.puntosIniciales!==5 && app.puntosResistencia!==0){
        
                app.puntosResistencia--;
                app.puntosIniciales++;

                temp=app.puntosResistencia*20;
                app.Resistencia=app.tempR+(app.tempR*temp/100);
                temp=app.puntosDestreza*10;
                app.Resistencia=parseFloat(app.Resistencia-(app.tempR*temp/100)).toFixed(2);

                //sumamos a fuerza

                temp=app.puntosFuerza*20;
                app.Fuerza=app.tempF+(app.tempF*temp/100);
                temp=app.puntosResistencia*10;
                app.Fuerza=parseFloat(app.Fuerza-(app.tempF*temp/100)).toFixed(2);
            }
        },

        aPuntosF:()=>{
            let temp;
            if(app.puntosIniciales!==0 && app.puntosFuerza!==5){

                app.puntosFuerza++;
                app.puntosIniciales--;

                temp=app.puntosFuerza*20;
                app.Fuerza=app.tempF+(app.tempF*temp/100);
                temp=app.puntosResistencia*10;
                app.Fuerza=parseFloat(app.Fuerza-(app.tempF*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosAgilidad*20;
                app.Agilidad=app.tempA+(app.tempA*temp/100);
                temp=app.puntosFuerza*10;
                app.Agilidad=parseFloat(app.Agilidad-(app.tempA*temp/100)).toFixed(2);
            }
        },
        dPuntosF:()=>{
            let temp;
            if(app.puntosIniciales!==5 && app.puntosFuerza!==0){

                app.puntosFuerza--;
                app.puntosIniciales++;

                temp=app.puntosFuerza*20;
                app.Fuerza=app.tempF+(app.tempF*temp/100);
                temp=app.puntosResistencia*10;
                app.Fuerza=parseFloat(app.Fuerza-(app.tempF*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosAgilidad*20;
                app.Agilidad=app.tempA+(app.tempA*temp/100);
                temp=app.puntosFuerza*10;
                app.Agilidad=parseFloat(app.Agilidad-(app.tempA*temp/100)).toFixed(2);
            }
        },



        aPuntosA:()=>{
            let temp;
            if(app.puntosIniciales!==0 && app.puntosAgilidad!==5){

                app.puntosAgilidad++;
                app.puntosIniciales--;

                temp=app.puntosAgilidad*20;
                app.Agilidad=app.tempA+(app.tempA*temp/100);
                temp=app.puntosFuerza*10;
                app.Agilidad=parseFloat(app.Agilidad-(app.tempA*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosDestreza*20;
                app.Destreza=app.tempD+(app.tempD*temp/100);
                temp=app.puntosAgilidad*10;
                app.Destreza=parseFloat(app.Destreza-(app.tempD*temp/100)).toFixed(2);
            }
        },
        dPuntosA:()=>{
            let temp;
            if(app.puntosIniciales!==5 && app.puntosAgilidad!==0){

                app.puntosAgilidad--;
                app.puntosIniciales++;

                temp=app.puntosAgilidad*20;
                app.Agilidad=app.tempA+(app.tempA*temp/100);
                temp=app.puntosFuerza*10;
                app.Agilidad=parseFloat(app.Agilidad-(app.tempA*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosDestreza*20;
                app.Destreza=app.tempD+(app.tempD*temp/100);
                temp=app.puntosAgilidad*10;
                app.Destreza=parseFloat(app.Destreza-(app.tempD*temp/100)).toFixed(2);
            }
        },



        aPuntosD:()=>{
            let temp;
            if(app.puntosIniciales!==0 && app.puntosDestreza!==5){

                app.puntosDestreza++;
                app.puntosIniciales--;

                temp=app.puntosDestreza*20;
                app.Destreza=app.tempD+(app.tempD*temp/100);
                temp=app.puntosAgilidad*10;
                app.Destreza=parseFloat(app.Destreza-(app.tempD*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosResistencia*20;
                app.Resistencia=app.tempR+(app.tempR*temp/100);
                temp=app.puntosDestreza*10;
                app.Resistencia=parseFloat(app.Resistencia-(app.tempR*temp/100)).toFixed(2);
            }
        },
        dPuntosD:()=>{
            let temp;
            if(app.puntosIniciales!==5 && app.puntosDestreza!==0){

                app.puntosDestreza--;
                app.puntosIniciales++;

                temp=app.puntosDestreza*20;
                app.Destreza=app.tempD+(app.tempD*temp/100);
                temp=app.puntosAgilidad*10;
                app.Destreza=parseFloat(app.Destreza-(app.tempD*temp/100)).toFixed(2);
                /////////////////////////

                //restamos a fuerza
                temp=app.puntosResistencia*20;
                app.Resistencia=app.tempR+(app.tempR*temp/100);
                temp=app.puntosDestreza*10;
                app.Resistencia=parseFloat(app.Resistencia-(app.tempR*temp/100)).toFixed(2);
            }
        },

        ///guardamos el personaje creado///
        guardaPersonaje:()=>{
            if(app.puntosIniciales!==0){
                app.repartePuntos=true;
            }
            else if(app.nick===''){
                app.noNick=true;
            }
            else{
                axios.post(setPersonaje,$.param({
                    nick:app.nick,
                    puntosVitalidad:app.puntosVitalidad,
                    puntosResistencia:app.puntosResistencia,
                    puntosFuerza:app.puntosFuerza,
                    puntosAgilidad:app.puntosAgilidad,
                    puntosDestreza:app.puntosDestreza,
                    nombrePersonaje:app.nombrePersonaje
                }))
                .then(respuesta=>{
                    let estado=respuesta.data;
                    console.log(estado);
                    if(estado){
                        window.location.href=panelPrincipal;
                    }
                    else{
                        app.existeNick=true;
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        },
        
        eligePersonaje:nickName=>{
            axios.post(guardaPersonaje, $.param({
                nick:nickName
            }))
            .then(respuesta=>{
                let data=respuesta.data;

                window.location.href=panelPrincipal;
                console.log(data);
            })
            .catch(error=>{
                console.log(error);
            });
        },

        anadePersonaje:()=>{
            window.location.href=registroPersonaje;
        },

        cerrarSesion:()=>{
            window.location.href=cierraSesion;
        },

        volverEscoger:()=>{
            window.location.href=volverEscoger;
        },
        eliminarPersonaje:personaje=>{
            axios.post(eliminarPersonaje,$.param({
                nick:personaje
            }))
            .then(respuesta=>{
                console.log(respuesta.data);
                window.location.href='../';
            })
            .catch(error=>{
                console.log(error);
            });
        },
        obtenerRanking:()=>{
            axios.get(ranking)
            .then(respuesta=>{
                let data=respuesta.data;
                app.ranking=data;
                console.log(data);
            })
            .catch(error=>{
                console.log(error);
            });
        },
        cargarPuntos:()=>{
            let stat;
            let puntos;
            let temp;
            //Carga los puntos al personaje//
            
            //Vitalidad
            app.misStats.Vitalidad=parseInt(app.misStats.Vitalidad)+parseInt(app.mipersonaje.puntosVitalidad*10);

            //Resistencia
            stat=parseInt(app.misStats.Resistencia);
            puntos=parseInt(app.mipersonaje.puntosResistencia);
            temp=puntos*20;
            stat=stat+(parseInt(app.misStats.Resistencia)*temp/100);
            puntos=parseInt(app.mipersonaje.puntosDestreza);
            temp=puntos*10;
            stat=stat-(parseInt(app.misStats.Resistencia)*temp/100);
            app.misStats.Resistencia=parseFloat(stat).toFixed(2);

            //Fuerza
            stat=parseInt(app.misStats.Fuerza);
            puntos=parseInt(app.mipersonaje.puntosFuerza);
            temp=puntos*20;
            stat=stat+(parseInt(app.misStats.Fuerza)*temp/100);
            puntos=parseInt(app.mipersonaje.puntosResistencia);
            temp=puntos*10;
            stat=stat-(parseInt(app.misStats.Fuerza)*temp/100);
            app.misStats.Fuerza=parseFloat(stat).toFixed(2);

            //Agilidad
            stat=parseInt(app.misStats.Agilidad);
            puntos=parseInt(app.mipersonaje.puntosAgilidad);
            temp=puntos*20;
            stat=stat+(parseInt(app.misStats.Agilidad)*temp/100);
            puntos=parseInt(app.mipersonaje.puntosFuerza);
            temp=puntos*10;
            stat=stat-(parseInt(app.misStats.Agilidad)*temp/100);
            app.misStats.Agilidad=parseFloat(stat).toFixed(2);

            //Destreza
            stat=parseInt(app.misStats.Destreza);
            puntos=parseInt(app.mipersonaje.puntosDestreza);
            temp=puntos*20;
            stat=stat+(parseInt(app.misStats.Destreza)*temp/100);
            puntos=parseInt(app.mipersonaje.puntosAgilidad);
            temp=puntos*10;
            stat=stat-(parseInt(app.misStats.Destreza)*temp/100);
            app.misStats.Destreza=parseFloat(stat).toFixed(2);
            
        },
        cargaObjetos:()=>{
            if(!app.objetosCargados){
                ///////////////Peticion de los objetos del personaje//////////////
                axios.get(getEquip)
                .then(respuesta=>{
                    let data=respuesta.data;
                    app.objetos=data;
                })
                .catch(error=>{
                    console.log(error);
                });
            }
        },

        actualizarEquipo:(obj)=>{
            if(obj.equipado==='0'){
                obj.equipado=1;
            }
            else{
                obj.equipado=0;
            }
            axios.post(actualizaEquipo,$.param({
                objeto:obj
            }))
            .then(respuesta=>{
                let data=respuesta.data;
                app.objetos=data;
            })
            .catch(error=>{
                console.log(error);
            });
            setTimeout(()=>{
                $('[data-toggle="tooltip"]').tooltip();
            },1000);
        },

        /* script de pruebas borrar mas adelante */
        prueba:()=>{
            axios.get('../Character/prueba')
            .then(res=>{
                let algo=res.data;
                console.log(algo);
            })
            .catch(er=>{
                console.log(er);
            });
        },

        //SISTEMA DE AMIGOS//

        //Obtiene el amigo que se está buscando
        getAmigo:()=>{
            axios.post(obtenAmigo,$.param({
                nick:app.samigo
            }))
            .then(respuesta=>{
                let data=respuesta.data;
                if(!data){
                    app.samigo='';
                }
                else{
                    app.samigoD=respuesta.data;
                }
            })
            .catch(error=>{
                console.log(error);
            });
        },

        //para invitar a un amigo//
        invitarAmigo:(nick)=>{
            axios.post(relacionarAmigos,$.param({
                nickInvitado:nick,
                comprueba:1
            }))
            .then(respuesta=>{
                console.log(respuesta.data);
                if(respuesta.data==='Ya esta'){
                    alert("You have already invited this fighter!");
                }
                else{
                    db.collection("Amigos").add({
                        invita: app.mipersonaje.nickName,
                        invitado: nick,
                        aceptado: 0
                    })
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                    axios.post(relacionarAmigos,$.param({
                        nickInvitado:nick,
                        comprueba:0
                    }))
                    .then(respuesta=>{
                        alert("Invitation sent");
                    })
                    .catch(error=>{
                        console.log(error);
                    });
                }
            })
            .catch(error=>{
                console.log(error);
            });
        },

        //Obtiene las invitaciones recibidas del usuario
        getInvitaciones:()=>{
            db.collection("Amigos").where("invitado", "==", app.mipersonaje.nickName)
            .onSnapshot(querySnapshot=>{//onsnapshot permite actualizaciones en tiempo real
                let i=0;
                let temp=[];
                querySnapshot.forEach((doc) => {
                    temp[i]=doc.data();
                    temp[i].id=doc.id;
                    i++;
                });
                app.listaInvitaciones=temp;
                if(app.listaInvitaciones.length!==app.numeroInvitaciones){
                    app.numeroInvitaciones=app.listaInvitaciones.length;
                }
            });
        },

        //acepta la invitacion//
        aceptarInvitacion:(invita,invitaNick)=>{
            axios.post(aceptarAmigo,$.param({
                nick:invitaNick
            }))
            .then(respuesta=>{
                console.log("OK");
                db.collection("Amigos").doc(invita).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            })
            .catch(error=>{
                console.log(error);
            });
        },

        //rechaza la invitacion//
        rechazarInvitacion:(invita,invitaNick)=>{
            axios.post(rechazarAmigo,$.param({
                nick:invitaNick
            }))
            .then(respuesta=>{
                console.log("OK");
                db.collection("Amigos").doc(invita).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            })
            .catch(error=>{
                console.log(error);
            });
        },
        verAmigos:()=>{
            axios.get(getAmigos)
            .then(respuesta=>{
                let data=respuesta.data;
                app.misAmigos=data;
            })
            .catch(error=>{
                console.log(error);
            });
        },
        eliminarAmigo:(invitaNick)=>{
            axios.post(rechazarAmigo,$.param({
                nick:invitaNick
            }))
            .then(respuesta=>{
                console.log("OK");
                app.verAmigos();
            })
            .catch(error=>{
                console.log(error);
            });
        },


        ///////////////////////////SISTEMA DE INVITACION A COMBATE (RETAR)////////////////////

        retar:nickName=>{
            db.collection("Combates").add({
                jugador1: {
                    nick:app.mipersonaje.nickName
                },
                jugador2:{
                    nick:nickName
                },
                aceptado: 0,
                terminado:0,
                ganador:null,
                turno:0,
                ronda:1
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },

        rechazaCombate:id=>{
            db.collection("Combates").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        },

        aceptarCombate:id=>{
            db.collection("Combates").doc(id).set({
                aceptado:1,
            },
            {   
                merge:true
            })
            .then(()=>{
                console.log("Combate cargado");
            })
            .catch(()=>{
                console.log("error");
            });
        },

        obtenerCombates:()=>{
            db.collection("Combates").where("jugador2.nick", "==", app.mipersonaje.nickName)
            .onSnapshot(querySnapshot=>{//onsnapshot permite actualizaciones en tiempo real
                let i=0;
                let temp=[];
                querySnapshot.forEach((doc) => {
                    temp[i]=doc.data();
                    temp[i].id=doc.id;

                    //para ver si se ha aceptado el combate
                    if(temp[i].aceptado==1){
                        app.cargaCombate(temp[i].id,2); 
                        app.combatiendo=true;  
                    }
                    if(temp[i].jugador1==null || temp[i].jugador2==null){
                        app.rechazaCombate(temp[i].id);
                    }
                    i++;
                    console.log("ACTUALIZADO");
                });
                app.listaCombates=temp;
            });

            //POR SI ERES EL QUE INVITA TIGGER PARA VER SI SE HA ACEPTADO//
            db.collection("Combates").where("jugador1.nick", "==" , app.mipersonaje.nickName)
            .where("aceptado", "==" , 1)
            .onSnapshot(querySnapshot=>{
                querySnapshot.forEach((doc) => {
                    app.cargaCombate(doc.id,1);
                    app.combatiendo=true;   
                });
                if(app.combatiendo===true)
                console.log("ACTUALIZADO");
            });
        },

        cargaCombate:(id,jugador)=>{
            console.log("Se ha aceptado el combate por lo tanto se carga el combate");
            let objetosTemp=[];
            let armaSword=false;
            let contador=0;
            const MAX=app.objetos.length;
            for(let i=0;i<MAX;i++){
                if(app.objetos[i].equipado>0){
                    objetosTemp[contador]=app.objetos[i];
                    contador++;
                    if(app.objetos[i].TipoDeObjeto==='sword'){
                        armaSword=true;
                    }
                }
            }
            if(armaSword){
                if(jugador===1){
                    db.collection("Combates").doc(id).set({
                        jugador1:{
                            vitalidad:app.misStats.Vitalidad,
                            resistencia:app.misStats.Resistencia,
                            fuerza:app.misStats.Fuerza,
                            agilidad:app.misStats.Agilidad,
                            destreza:app.misStats.Destreza,
                            sprites:app.misStats.imagenes,
                            objetos:objetosTemp
                        }
                    },
                    {   
                        merge:true
                    })
                    .then(()=>{
                        console.log("Combate cargado");
                    })
                    .catch(()=>{
                        console.log("error");
                    });
                }
                else{
                    db.collection("Combates").doc(id).set({
                        jugador2:{
                            vitalidad:app.misStats.Vitalidad,
                            resistencia:app.misStats.Resistencia,
                            fuerza:app.misStats.Fuerza,
                            agilidad:app.misStats.Agilidad,
                            destreza:app.misStats.Destreza,
                            sprites:app.misStats.imagenes,
                            objetos:objetosTemp
                        }
                    },
                    {   
                        merge:true
                    })
                    .then(()=>{
                        console.log("Combate cargado");
                    })
                    .catch(()=>{
                        console.log("error");
                    });
                }
            }
            else{
                alert("no tienes arma");
                app.rechazaCombate(id);
                app.rechazaCombate(id);
            }
            app.interactuaCombate(id);
            
        },
        interactuaCombate:id=>{
            //cambiar para que solo haya una unica carga para los dos//

            db.collection("Combates").doc(id)
            .onSnapshot(function(doc) {
                app.combate=doc.data();
                console.log(app.combate);
            });
            let script=document.createElement('script');
            script.src='../layout/js/game.js';
            document.body.appendChild(script);
        }
    },

    
    watch:{
        ///mirar si ha llegado una invitacion//
        numeroInvitaciones:valor=>{
            if(valor!==0){
                alert("You have friend invitations!");
            }
        },

    },

    beforeCreate:()=>{//se hace la peticion antes de montar la app
        ///////////////Peticion del personaje del usuario//////////////
        axios.all([
            axios.get(getPersonaje),
            axios.get(getDataP)
        ])
        .then(axios.spread((respuesta1,respuesta2)=>{
            let datos=respuesta1.data;
            let datos2=respuesta2.data;
            app.mipersonaje=datos;
        
            sessionStorage.setItem('nick',datos.nickName);
            console.log(datos.nickName);
            
            app.misStats=datos2;
            app.previewPersonaje(datos2.imagenes);
            app.cargarPuntos();
            app.cargaObjetos();
            app.getInvitaciones();
            app.obtenerCombates();
            app.obtenerRanking();
        }))
        .catch(error=>{
            console.log(error);
        });
    },
    
    mounted:()=>{

        ////////////////Peticion para la galeria de personajes///////////////
        axios.get(galeriaPersonajes)
        .then(respuesta=>{
            let datos=respuesta.data;
            app.galeria=datos;    
        })
        .catch(error=>{
            console.log(error);
        });


        $('#pantalla-carga').css('display','none');
        setTimeout(()=>{
            $('[data-toggle="tooltip"]').tooltip();
        },1000);
    },

    //////////////Para las barras///////////
    computed:{
        pVida:()=>{
            return app.Vitalidad*100/1000;
        },

        pResistencia:()=>{
            return app.Resistencia*100/50;
        },

        pFuerza:()=>{
            return app.Fuerza*100/5;
        },

        pAgilidad:()=>{
            return app.Agilidad*100/50;
        },

        pDestreza:()=>{
            return app.Destreza*100/30;
        },
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
});

