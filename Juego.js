function Juego()
{
	Juego.prototype.s_pSingleton = this;
	
	this.m_aEntidades = new Array();
	this.m_aAsteroides = new Array();
	
	this.IniciarJuego(25);
}

Juego.prototype.s_pSingleton = null;

Juego.prototype.IniciarJuego = function(numAsteroides)
{
	// crear los asteroides
	for(var i = 0; i < numAsteroides; i++)
	{
		this.AgregarEntidad(Math.random() > 0.5 ? new Asteroide() : new AsteroideChico());
	}

	// crear la nave
	this.AgregarEntidad(new Nave());
	
	setInterval(this.ActualizarJuego, 1000/60);
}

Juego.prototype.AgregarEntidad = function(entidad)
{
	this.m_aEntidades.push(entidad);
	entidad.CrearDiv();
}

Juego.prototype.Actualizar = function()
{
	for(var i = this.m_aEntidades.length - 1; i >= 0; i--)
	{
		var entidadActual = this.m_aEntidades[i];
		
		entidadActual.Actualizar();
		
		if(entidadActual.m_bDestruido)
		{
			entidadActual.EliminarDiv();
			this.m_aEntidades.splice(i, 1);
		}
	}
}

Juego.prototype.ActualizarJuego = function()
{
	Juego.prototype.s_pSingleton.Actualizar();
}

Juego.prototype.AgregarAsteroide = function(asteroide)
{
	this.m_aAsteroides.push(asteroide);
}

Juego.prototype.EliminarAsteroide = function(asteroide)
{
	var i = this.m_aAsteroides.indexOf(asteroide);
	
	if(i >= 0)
	{
		this.m_aAsteroides.splice(i, 1);
	}
}