//@ref https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model
//S: 标的现价
//L: 标的交割价
//T: TimeLeft 余下有效时间，可用余下天数/365大概计算获得
//r1: risk-free rate 无风险利率（一般用银行同业利率即可），相当于投资的机会成本
//r2: volatility of returns of the underlying asset, 资产的派息收入，一般没有(i.e.为零)
//d: 波幅指数 或 年化标准差, 特别地，针对 HSI 来源见 https://hk.investing.com/indices/hsi-volatility
//   或 http://www.quamnet.com/Quote.action?stockCode=VHSI
//   后面api化这个波幅指数，暂时先大概 hardcode测试用.

var _log=Math.log;
var _sqrt=Math.sqrt;
var _exp=Math.exp;

//var _norm=Math.norm;//<script src='math_norm_es5.js'></script>
var math_norm_es5=require('./math_norm_es5');
var _norm=math_norm_es5();

///////////////////////////////////////////////////////////////////////////////
function BlackScholes(C1P0,S,L,T,r1,r2,d){
	if(T>0){
		var d1 = (_log(S/L)+((r1-r2)+d*d/2)*T)/(d*_sqrt(T));
		var d2 = d1 - d*_sqrt(T);
		if (C1P0==1 || C1P0=='c') //Call
		return S*_exp(-r2*T)*_norm.cdf(d1)-L*_exp(-r1*T)*_norm.cdf(d2)
		else //Put
		return L*_exp(-r1*T)*_norm.cdf(-d2)-S*_exp(-r2*T)*_norm.cdf(-d1)
	}else{
		throw new Error("T must > 0");
	}
}
///////////////////////////////////////////////////////////////////////////////

var logger=console;
//logger.log(_norm);

//TEST
logger.log(BlackScholes('c',21000,20800,3/365,0.0019,0.0001,0.1363));
logger.log(BlackScholes('c',21000,22800,5/365,0.0019,0.0001,0.1363));
logger.log(BlackScholes('p',21000,22800,3/365,0.0019,0.0001,0.1363));
logger.log(BlackScholes('p',21000,20000,1/365,0.0019,0.0001,0.1363));
