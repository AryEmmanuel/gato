var gato, jugador1, jugador2, casilla1, casilla2;
var casilla3, casilla4, casilla5, casilla6, casilla7;
var casilla8, casilla9, nombre1, nombre2, players, round;
var ganancia, pics = ["circulo.png", "equis.png"];

function Gato(jugador1, jugador2) {
	this.rondas = 4;
	this.completadas = 1;
	this.tablero = new Array(3);
	this.over = false;
	this.jugadores = [jugador1, jugador2];
	this.turno = jugador1;

	this.llenarTablero();
}

Gato.prototype.mostrarTablero = function() {
	var iniciar = document.getElementById('iniciar');
	$('#iniciar').addClass('zoomOut animated');
	body = document.getElementById('body');

	nombre1 = document.getElementById('j1name').value;
	nombre2 = document.getElementById('j2name').value;
	
	setTimeout(() => {
		iniciar.remove();
		body.removeAttribute('style');
	}, 700);

	jugador1.name = nombre1 || jugador1.name;
	jugador2.name = nombre2 || jugador2.name;

	this.board();
}

Gato.prototype.board = function() {
	$('.side').html('<h3 id="players" class="center"></h3>');
	players = document.getElementById('players');
	players.innerText = jugador1.name + " Vs. " + jugador2.name;

	$('.gana').html('<h3 class="center win-bar" style="color:gold"><h3>');

	round = document.getElementById("round");
	round.innerText = this.completadas + " / " + this.rondas;

	$("#jugadoresLista").html("");

	for (var i = 0; i < this.jugadores.length; i++) {
		$('#jugadoresLista').append(board(this.jugadores[i].name, this.jugadores[i].victorias, this.jugadores[i].derrotas, pics[i]));
	}
};

Gato.prototype.llenarTablero = function() {
	for (var i = 0; i < 3; i++) {
		this.tablero[i] = new Array(3);
	}
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			this.tablero[i][j] = 0;
		}
	}
};

Gato.prototype.anotar = function(casilla) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			this.tablero[casilla.x][casilla.y] = casilla.jugador.id;
		}
	}

	this.turno = this.turno == jugador1 ? jugador2 : jugador1;

	this.revisarAnotacion();
};

Gato.prototype.revisarAnotacion = function() {
	ganancia = 0;
	var ganador = 0;

	// Revisando si hay en las horizontales
	for (var i = 0; i < 3; i++) {
		var s = 0;
		for (var j = 0; j < 3; j++) {
			s += this.tablero[i][j];
			if (s == 15 || s == 6) {
				ganador = s;
			}
		}
	}

	// Revisando si hay en las verticales
	for (var i = 0; i < 3; i++) {
		var s = 0;
		for (var j = 0; j < 3; j++) {
			for (var k = i; k < i + 1; k++) {
				s += this.tablero[j][k];
				if (s == 15 || s == 6) {
					ganador = s;
				}
			}
		}
	}

	// Revisando si hay en la primer diagonal
	var d1 = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = i; j < i + 1; j++) {
			d1 += this.tablero[i][j];
		}
		if (d1 == 15 || d1 == 6) {
			ganador = d1;
		}
	}

	// Revisando si hay en la segunda diagonal
	var d2 = 0;
	for (var i = 0; i < 3; i++) {
		d2 += this.tablero[i][2-i];
	}
	if (d2 == 15 || d2 == 6) {
		ganador = d2;
	}

	// Revisando si hay empate
	var ceros = 0;
	for (var i = 0; i < this.tablero.length; i++) {
		for (var j = 0; j < this.tablero[i].length; j++) {
			if (this.tablero[i][j] == 0) {
				ceros++;
			}
		}
	}
	if (ganador) {
		ganancia++;
		ganador == 6 ? this.ganar(jugador2, jugador1) : this.ganar(jugador1, jugador2);
	}
	if (!ganancia && ceros == 0) {
		this.empatar();
	}
}

Gato.prototype.ganar = function(ganador, perdedor) {
	this.over = true;
	ganador.victorias++;
	perdedor.derrotas++;

	if (this.completadas < this.rondas) {
		$('.win-bar').text("¡" + ganador.name + ", has ganado esta ronda!");
		$('.side').html(btnReiniciar());
		reini.addEventListener("click", () => gato.reiniciar());
	}
	this.nuevaRonda();
};
Gato.prototype.empatar = function() {
	this.over = true;

	if (this.completadas == this.rondas) {
		this.nuevaRonda();
		this.completadas++;
	} else {
		this.nuevaRonda();
		$('.win-bar').css("color", "red");
		$('.win-bar').text("¡Empate!");
		$('.side').html(btnReiniciar());
		reini.addEventListener("click", () => gato.reiniciar());
	}
};

Gato.prototype.nuevaRonda = function() {
	if (this.completadas < this.rondas) {
		this.completadas++;
	} else {
		this.resultadosPartida();
	}
};

Gato.prototype.resultadosPartida = function() {
	var victoria1 = jugador1.victorias;
	var victoria2 = jugador2.victorias;

	if (victoria1 > victoria2) {
		this.victoriaFinal(jugador1);
	} else if (victoria2 > victoria1) {
		this.victoriaFinal(jugador2);
	} else {
		this.empateFinal();
	}
};

Gato.prototype.victoriaFinal = function(ganador) {
	$('.dashboard').html(ganaste(ganador));
	$('.headcon').html('<h3 class="center" id="win">El gato es de ' + ganador.name + '!!!</h3>');
	$('#win').addClass('bounceInLeft animated');
	for (var i = 0; i < this.jugadores.length; i++) {
		$("#vicCon").append(board(this.jugadores[i].name, this.jugadores[i].victorias, this.jugadores[i].derrotas, pics[i]));
	}
	$('#vicCon').append(btnAgain());
	$('#again').click(() => location.reload());
};

Gato.prototype.empateFinal = function() {
	$('.dashboard').html(empataste());
	for (var i = 0; i < this.jugadores.length; i++) {
		$('.btn-again').before(board(this.jugadores[i].name, this.jugadores[i].victorias, this.jugadores[i].derrotas, pics[i]));
	}
	$('#again').click(() => location.reload());
};

Gato.prototype.reiniciar = function() {
	this.over = false;
	this.llenarTablero();
	this.board();
	$('#g').html(tablero());
	$('.d').toggleClass('dashboard');
	casilla1.desmarcar();
	casilla2.desmarcar();
	casilla3.desmarcar();
	casilla4.desmarcar();
	casilla5.desmarcar();
	casilla6.desmarcar();
	casilla7.desmarcar();
	casilla8.desmarcar();
	casilla9.desmarcar();
};

function Casilla(x, y, htmlId) {
	this.x = x;
	this.y = y;
	this.htmlId = htmlId;
	this.marcada;
	this.jugador;

	this.desmarcar();
}

Casilla.prototype.desmarcar = function() {
	this.marcada = false;
	document.getElementById(this.htmlId).addEventListener("click", () => this.marcarCasilla());
};

Casilla.prototype.marcarCasilla = function() {
	if (!this.marcada && !gato.over) {
		this.marcada = true;
		this.jugador = gato.turno;
		
		this.dibujar();
		gato.anotar(this);
	}
};

Casilla.prototype.dibujar = function() {
	var casi = document.getElementById(this.htmlId);
	casi.style.backgroundImage = this.jugador === jugador1 ? `url(${pics[0]})` : `url(${pics[1]})`;
}

function Jugador(name, id) {
	this.name = name;
	this.id = id;
	this.victorias = 0;
	this.derrotas = 0;
}

function inicio() {
	jugador1 = new Jugador("Jugador 1", 5);
	jugador2 = new Jugador("Jugador 2", 2);

	gato = new Gato(jugador1, jugador2);

	casilla1 = new Casilla(0, 0, "cas1");
	casilla2 = new Casilla(0, 1, "cas2");
	casilla3 = new Casilla(0, 2, "cas3");

	casilla4 = new Casilla(1, 0, "cas4");
	casilla5 = new Casilla(1, 1, "cas5");
	casilla6 = new Casilla(1, 2, "cas6");
	
	casilla7 = new Casilla(2, 0, "cas7");
	casilla8 = new Casilla(2, 1, "cas8");
	casilla9 = new Casilla(2, 2, "cas9");

	var boton = document.getElementById('boton');
	boton.addEventListener('click', () => gato.mostrarTablero());
}