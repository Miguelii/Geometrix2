/**
 * Login user
 * @param {string} username Name to try to login with
 * @param {string} password Password to try to login with
 * @param {Phaser.Scene} scene scope in with the login is being made
 */
 function login(username, password,scene) {
    
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=dologin&u=" + username + "&p=" + password,
        crossDomain: true,
        cache: false,

        success: function (response) {
            if (response!="false") {
                
                infoUser.user = response.split(",")[0];                               // username
                infoUser.firstName = response.split(",")[1];                          // primeiro nome do aluno
                infoUser.escola = response.split(",")[2];                             // codigo da escola
                infoUser.turma = response.split(",")[3];

                infoUser.setLocalData();

                scene.scene.stop();
                scene.scene.resume("startScene");
            }
            else {
                // alert("Utilizador ou Password Errados");
                scene.loginErrorMsg.visible = true; 
                return -1;
            }

        },
        error: function (response) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
};



/**
 * Check if there is an active session
 */
function sessionVerify() {  
    $.ajax
    ({
	type: "POST",
	url: "https://www.hypatiamat.com/loginActionVH.php",
	data: "action=verify",
	cache: false,
        success: function (response) {
            if (response != "not") {
                infoUser.user = response.split(",")[0];                               // username
                infoUser.firstName = response.split(",")[1];                          // primeiro nome do aluno
                infoUser.escola = response.split(",")[2];                             // codigo da escola
                infoUser.turma = response.split(",")[3];                              // turma do aluno
                infoUser.setLocalData();
	    }
            else {
                infoUser.user = "";
                return;

	    }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
	}
    })
}

function destroySession() {
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=des",
        cache: false,
        success: function (response) {
            infoUser.logout();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
}

/**
 * Get the top scores
 * @param {string} username Name to try to login with
 * @param {string} password Password to try to login with
 * @param {Phaser.Scene} scene scope in with the login is being made
 */
function getTOP(di, df, globalCodTurma, globalCodEscola, tipoTOP,scene) {
    var data;
    $.ajax
    ({
        type: "POST",
        url: "",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag=2" + "&tip=" + tipoTOP + "&tC=trapbeeTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            data = [];
            let j = 0;
            response = response.split('&');
            for (let i = 0; i < response.length; i++) {
                response[i] = response[i].split('=')[1];
                if (i % 5 == 0) {
                    j++;
                    response[i] = response[i].split(" ");

                    if (response[i].length == 1) {
                        
                        response[i] = response[i][0];
                    }
                    else {
                        response[i] = response[i][0] + " " + response[i][response[i].length - 1];
                    }
                    data.push(j);
                }
                if (i % 5 == 2) {
                    response[i] = response[i].replace("Agrupamento de Escolas", "A.E.");
                }
                data.push(response[i]);
            }

            scene.scene.transition({
                target: 'rankingScene',
                data: data,
                duration: 1000,
                moveBelow: true,
                onUpdate: scene.transitionUP
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão")
            data = [];
            scene.scene.transition({
                target: 'rankingScene',
                data: data,
                duration: 1000,
                moveBelow: true,
                onUpdate: scene.transitionUP
            });
        }
    })
}


function updateTOP(di, df, globalCodTurma, globalCodEscola,flag, tipoTOP,scene) {
    var data;
    $.ajax
    ({
        type: "POST",
        url: "",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag="+flag + "&tip=" + tipoTOP + "&tC=trapbeeTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            data = [];
            let j = 0;
            response = response.split('&');
            for (let i = 0; i < response.length; i++) {
                response[i] = response[i].split('=')[1];
                if (i % 5 == 0) {
                    j++;
                    response[i] = response[i].split(" ");
                    if (response[i].length == 1) {

                        response[i] = response[i][0];
                    }
                    else {
                        response[i] = response[i][0] + " " + response[i][response[i].length - 1];
                    }
                    data.push({
                        name: j
                    });
                }
                if (i % 5 == 2) {
                    response[i] = response[i].replace("Agrupamento de Escolas", "A.E.");
                }
                data.push({
                    name: response[i]
                });
                
            }
            if (data.length < 4) {
                scene.table.setItems([]);
            }
            else {
                scene.table.setItems(data);
            }
            scene.table.refresh();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            data = [];
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    })
}






function verificaRecords(username, globalCodTurma, globalCodEscola, pontuacao, tipoTOP,scene) {

    $.ajax
    ({
        type: "POST",
        url: "",
        data: "action=maximoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + pontuacao + "&tip=" + tipoTOP + "&t=trapbeeHypatia&tC=trapbeeTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            var data = []
            
            data.push(parseFloat(response.split("vlMin4=")[1]));               //melhor resultado pessoal
            data.push(parseFloat(response.split("vlMin3=")[1].split("&")[0])); //minimo da turma
            data.push(parseFloat(response.split("vlMin2=")[1].split("&")[0])); //minimo da escola
            data.push(parseFloat(response.split("vlMin1=")[1].split("&")[0])); //minimo global - TOP 100 

            scene.endText = scene.add.text(0, 0, '', { fontFamily: 'myfont2', fontStyle: 'bold', fontSize: 40, color: '#463516', wordWrap: { width: 700, useAdvancedWrap: true }, align: 'center' } );
            scene.endText.setOrigin(0.4, 0.5);
            scene.aGrid.placeAtIndex(136, scene.endText);

            pontuacao = parseFloat(pontuacao);

            if(pontuacao > 0 && scene.ended == 1) {
                scene.endText.setText("Parabéns!");
                scene.endText2 = scene.add.text(0, 0, " ", { fontFamily: 'myfont2', fontSize: 40, color: '#463516', wordWrap: { width: 700, useAdvancedWrap: true }, align: 'center' });
                scene.endText2.setOrigin(0.4, 0.5);
                scene.aGrid.placeAtIndex(220, scene.endText2);

                if (infoUser.user != '') {
                    if (data[0] > pontuacao && pontuacao>0) {
                        if (data[3] > pontuacao) {//top global
                            scene.endText2 = scene.endText2.setText(username + ", conseguiste um novo record ABSOLUTO! Com " + pontuacao + " pontos. Vê o teu resultado no TOP 100 absoluto.");
                        }
                        else if (data[2] > pontuacao) {//top escola
                            scene.endText2 = scene.endText2.setText(0, 0, username + ", conseguiste um novo record na tua escola!\n " + "Com " + pontuacao + " pontos. Vê o teu resultado no TOP 100 da tua escola.");
                        }
                        else if (data[1] > pontuacao) { // top turma
                            scene.endText2 = scene.endText2.setText(0, 0, username + ", conseguiste um novo record na tua turma!\n" + "Com " + pontuacao + " pontos. Vê o teu resultado no TOP 100 da tua turma.");
                        }
                        else { // top pessoal
                            scene.endText2.setText(username + ", conseguiste melhorar o teu resultado  anterior, no entanto,\n ainda não conseguiste\nentrar no TOP 100.\nTenta outra vez.");

                        }
                    }

                    else {
                        scene.endText2 = scene.setText(username + " obtiveste " + pontuacao + " pontos.\nNão conseguiste melhorar o \nteu resultado anterior (o teu melhor \nresultado é " + data[0] + " pontos).\n    Tenta outra vez.");
                    }

                }

                else {
                    if( data[3]>pontuacao && pontuacao>0){

                        scene.endText2 = scene.endText2.setText("Se estivesses registado o teu nome figuraria no TOP 100 absoluto com " + pontuacao + " pontos.\nRegista - te em \nwww.hypatiamat.com.");
                        scene.endText2.setOrigin(0.4, 0.5);

                    }
                    else{
                        scene.endText2 = scene.endText2.setText("Para que o teu nome figure nos TOPs tens de estar registado.\n Regista - te em\n  www.hypatiamat.com.");
                        scene.endText2.setOrigin(0.4, 0.5);


                    }
                }

            }
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if(scene.ended == 1){
                scene.endText = scene.add.text(0, 0, 'Erro de ligação', { fontFamily: 'myfont2', fontSize: 40, color: '#463516' });
                scene.endText.setOrigin(0.5, 0.5);
                scene.aGrid.placeAtIndex(157, scene.endText);
                scene.endText2=scene.add.text(0,0, 'Verifica o estado da ligação á internet', {fontFamily: 'myfont2', fontSize:40 ,  color: '#463516'});
                scene.endText2.setOrigin(0.45,0.5);
                scene.aGrid.placeAtIndex(220,scene.endText2);
            }

        }
    })

}


function gravaRecords(username, globalCodTurma, globalCodEscola, pontuacao, tipoTop) {

    $.ajax
    ({
        type: "POST",
        url: "",
        data: "action=insereA&musername=" + username + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&mpontuacao=" + pontuacao + "&mtipo=" + tipoTop + "&t=trapbeeHypatia&tC=trapbeeTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    });
}



function getRecords(username, globalCodTurma, globalCodEscola, tipoTOP, scene) {

    $.ajax
    ({
        type: "POST",
        url: "",
        data: "action=maximoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + 0 + "&tip=" + tipoTOP + "&t=trapbeeHypatia&tC=trapbeeTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {

            pontuacao = parseFloat(response.split("vlMin4=")[1]);               //melhor resultado pessoal

            pontuacaoGlobal = parseFloat(response.split("vlMin1=")[1].split("&")[0]); //minimo global - TOP 100 


            if (response.split("vlMin4=")[1] <= (response.split("vlMin1=")[1].split("&")[0]) && pontuacao>0) {
                scene.recordTOP.visible = true;
                scene.record.visible = false;

            }
            scene.recorde = scene.recorde.setText(response.split("vlMin4=")[1].slice(0, 4));
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if(scene.ended == 1){
                alert("Falha de ligação, por favor verifique a sua conexão");
            }
        }
    })

}
