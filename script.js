'use strict';

//! 1)
console.log('1');
setTimeout(() => console.log('2'), 1);
let promiseNew = new Promise((resolve) => {
	console.log('3');
	resolve();
});
promiseNew.then(() => console.log('4'));
setTimeout(() => console.log('5'));
console.log('6');
// '1', '3', '6' синхронная операция
// '4' микро задача
// '5' '2' макро задача
//! result
// '1', '3', '6', '4', '5', '2',

//! 2)
let promiseTree = new Promise((resolve, reject) => {
	resolve('a');
	console.log("1");
	setTimeout(() => {
		console.log("2");
	}, 0);
	console.log("3");
});

// 'a' в данном случае не выпадет в консоль, если сделать resolve(console.log('a'));, то 'a' выполнится первым, как синхронная операция
// '1' '3' синхронная операция
// '2'макро задача
//! result
// '1', '3', '2'


//! 3)
let promiseTwo = new Promise((resolve, reject) => {
	resolve("a");
});
promiseTwo
	.then((res) => {
		return res + "b";
	})
	.then((res) => {
		return res + "с";
	})
	.finally((res) => {
		return res + "!!!!!!!";
	})
	.catch((res) => {
		return res + "d";
	})
	.then((res) => {
		console.log(res);
	});

// resolve передаст в .then(res) значение 'a', далее из-за отсутствия ошибок 2 раза сложим 'a+b+c', finally выполнится в любом случае, но, не передаст и не получит никаих значений,
// .catch не выполнится, из-за отсутствия ошибки, и последний then выведет результат.
//! result
// 'abc'


//! 4)
function doSmth() {
	return Promise.resolve("123");
}
doSmth()
	.then(function (a) {
		console.log("1", a); // '123'
		return a;
	})
	.then(function (b) {
		console.log("2", b); // '123'
		return Promise.reject("321");
	})
	.catch(function (err) {
		console.log("3", err); // '321'
	})
	.then(function (c) {
		console.log("4", c); // undefined
		return c;
	});

// '1' - выведится '123', так как resolve передаст в then значение
// '2' - далее отработает 2 then вернет '123', но на последнем код попадет в ошибку и вернет reject
// '3' - выведет '321' так как сработал reject и отработает блок с .catch
// '4' - undefined так как после catch мы ничего не вернули
//! result
// '123', '123', '321', undefined

//! 5)

console.log("1");
setTimeout(function () {
console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// '1', '4' синхронная операция
// '3' микро задача
// '2' макро задача
//! result
// '1', '4', '3', '2'


//! 6) Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого
//! элемента с задержкой в 3 секунды. Входные данные: [10, 12, 15, 21]
const arr = [10, 12, 15, 21];

function getValueThroughInterval(arr) {
	arr.forEach((element, i) => setTimeout(() => console.log(i), 3000 * (i + 1)));
}
getValueThroughInterval(arr);

// Задание "со звёздочкой":

// 1) Сначала без запуска подцумайте какой будет порядок вывода в консоль
// 2) Скопируйте и запустите код в любой консоли
// 3) А дальше прикрипите к дз подробное обьяснение по шагам о работе эвент лупа в этом коде и собственно объяснение почему выведеться именно в таком порядке

Promise.resolve()
	.then(() => console.log("a: 1"))
	.then(() => {
		setTimeout(() => console.log("timeout 2"));
		console.log("a: 2");
	})
	.then(() => {
		setTimeout(() => console.log("timeout 3"));
		console.log("a: 3");
	});

new Promise((res, rej) => {
	console.log("b");
	rej(new Error("123"));
})
	.then(console.log("b 1"))
	.then(
		() => console.log("b 2"),
		() => console.log("b")
	)
	.catch(() => console.log("b 3"))
	.then(() => console.log("b 4"));
	
//! Синхронные операции
// Сначало исполняться синхронные операции их здесь 2 
/* console.log("b"); */ // при создании new Promise b выполнится сразу,
/* console.log("b 1") */ // b1 выведеиться следующим так как операция без callback и выполниться синхронно
//! Асинхронные операции 
//! Микротаски
// При сканировании кода Event loop записал очередь, в которой микротаски будут выполняться. В целом, если убрать
// все подводные камни два промиса будут выполнять метод then поочереди
// Так как пока выполняется асинхронная операция, и получение значения у одного метода, 
// код на этом этапе ждет результат и идет к другому промису, и т.д.  
/* console.log("a: 1") */ //  а: 1 был записан первым в цепочке микротасков
/* console.log('a: 2'); */ // далее идет а: 2 так как предыдущий метод, со значением a: 1, выполнился успешно,
// а () => console.log("timeout 2"); записался в WebAPI
/* console.log('b'); */ // следующим выполнится b. Так как выполнение на этапе получения a: 2 асинхронное, 
// очередь выполнения метода перешла к функции конструктору и выполнился reject, мы помним, что 2-ой аргумент у then это reject
/* console.log("a: 3"); */ // далее выполнится a: 3, так как по очереди идут, a () => console.log("timeout 3"); записался в WebAPI
/* console.log("b 4") */ // выполнился b:4, очередь после a: 3
//! Макротаски
/* console.log("timeout 2") */ // И в конце выполнятся макростаски, первым будет timeout 2 
/* console.log("timeout 3") */ // Затем timeout 3

// 'b', 'b 1', "a: 1", 'a: 2', 'b', 'a: 3', 'b 4' 'timeout 2', 'timeout 3'
