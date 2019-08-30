/* eslint-disable no-undef,no-use-before-define,prefer-destructuring */
// eslint-disable-next-line import/extensions
// import './index2.js';

// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// eslint-disable-next-line import/no-unresolved
// import { FileHandle as flag } from 'node/fs';
const words = require('an-array-of-english-words');
const Const = require('../../Constants.js');
const dbFuncs = require('./index2.js');

// const maxLength = 40;
// window.indexES6 = {
class primaryFuncs {
  // inputAlphabet = (inputtext) => {
  //   const alphaExp = /^[a-zA-Z ]+$/;
  //   if (inputtext.match(alphaExp)) {
  //     return true;
  //   }
  //   return false;
  // }

  hasValidWords = (inputValue) => {
    let flag = true;
    const checkWords = inputValue.toLowerCase().split(' ');
    checkWords.forEach((checkWord) => {
      // eslint-disable-next-line array-callback-return
      if (!words.some(word => word === checkWord)) {
        flag = false;
      }
    });
    return flag;
  };

  // eslint-disable-next-line no-unused-vars
  addTask = () => {
    const inputValue = document.getElementById('myForm').elements.namedItem('inputData').value;
    if (!inputValue.replace(/\s/g, '').length) {
      alert("Please enter some task, don't just enter space");
      // } else if (!this.inputAlphabet(inputValue)) {
      //   alert('Your content seems to have some undefined text');
      // eslint-disable-next-line no-empty
    // } else if (inputValue.length >= Const.Constants.maxLength) { // valid length checking
    //   alert('Too big task! cannot add tasks longer than 40 letters');
    //   alert(inputValue.length);
    } else if (!this.hasValidWords(inputValue)) {
      alert('Does not have valid dictionary words');
    } else if (inputValue.length > 20) {
      alert('Too long task cannot add');
    } else {
      // async/
      // {
      let flag = true;
      const Promise1 = dbFuncs.dbFunctions.readData();
      Promise1
        .then(data => (data))
        .then((data) => {
          // const dataElements = [];
          data.forEach((dataValue) => {
            if (dataValue.task.toLowerCase() === inputValue.toLowerCase()) {
              flag = false;
              // dataElements.push(dataValue);
            }
          });
          if (flag) {
            const date = new Date();
            const timeStamp = date.getTime();
            const dataInsert = {};
            const status = 'todo';
            dataInsert.task = inputValue;
            dataInsert.timestamp = timeStamp;
            dataInsert.status = status;
            dataInsert.imp = false;

            dbFuncs.dbFunctions.insertJson(dataInsert);
            this.printTodo(status);
          } else {
            alert('This task is already present in your todo list so could not insert again');
          }
        });
    }
  }

  addCloseButton = () => {
    const closeButtons = document.getElementsByClassName('close');
    Array.prototype.forEach.call(closeButtons, (closeButton) => {
      // eslint-disable-next-line no-param-reassign
      closeButton.onclick = () => {
        const div = closeButton.parentElement;
        div.style.display = 'none';
        const key = closeButton.parentElement.getElementsByTagName('span')[1].innerHTML;
        dbFuncs.dbFunctions.deleteElement(key);
      };
    });
  }

  addCheckBoxEvents = (checkBoxElements, status) => {
    Array.prototype.forEach.call(checkBoxElements, (checkBoxElement) => {
      // eslint-disable-next-line no-param-reassign
      checkBoxElement.onclick = () => {
        if (checkBoxElement.checked) {
          const key = checkBoxElement.parentElement.parentElement.getElementsByTagName('span')[1].innerHTML;
          dbFuncs.dbFunctions.update(key, status);
          this.printTodo(status);
        }
      };
    });
  }


  createCheckBox = (str, status) => {
    // eslint-disable-next-line no-undef
    const spanCheck = document.createElement('span');
    spanCheck.title = status;
    spanCheck.className = 'checkbox';
    // eslint-disable-next-line no-undef
    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.className = `check_${status}`;
    inputCheck.name = `check_${status}`;
    if (str === status) {
      inputCheck.checked = true;
      inputCheck.disabled = true;
    }
    spanCheck.appendChild(inputCheck);
    return spanCheck;
  }

  createElements = (dataElement, str) => {
    // eslint-disable-next-line no-undef
    const div = document.createElement('div');
    div.className = 'li_element';

    const markImp = document.createElement('input');
    markImp.type = 'radio';
    markImp.className = 'markAsImp';
    markImp.title = 'mark as important';
    // markImp.id = `markImp${str}`;

    const spanTask = document.createElement('span');
    spanTask.className = 'task';
    const taskTxt = document.createTextNode(dataElement.task);
    spanTask.appendChild(taskTxt);
    const spanKey = document.createElement('span');
    spanKey.className = 'span_key';
    const keyTxt = document.createTextNode(dataElement.id);
    spanKey.appendChild(keyTxt);

    const button = document.createElement('button');
    const txt = document.createTextNode('x');
    button.className = 'close';
    button.appendChild(txt);

    // have only one possible checkbox in each element
    // console.log(`imp = ${dataElement.imp}`);
    if (dataElement.imp === 'true') {
      // console.log(`status imp ${dataElement.imp}`);
      // markImp.classList.add('Imp');
      markImp.checked = 'checked';
    }
    div.appendChild(markImp);
    div.appendChild(spanTask);
    div.appendChild(spanKey);
    div.appendChild(button);
    if (str === 'todo') {
      const spanCheck2 = this.createCheckBox(str, 'inprogress');
      div.appendChild(spanCheck2);
    } else if (str === 'inprogress') {
      const spanCheck3 = this.createCheckBox(str, 'done');
      div.appendChild(spanCheck3);
    } else if (str === 'done') {
      const spanCheck2 = this.createCheckBox(str, 'inprogress');
      div.appendChild(spanCheck2);
    }

    // have all checkboxes
    // const spanCheck1 = this.createCheckBox(str, 'todo');
    // const spanCheck2 = this.createCheckBox(str, 'inprogress');
    // const spanCheck3 = this.createCheckBox(str, 'done');
    //
    // div.appendChild(spanTask);
    // div.appendChild(spanKey);
    // div.appendChild(button);
    // div.appendChild(spanCheck1);
    // div.appendChild(spanCheck2);
    // div.appendChild(spanCheck3);


    return (div);
  }

  printTodo = (status) => {
    const todoElement = document.getElementById('li_todo');
    const inProgressElement = document.getElementById('li_inprogress');
    const doneElement = document.getElementById('li_done');
    todoElement.classList.remove('toHighlight');
    inProgressElement.classList.remove('toHighlight');
    doneElement.classList.remove('toHighlight');
    if (status === 'todo') {
      todoElement.classList.add('toHighlight');
    } else if (status === 'inprogress') {
      inProgressElement.classList.add('toHighlight');
    } else if (status === 'done') {
      doneElement.classList.add('toHighlight');
    }
    console.log(`I'm called with status ${status}`);
    const Promise1 = dbFuncs.dbFunctions.readData();
    Promise1
      .then(data => (data))
      .then((data) => {
        const dataElements = [];
        data.forEach((dataValue) => {
          if (dataValue.status === status) {
            dataElements.push(dataValue);
          }
        });

        document.getElementById('demo').innerHTML = '';
        const list = document.getElementById('demo');

        const divOuter = document.createElement('div');
        divOuter.className = 'flex-container';
        const dataElementsImp = [];
        const dataElementsNImp = [];
        dataElements.forEach((dataElement) => {
          if (dataElement.imp === 'true') {
            dataElementsImp.push(dataElement);
          } else if (dataElement.imp === 'false') {
            dataElementsNImp.push(dataElement);
          }
        });

        dataElementsImp.forEach((dataElement) => {
          const div = this.createElements(dataElement, status);
          div.classList.add('highlight');
          divOuter.appendChild(div);
        });
        dataElementsNImp.forEach((dataElement) => {
          const div = this.createElements(dataElement, status);
          divOuter.appendChild(div);
        });


        list.appendChild(divOuter);

        // add close button to the li elements and click event
        this.addCloseButton();

        // add checkbox events
        const checkBoxElementTodo = document.getElementsByClassName('check_todo');
        const checkBoxElementInProgress = document.getElementsByClassName('check_inprogress');
        const checkBoxElementDone = document.getElementsByClassName('check_done');
        this.addCheckBoxEvents(checkBoxElementTodo, 'todo');
        this.addCheckBoxEvents(checkBoxElementInProgress, 'inprogress');
        this.addCheckBoxEvents(checkBoxElementDone, 'done');
        const markImps = document.getElementsByClassName('markAsImp');
        Array.prototype.forEach.call(markImps, (markImp) => {
          // console.log(markImp);
          markImp.addEventListener('click', () => {
            // console.log('hi');
            const id = markImp.parentElement.getElementsByTagName('span')[1].innerHTML;

            // markImp.classList.add('Imp');
            // console.log('to updtae imp = ', id);
            dbFuncs.dbFunctions.updateStatus(id);
            this.printTodo(status);
          });
        });
      })
      .catch((status1) => {
        console.log(`Reading data Failed with status ${status1}`);
      });

    return (Promise1);
  }

  // static deleteAll() {
  //
  // }
}

// eslint-disable-next-line new-cap
const a = new primaryFuncs();
// li_todo.onclick = printTodo('todo');
// li_inprogress.onclick = printTodo('inprogress');
// li_done.onclick = printTodo('done');
const body = document.getElementsByTagName('body');
body[0].addEventListener('load', a.printTodo('todo'));

const addBtn = document.getElementsByClassName('button1');
addBtn[0].addEventListener('click', () => {
  // const inpTxt = document.getElementsByName('inputData');
  a.addTask();
});
// body.onload = printTodo('todo');

const liTodo = document.getElementById('li_todo');
const liInprogress = document.getElementById('li_inprogress');
const liDone = document.getElementById('li_done');
liTodo.addEventListener('click', () => {
  a.printTodo('todo');
});
liInprogress.addEventListener('click', () => {
  a.printTodo('inprogress');
});
liDone.addEventListener('click', () => {
  a.printTodo('done');
});
//
// const deleteAll = document.getElementsByClassName('delete');
// deleteAll[0].addEventListener('click', () => {
//   dbFuncs.dbFunctions.deleteAll();
// });

const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('aboutApp');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('closeAbt')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};
//
// btn.addEventListener('mouse-over', () => {
//   modal.style.display = 'block';
// });

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// eslint-disable-next-line max-len
// markImp = document.getElementsByClassName('markAsImp').parentElement.getElementsByTagName('span')[1].innerHTML;

module.exports = {
  primaryFuncs,
  // perimeter
};
