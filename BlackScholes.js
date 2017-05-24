//@ref https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model
//S: 标的现价
//L: 标的交割价
//T: TimeLeft 余下有效时间，可用余下天数/365大概计算获得
//r1: risk-free rate 无风险利率（一般用银行同业利率即可），相当于投资的机会成本
//r2: volatility of returns of the underlying asset, 资产的派息收入，一般没有(i.e.为零)
//d: 年化标准差, 暂用 0.1363 //由统计之前的来获得？
function BlackScholes(C1P0,S,L,T,r1,r2,d){
	if(T>0){
		var d1 = (log(S/L)+((r1-r2)+d*d/2)*T)/(d*sqrt(T));
		var d2 = d1 - d*sqrt(T);
		if (C1P0==1 || C1P0=='c') //Call
		return S*exp(-r2*T)*norm.cdf(d1)-L*exp(-r1*T)*norm.cdf(d2)
		else //Put
		return L*exp(-r1*T)*norm.cdf(-d2)-S*exp(-r2*T)*norm.cdf(-d1)
	}else{
		throw new Error("T must > 0");
	}
}
//TEST
//console.log(BlackScholes('c',21000,20800,3/365,0.0019,0.0001,0.1363));
//console.log(BlackScholes('c',21000,22800,5/365,0.0019,0.0001,0.1363));
//console.log(BlackScholes('p',21000,22800,3/365,0.0019,0.0001,0.1363));
//console.log(BlackScholes('p',21000,20000,1/365,0.0019,0.0001,0.1363));
