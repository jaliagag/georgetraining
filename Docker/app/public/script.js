console.log('script.js loaded');

getBookName();

async function getBookName(){
  const res = await fetch('/bookname');
  const data = await res.json();
  console.log(data);
}

