function Nave()
{
	// llamar a super()
	Entidad.prototype.constructor.call(this);

	this.m_fRadio = 12.5;

	// setear propiedades
	this.m_fRapidezMax = 3;
	this.m_fFriccion = 0.015;

	this.m_fVelAngularMax = 1;
	this.m_fFriccionAngular = 0.015;

	this.m_sEstilo = "Nave";

	this.m_vPos.x = 250;
	this.m_vPos.y = 250;

	this.m_bArriba = false;
	this.m_bAbajo = false;
	this.m_bIzquierda = false;
	this.m_bDerecha = false;

	document.body.addEventListener("keydown", this.OnKeyDown);
	document.body.addEventListener("keyup", this.OnKeyUp);

	Nave.prototype.s_Nave = this;
}

Nave.prototype = new Entidad();
Nave.prototype.constructor = Nave;

Nave.prototype.s_Nave = null;

Nave.prototype.OnKeyDown = function(event)
{
	//alert(event.keyCode);

	//Nave.prototype.s_Nave.m_fAceleracion = 0.1;
	//Nave.prototype.s_Nave.m_fAcAngular = 0.1;

	switch(event.keyCode)
	{
		// disparo
		case 32:
			Nave.prototype.s_Nave.Disparar();
			break;

		// izquierda
		case 37:
			Nave.prototype.s_Nave.m_bIzquierda = true;
			break;

		// arriba
		case 38:
			Nave.prototype.s_Nave.m_bArriba = true;
			break;

		// derecha
		case 39:
			Nave.prototype.s_Nave.m_bDerecha = true;
			break;

		// abajo
		case 40:
			Nave.prototype.s_Nave.m_bAbajo = true;
			break;
	}
}

Nave.prototype.OnKeyUp = function(event)
{
	//alert(event.keyCode);

	//Nave.prototype.s_Nave.m_fAceleracion = 0.0;
	//Nave.prototype.s_Nave.m_fAcAngular = 0.0;

	switch(event.keyCode)
	{
		// izquierda
		case 37:
			Nave.prototype.s_Nave.m_bIzquierda = false;
			break;

		// arriba
		case 38:
			Nave.prototype.s_Nave.m_bArriba = false;
			break;

		// derecha
		case 39:
			Nave.prototype.s_Nave.m_bDerecha = false;
			break;

		// abajo
		case 40:
			Nave.prototype.s_Nave.m_bAbajo = false;
			break;
	}

}

Nave.prototype.Actualizar = function()
{
	// aceleracion lineal
	if(this.m_bArriba)
	{
		this.m_fAceleracion = 0.1;
	} else {

		if(this.m_bAbajo)
		{
			this.m_fAceleracion = -0.1;
		} else {
			this.m_fAceleracion = 0;
		}
	}

	if(this.m_bDerecha)
	{
		this.m_fAcAngular = 0.1;
	} else {

		if(this.m_bIzquierda)
		{
			this.m_fAcAngular = -0.1;
		} else {
			this.m_fAcAngular = 0;
		}
	}

	Entidad.prototype.Actualizar.call(this);
}

Nave.prototype.Disparar = function()
{
	var miBala = new Bala();
	Juego.prototype.s_pSingleton.AgregarEntidad(miBala);

	miBala.m_vPos.x = this.m_vPos.x;
	miBala.m_vPos.y = this.m_vPos.y;
	miBala.m_fAngulo = this.m_fAngulo;

	miBala.m_vVel.x = Math.cos(miBala.m_fAngulo * Math.PI / 180.0) * miBala.m_fRapidezMax;

	miBala.m_vVel.y = Math.sin(miBala.m_fAngulo * Math.PI / 180.0) * miBala.m_fRapidezMax;
}
