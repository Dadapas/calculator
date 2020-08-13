function factorial(n){
	if (n<=1) return 1;
	if (n>14) return "Too mutch number"
	return (n*factorial(n-1))
}

function modulo(a, b){
	if (b==0) return "Division by zero"
	if (b<0) return "Not be negative"
	return (+a)%(+b);
}

function pourcentage(){
	textarea.value = /^(\-*\d+\.*\d*)$/.test(textarea.value) ? (+textarea.value / 100):0
	evalResult()
	textarea.focus()
}

function filterCalc(str){
	// Replace simbolique number
	str = str.replace(/(\-*\d+\.*\d*)*[ ]*(x|\*)[ ]*(\-*\d+\.*\d*)*/g, (s,d,op,d1,o,m)=>{
		var a = Number.isNaN(+d) ? 1: +d
		var b = Number.isNaN(+d1) ? 1: +d1
		return a*b
	})

	// Parenthese with no things
	str = str.replace(/\(\)/g, 0);

	// Parenthese with multiplication
	// str = str.replace(/\)(\-*\d+\.*\d*)|(\d+\.*\d*)\(/g, (f,d,d1,o,s)=>{
	// 	// return +d
	// })

	// Modulo function
	str = str.replace(/(\d+\.*\d*) mod [^\-](\d+\.*\d*)/, (f,g,d,o,s)=> {
		return modulo(+g,+d)
	})

	// Factorial number
	str = str.replace(/(\-*\d+)*\!/g, (s,k,o,d)=> k ? factorial(+k): 1)
	return str
}

const calculator = (str) =>{

	if (/^$/.test(str))
		return 0

	// Divisions
	str = str.replace(/\÷/g, '/');

	str = filterCalc(str)

	if (/\/[0]/.test(str))
		return "Divizion by zero";

	if (/[^0-9\.\+\-\*\/\(\)]/.test(str))
		return "<span style='font-size:12pt;'>Something, was incorrect</span>"

	var n = eval(str)

	return n.toString().length >= 16 ? n.toString().slice(0, 15) : n
}

function clearAll()
{
	textarea.focus()
	evalResult()
	textarea.value = ''
}

const evalResult = () =>{
	rslt=calculator(textarea.value);
	result.innerHTML=rslt;
	// textarea.value=/^\d+$/.test(rslt) ? rslt : 0
}

const textarea = document.querySelector('#coco')

const btns = document.querySelectorAll('.add')

const btn = document.querySelector('.btn, .op')

btns.forEach(mbtn => {
	mbtn.addEventListener('click', function(e){
		textarea.value += e.target.innerText
	})

})
const result = document.querySelector('#result')

textarea.addEventListener('keyup', (event)=>{
	if (event.isComposing || event.keyCode === 13) {
		evalResult()
  }

})
