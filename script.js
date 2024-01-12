'use strict';

// 1) Написать ответ - почему массивы в JS являются "неправильными" и совмещают в себе несколько
// структур данных? Какие ?

//! Массив задумывался неизменным. В JS длинна массива является динамической. В массив можно добавлять, удалять элементы, тем самым изменять длинну.
//! Есть структуры данных производные от массива: стек и очередь.

// 2) Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
	console.log(`I output only external context: ${this.item}`);
}
const obj = { item: "some value" };

logger.call(obj);
logger.apply(obj);

const addObj = logger.bind(obj);
addObj();

// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

const bind = (func, context, ...boundArgs) => (...args) => {
	return func.apply(context, [...boundArgs, ...args]);
}

function greeting(surname, greeting, punctuation) {
	return `${greeting} ${this.userName} ${surname} ${punctuation}`;
}

const user = { userName: "Alex" };
const userBound = bind(greeting, alex, 'Ivanov');
userBound("Hello", "!");