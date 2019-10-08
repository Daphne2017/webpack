import '../css/style.css'; // ../跳出去
import '../css/bootstrap.css';
import $ from 'jquery';
import { getProductTree } from './axios';
import { getProduc1 } from './axios1';
$('#div2').css('background','red')
let a = 10;
console.log('124456,webpack4')
console.log('124456,webpack4', a)
getProductTree().then(data => {
  console.log('xxxxxxxx',data)
})
getProduc1().then(data => {
  console.log('yyyyyyyyyy',data)
})
