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
                scene.ola.visible = true;
                scene.scene.transition({ target: 'Menu', duration: 100 });
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
function getTOP(di, df, globalCodTurma, globalCodEscola,scene) {
    var data;
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag=2"  + "&tC=geometrixTOP",
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


function updateTOP(di, df, globalCodTurma, globalCodEscola,flag,scene) {
    var data;
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag="+flag + "&tC=geometrixTOP",
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


function verificaRecords(username, globalCodTurma, globalCodEscola, pontuacao,scene) {

    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=maximoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + pontuacao + "&t=geometrixHypatiamat&tC=geometrixTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            var data = []            
            data.push(parseFloat(response.split("vlMin4=")[1]));               //melhor resultado pessoal
            data.push(parseFloat(response.split("vlMin3=")[1].split("&")[0])); //minimo da turma
            data.push(parseFloat(response.split("vlMin2=")[1].split("&")[0])); //minimo da escola
            data.push(parseFloat(response.split("vlMin1=")[1].split("&")[0])); //minimo global - TOP 100 
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if(scene.ended == 1){
                scene.endText = scene.add.text(0, 0, 'Erro de ligação', { fontFamily: 'font1', fontSize: 40, color: '#463516' });
                scene.endText.setOrigin(0.5, 0.5);
                scene.aGrid.placeAtIndex(157, scene.endText);
                scene.endText2=scene.add.text(0,0, 'Verifica o estado da ligação á internet', {fontFamily: 'font1', fontSize:40 ,  color: '#463516'});
                scene.endText2.setOrigin(0.45,0.5);
                scene.aGrid.placeAtIndex(220,scene.endText2);
            }

        }
    })

}


function gravaRecords(username, globalCodTurma, globalCodEscola, pontuacao) {

    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=insereA&musername=" + username + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&mpontuacao=" + pontuacao  + "&t=geometrixHypatiamat&tC=geometrixTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    });
}



function getRecords(username, globalCodTurma, globalCodEscola, scene) {

    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=maximoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + 0 + "&tip=" + tipoTOP + "&t=geometrixHypatiamat&tC=geometrixTOP",
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
