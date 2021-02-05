let btnSubmit = document.querySelector("#submit");
let input = document.querySelector("#userInput");
let ul = document.querySelector("ul");

// pasitikrinam ar ne tuščias input laukas
function inputLength() {
	return input.value.length;
}
// sukuria <li> elementą paspaudus mygtuką su pele
function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}
btnSubmit.addEventListener("click", addListAfterClick);

// sukuria <li> elementą paspaudus ENTER
function addListAfterPressEnter(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}
input.addEventListener("keypress", addListAfterPressEnter);

// PAGRINDINIS ELEMENTO KURIMO KODAS
function createListElement() {
	let li = document.createElement("li");
	let startTime = new Date();
	li.innerHTML = input.value;
	ul.appendChild(li);
	input.value = "";
	let count = 0;

	// pažymime, kad užduotis atlikta
	function doneTask() {
		count++;
		li.classList.add("done");
		if (li.classList.contains('done')) {
			let endTime = new Date();
			if (count == 1) {
				swal("Užduotis įvykdyta!", `Užduočiai įvykdyti jūs užtrukote: ${(endTime.getTime() - startTime.getTime()) / 1000} s.`, "success");
			}
		}
	}
	li.addEventListener("dblclick", doneTask)

	// istriname užduotį iš sąrašo
	function deleteTask() {
		li.classList.add("delete")
	}
	let btnDelete = document.createElement("button");
	btnDelete.setAttribute('id', 'btnDelete');
	btnDelete.innerHTML = 'X';
	li.appendChild(btnDelete);
	btnDelete.addEventListener("click", deleteTask);

	// užvedus pelę ant užduoties parodo kiek praėjo laiko nuo jos pridėjimo
	function showTime() {
		let textTime = document.getElementById('textTime');
		let endTime = new Date();
		textTime.innerHTML = `Nuo užduoties pradžios praėjo: ${(endTime.getTime() - startTime.getTime()) / 1000} s.`;

		// parodo kiek praėjo laiko tik, jei užduotis nebaigta
		if (!li.classList.contains('done')) {
			textTime.classList.remove('hidden');
		}
	}
	li.addEventListener('mouseover', showTime);

	// paslepia praėjusį nuo užduoties pradžios laiką
	function hideTime() {
		let textTime = document.getElementById('textTime');
		textTime.classList.add('hidden');
	}
	li.addEventListener('mouseout', hideTime);
}