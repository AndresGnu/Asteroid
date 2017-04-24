function AsteroideChico()
{
	// llamar a super()
	Asteroide.prototype.constructor.call(this);
	
	this.m_fRadio = 12.5;
	
	this.m_iFragmentos = 0;
	
	// rapidez constante	
	this.m_vVel.Multiply(3);
	this.m_fRapidezMax *= 3;
	
	this.m_sEstilo = "AsteroideChico";
}

AsteroideChico.prototype = new Asteroide();
AsteroideChico.prototype.constructor = AsteroideChico;