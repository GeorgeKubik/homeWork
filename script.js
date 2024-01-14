'use strict';

//! 1) Какие бывают алгоритмы сортировок ?

// Пузырьковая сортировка

/* 
	Проходимся по массиву, берем 2 первых элемента и при необходимости меняем их местами, далее берем 2 и 3 элемент и т.д.
	Необходимый элемент будет самым правым.
*/
// Сортировка выбором
/* 
	Этот алгоритм сначала проводит операции сравнения и находит наименьший элемент, а только потом помещает его в начало массива. 
	После первого прохода алгоритм исключает первый элемент из
	  рассмотрения и ищет минимальный элемент в оставшейся части массива, а затем помещаем его на второе место.
*/
// Быстрая сортировка

/* 
	Это когда мы меняем местами элементы на самом большом расстоянии друг от друга. 
	Чтобы разместить элементы в порядке возрастания, надо попарно поменять их местами:
	первый и последний, потом второй и предпоследний, и так далее.
*/

//! 3) Создать объект Person несколькими способами, после создать объект Person2, чтобы в нём были
//!    доступны методы объекта Person. Добавить метод logInfo чтоб он был доступен всем объектам.

const person = {};
person.logInfo = (name) => name;
/* const person = new Object(); */
/* const person = Object.create({}); */
const person2 = Object.create(person);
console.log(person2.logInfo('Alex'));

//! 4) Создать класс PersonThree c get и set для поля name и конструктором, сделать класс наследник от
//!    класса Person.
class Person {
	constructor(name) {
		this.name = name;
	}
}
class PersonThree extends Person {
	constructor(name) {
		super(name);
	}
	get userName() {
		return this.name;
	}
	set userName(value) {
		if (value === 'Alex') {
			console.log('Admin');
		};
		if (value === '') {
			console.log('Not User');
		};
		this.name = value;
	}
}

const user = new PersonThree();
user.userName = 'Alex';
user.userName = '';
user.userName = 'John';
console.log(user.userName);

//! БОНУС:
//! 1) Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total :
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const total = 13;
//result = [4, 9]
const firstSum = (arr, total) => {
	const coincided = [];
	let totalCoincided = 0;
	for (let i = 0; i < arr.length - 1; i++) {
		let indexOne = i;
		for (let j = i + 1; j < arr.length; j++) {
			const result = arr[j] + arr[indexOne];
			if (result === total && totalCoincided < 1) {
				totalCoincided += 1;
				coincided.push(arr[indexOne], arr[j]);
			}
		}
	}
	return coincided;
}
console.log(firstSum(arr, total));

//! 2) Какая сложность у вашего алгоритма ?

// Сложность O(n^2) возникла из-за двух итераций массива друг в друге.


