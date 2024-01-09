'use strict';

// 1) Написать ответ - почему массивы в JS являются "неправильными" и совмещают в себе несколько
// структур данных? Какие ?

// 2) Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

/* function logger() {
	console.log(`I output only external context: ${this.item}`);
}
const obj = { item: "some value" };

logger.call(obj);
logger.apply(obj);

const addObj = logger.bind(obj);
addObj(); */

// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

const bind = (fn, context, ...boundArgs) => (...args) => {
	return fn.apply(context, [...boundArgs, ...args]);
}

// Пример:

function greeting(greeting, punctuation) {
	return `${greeting} ${this.userName}${punctuation}`;
}

const alex = { userName: "Alex" };
const alexBound = bind(greeting, alex);

console.log(alexBound("Hello", "!")); // 'Hello Alex!'