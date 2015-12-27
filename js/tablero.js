function tablero() {
	return '<div class="row gato corrige center flipInX animated">\
			<div class="col-md">\
				<div class="col">\
					<div class="col-md-4 casilla" id="cas1"> </div>\
					<div class="col-md-4 casilla" id="cas2"> </div>\
					<div class="col-md-4 casilla" id="cas3"> </div>\
				</div>\
				<div class="col">\
					<div class="col-md-4 casilla" id="cas4"> </div>\
					<div class="col-md-4 casilla" id="cas5"> </div>\
					<div class="col-md-4 casilla" id="cas6"> </div>\
				</div>\
				<div class="col">\
					<div class="col-md-4 casilla" id="cas7"> </div>\
					<div class="col-md-4 casilla" id="cas8"> </div>\
					<div class="col-md-4 casilla" id="cas9"> </div>\
				</div>\
			</div>\
		</div>';
}
function board(name, victorias, derrotas, pic) {
	return `<div class="row corrige middle-xs" >
			<div class="col-xs-1 col-md-offset-1">
				<img src="${pic}" class="thumb">
			</div>
			<div class="col-xs-3"><h3 style="color: black">${name}</h3></div>
			<div class="col-xs-3"><span style="color:rgb(10, 180, 100);">Has ganado ${victorias + (victorias == 1 ? ' vez' : ' veces')}</span></div>
			<div class="col-xs-4"><span style="color:rgb(180, 10, 20);">Has perdido  ${derrotas + (derrotas == 1 ? ' vez' : ' veces')}</span></div>
		</div>`;
}
function btnReiniciar() {
	return '<p class="center"><button class="center jello animated" id="reini">Siguiente ronda...</button></p>';
}

function ganaste(ganador) {
	return `<div id="vicCon" class="ganadora bounceInRight animated"><div class="row corrige ganadora">
		<div class="col-md-12">
			<h1 class="center"> ¡Felicidades, ${ganador.name}!</h1>
			<h4 class="center"> ¡Has ganado la partida de gato!</h4>
		</div>
	</div></div>`;
}

function empataste() {
	return '<div class="row corrige empatadora wobble animated">\
		<div class="col-md-12">\
			<h1 class="center">Empate Final!</h1>\
			<h4 class="center">Empataron la partida. No hay más que decir.</h4>\
			<p class="center btn-again"><button class="center" id="again">Jugar de nuevo</button></p>\
		</div>\
	</div>';
}

function btnAgain() {
	return '<div class="row corrige">\
			<div class="col-md">\
				<p class="center"><button class="center" id="again">Jugar de nuevo</button></p>\
			</div>\
		</div>';
}