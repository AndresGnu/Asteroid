function Asteroide()
{
	// llamar a super()
	Entidad.prototype.constructor.call(this);
	
	this.m_fRadio = 25;
	
	this.m_iFragmentos = 1 + Math.floor(Math.random() * 4);
	
	// rapidez constante
	this.m_fRapidezMax = 0.5;
	
	this.m_fVelAngular = 1;
	this.m_fVelAngularMax = 1;
	
	// angulo aleatorio
	this.m_fAngulo = Math.random() * 360;
	
	this.m_vVel.x = Math.cos(this.m_fAngulo * Math.PI / 180) * this.m_fRapidezMax;
	this.m_vVel.y = Math.sin(this.m_fAngulo * Math.PI / 180) * this.m_fRapidezMax;
	
	// posicion inicial en los bordes de la pantalla
	var angulo = Math.random() * Math.PI * 2.0;
	var cosAngulo = Math.cos(angulo);
	var sinAngulo = Math.sin(angulo);
	
	var valorMaximo = 225;
	var valorMinimo = 150;
	
	var radio = valorMinimo + (Math.random() * (valorMaximo - valorMinimo));
	
	this.m_vPos.x = 250.0 + cosAngulo * radio;
	this.m_vPos.y = 250.0 + sinAngulo * radio;
	
	this.m_sEstilo = "Asteroide";
}

Asteroide.prototype = new Entidad();
Asteroide.prototype.constructor = Asteroide;

Asteroide.prototype.CrearDiv = function()
{
	Entidad.prototype.CrearDiv.call(this);
	
	Juego.prototype.s_pSingleton.AgregarAsteroide(this);
}

Asteroide.prototype.EliminarDiv = function()
{
	Entidad.prototype.EliminarDiv.call(this);
	
	Juego.prototype.s_pSingleton.EliminarAsteroide(this);
}

Asteroide.prototype.Destruir = function()
{
	this.m_bDestruido = true;
	
	for(var i = 0; i < this.m_iFragmentos; i++)
	{
		var fragmento = new AsteroideChico();
		Juego.prototype.s_pSingleton.AgregarEntidad(fragmento);
		
		fragmento.m_vPos.x = this.m_vPos.x;
		fragmento.m_vPos.y = this.m_vPos.y;
	}
}