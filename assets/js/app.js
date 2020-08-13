const calculator = (str) =>{

	if (/^$/.test(str))
		return 0

	if (/\/[0]/.test(str))
		return "Divizion by zero";

	if (/[^0-9\+\-\*\/\(\)]/.test(str))
		return "<span style='font-size:12pt;'>Syntax: error</span>"

	return eval(str)
}

const textarea = document.querySelector('#coco')

const btns = document.querySelectorAll('.num, .op')

const btn = document.querySelector('.num, .op')

btns.forEach(mbtn => {
	mbtn.addEventListener('click', function(e){
		textarea.value += e.target.innerText
	})

})
const result = document.querySelector('#result')

textarea.addEventListener('keyup', function(e){
	result.innerHTML = calculator(e.target.value)
})