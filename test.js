function print(delay, message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(message);
      resolve();
    }, delay);
  });
}

// print(1000, "First")
//   .then(function () {
//     return print(1000, "Second");
//   })
//   .then(function () {
//     print(1000, "Third");
//   });

// print(1000, "First")
//   .then(() => print(1000, "Second"))
//   .then(() => print(1000, "Third"));

new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("First");
        resolve("Second");
    }, 1000);
})
  .then((value) => {
    setTimeout(() => {
        console.log(value);
    }, 1000);
    return "Third";
  })
  .then((value) => {
    setTimeout(() => {
        console.log(value);
    }, 1000);
  });
