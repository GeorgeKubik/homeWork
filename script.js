
// Задание 1 Создать объект counter всеми возможными способами;
//! 1 способ 
const counter = { name: "Alex", age: 23, obj: { a: 1, b: 2 } };

//! 2 способ
const counter2 = new Object();

//! 3 способ
const counter3 = Object.create({});

// Задание 2 – Скопировать объект counter всеми возможными способами;

//! 1 Способ объект копируется
const counterCopy = Object.assign({}, counter);
console.log(counterCopy);

//! 2 Способ при копировании получаем ссылку на объект
const counterCopy2 = Object.create(counter);
console.log(Object.getPrototypeOf(counterCopy2));

//! 3 Способ при копировании получаем ссылку на объект
const counterCopy3 = counter;
console.log(counterCopy3);

//! 4 Способ объект копируется
function counterCopy4(counter) {
	let objCopy = {};
	for (let key in counter) {
		objCopy[key] = counter[key];
	}
	return objCopy;
}
const newCounter = counterCopy4(counter);
console.log(newCounter);

//! 5 Способ объект копируется
const counterCopy5 = { ...counter };
console.log(counterCopy5);

//! 6 Способ объект копируется
const counterCopy6 = structuredClone(counter);
console.log(counterCopy6);

//! 7 Способ объект копируется
const counterCopy7 = JSON.parse(JSON.stringify(counter));
console.log(counterCopy7);

// Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;
function makeCounter() { };
const makeCounter1 = function () { };
const makeCounter2 = () => { };
const makeCounter3 = function makeCounterFunc4() { };

// Бонус Задание 1 – Написать функцию глубокого сравнения двух объектов:
const obj1 = {
	here: {
		is: "on",
		other: "3"
	},
	object: 'Z'
};
const obj2 = {
	here: {
		is: "on",
		other: "2"
	},
	object: 'Z'
};

const deepEqual = (obj1, obj2) => {
	const objKeys1 = Object.keys(obj1);
	const objKeys2 = Object.keys(obj2);

	if (objKeys1.length !== objKeys2.length) return false;

	for (let key of objKeys1) {
		const value1 = obj1[key];
		const value2 = obj2[key];

		const isObjects = isObject(value1) && isObject(value2);

		if ((isObjects && !deepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
			return false;
		}
	}
	return true;
};

const isObject = (obj) => {
	return obj !== null && typeof obj === 'object';
}
console.log(deepEqual(obj1, obj2));

// Бонус Задание 2 – Развернуть строку в обратном направлении при помощи методов массивов:

const str = 'Развернуть строку в обратном направлении при помощи методов массивов'

function reverseStr(str) {
	const strReverse = str.split('').reverse().join('');
	return strReverse
}
console.log(reverseStr(str));

// Доп вопрос про toString в Array

console.log(+[6]); // 6
console.log(+[6, 5].toString()); // NaN

// Насколько я понял, при унарном операторе происходит преобразовании объекта, в первом случае у нас 1 значение, с помощью метода toString
// получаем '6' и унарный оператор выводит 6
// а в случае с массивом, мы получаем строку '6, 5' и при преобразовании строки в число JS не понимает запятую в строке и считает массив не числом (NaN) 
