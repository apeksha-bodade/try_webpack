/* eslint-disable */
// from "indexES6" import printTodo;
// eslint-disable-next-line no-undef,import/no-unresolved
const Const = require('../../Constants.js');
// eslint-disable-next-line no-undef
const ç = new XMLHttpRequest();
// eslint-disable-next-line no-undef
// window.index2 = {
class dbFunctions {
  static insertJson = (data) => {
    console.log('Inside insert');
    // console.log('IN console Const = ', Const.Constants.url);
    const Promise1 = new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      xhr.open('POST', Const.Constants.url, true);
      // eslint-disable-next-line no-undef
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onload = () => {
        // console.log('Inside load');
        // eslint-disable-next-line no-undef

        // eslint-disable-next-line no-undef
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          resolve();
        } else {
          reject(xhr.status);
        }
      };
      // eslint-disable-next-line prefer-destructuring
      const task = data.task;
      // eslint-disable-next-line prefer-destructuring
      const timestamp = data.timestamp;
      // eslint-disable-next-line prefer-destructuring
      const status = data.status;
      // eslint-disable-next-line prefer-destructuring
      const imp = data.imp;
      xhr.send(`task=${task}&timestamp=${timestamp}&status=${status}&imp=${imp}`);
    });
    Promise1
      .then(() => {
        console.log('insert successful');
        // alert('successful');
      })
      .catch((status) => {
        console.log(`Insert Failed with status code${status}`);
      });
    return Promise1;
  }


  static deleteElement = (id) => {
    console.log(`Was called ${id}`);
    const Promise1 = new Promise((resolve, reject) => {
      xhr.open('DELETE', `${`${Const.Constants.url}/`}${id}`, false);
      xhr.onload = () => {
        // var users = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve();
          // printTodo('todo');
        } else {
          console.log('fail');
          reject(xhr.status);
        }
      };
      xhr.send(null);
    });
    Promise1
      .then(() => {
        console.log('Successfully deleted element');
      })
      .catch((status) => {
        console.log(`Delete 'Failed' with status ${status}`);
      });
    return Promise1;
  }


  static readData = () => new Promise((resolve, reject) => {
    let data;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        resolve(data);
        // callback(data);
      }

      if (xhr.status === 404) {
        reject(xhr.status);
        console.log('File or resource not found');
      }
    };
    xhr.open('GET', Const.Constants.url, false);
    xhr.send();
  })

  // eslint-disable-next-line no-unused-vars
  static deleteAll = () => {
    const Promise1 = this.readData();

    return Promise1
      .then((data) => {
        // eslint-disable-next-line prefer-destructuring
        const length = data.length;
        console.log(`data length${length}`);
        let i;
        let p = Promise.resolve();
        for (i = 0; i < length; i + 1) {
          const i1 = i;
          p = p.then(() => new Promise((resolve) => {
            this.deleteElement(data[i1].id);
            resolve();
          }));
        }
        if (i === length) {
          return 'Completed Successfully';
        }
        throw (i, length);
      })
      .then(() => {
        console.log('Successfully deleted all elements');
        return '';
      })

      .catch((error, i, length) => {
        console.log(error);
        console.log(`${`${'Failed with unknown error only deleted '}${length}` - i}elements`);
      })
      .finally(() => {
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          window.printTodo('todo');
        });
      });
  }

  static update = (id, status) => {
    const Promise1 = new Promise((resolve, reject) => {
      xhr.open('PATCH', `${Const.Constants.url}/${id}`, false);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve();
        } else {
          reject(xhr.status);
        }
      };
      xhr.send(`status=${status}`);
    });

    Promise1
      .then(() => {
        console.log('Successfully updated');
      })
      .catch((error) => {
        console.log(`Failed with status${error}`);
      });
    return (Promise1);
  }

  static updateStatus(id) {
    const imp = true;
    const Promise1 = new Promise((resolve, reject) => {
      xhr.open('PATCH', `${Const.Constants.url}/${id}`, false);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve();
        } else {
          reject(xhr.status);
        }
      };
      xhr.send(`imp=${imp}`);
    });

    Promise1
      .then(() => {
        console.log('Successfully updated');
      })
      .catch((error) => {
        console.log(`Failed with status${error}`);
      });
    return (Promise1);
  }
}

module.exports = {
  dbFunctions,
  // perimeter
};
