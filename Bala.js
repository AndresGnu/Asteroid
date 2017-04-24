function Bala()
{
	// super()
	Entidad.prototype.constructor.call(this);
	
	this.m_fRadio = 5;
	
	this.m_fRapidezMax = 8;
	
	this.m_fVida = 1.5;
	
	this.m_sEstilo = "Bala";
}

Bala.prototype = new Entidad();
Bala.prototype.constructor = Bala;

Bala.prototype.Actualizar = function()
{
	Entidad.prototype.Actualizar.call(this);
	
	// por cada asteroide en la escena
	var listaAsteroides = Juego.prototype.s_pSingleton.m_aAsteroides;
	
	for(var i = 0; i < listaAsteroides.length; i++)
	{
		var asteroide = listaAsteroides[i];
		
		// calcular la distancia cuadrada hasta el centro del asteroide
		var dist = this.m_vPos.DistSqr(asteroide.m_vPos);
		
		var radioCuadrado = this.m_fRadio + asteroide.m_fRadio;
		radioCuadrado *= radioCuadrado;
		
		// si la distancia es menor o igual a r1 + r2
		if(dist <= radioCuadrado)
		{
			// destruir la bala
			this.m_bDestruido = true;
			
			// destruir el asteroide
			asteroide.Destruir();
			return;
		}
	}
	
	this.m_fVida -= 60 / 1000;
	if(this.m_fVida < 0)
	{
		this.m_bDestruido = true;
	}
}