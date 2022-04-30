// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  username: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  username: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  username: 'stw',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  username: 'ss',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

console.log(account2.username);

console.log(accounts[1].username);

// Functions
const calcBalance = function (movements) {
  const currentBalance = movements.reduce((prev, cur) => prev + cur, 0);
  return currentBalance;
};

// Creating movements rows
const displayMovements = function (allMovements) {
  movementsArr = [];
  allMovements.forEach((mov, i) => {
    movementsArr.push(`<div class="movements__row">
          <div class="movements__type movements__type--${
            mov > 0 ? 'deposit' : 'withdrawal'
          }">${i + 1} ${mov > 0 ? 'Deposit' : 'Withdrawal'}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>`);
  });
  movementsHTML = movementsArr.reverse().join('');
  containerMovements.innerHTML = movementsHTML;
};

const displaySums = function (movements, interestRate, balance) {
  const sumOut = Math.abs(
    movements.filter(mov => mov < 0).reduce((prev, cur) => prev + cur)
  );
  const sumIn = movements
    .filter(mov => mov > 0)
    .reduce((prev, cur) => prev + cur);

  const interest = balance * (interestRate / 100);
  labelSumIn.textContent = `${sumIn}€`;
  labelSumOut.textContent = `${sumOut}€`;
  labelSumInterest.textContent = `${interest}€`;
};

let currentAccount, balance;

// Event Handlers
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // What i tried to do
  // const accountUser = inputLoginUsername?.value;
  // const accountPin = Number(inputLoginPin?.value);
  // for (acc of accounts) {
  //   console.log(acc.username);

  //   if (acc.username === accountUser && acc.pin === accountPin) {
  //     console.log('Correct pin and user');
  //     containerApp.style.opacity = 100;
  //     break;
  //   } else {
  //     console.log('Wrong username or password');
  //     continue;
  //   }
  // }

  // What i should have done
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display message and UI
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }

  balance = calcBalance(currentAccount.movements);
  labelBalance.textContent = `${balance}€`;

  displayMovements(currentAccount.movements);

  displaySums(currentAccount.movements, currentAccount.interestRate, balance);

  logOutTimer();
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const receivingAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);

  currentAccount.movements.push(-transferAmount);
  receivingAcc.movements.push(transferAmount);
  balance = calcBalance(currentAccount.movements);

  displayMovements(currentAccount.movements);
  labelBalance.textContent = `${balance}€`;

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

const logOutTimer = function () {
  const everySecond = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Login to get started`;
    }

    // Decrease 1s
    time--;
  };
  // Set Time to 5 minutes
  let time = 300;

  // Call the timer every second
  everySecond();
  const timer = setInterval(everySecond, 1000);
  return timer;
};

// Sort button handler
let sorted = false;
const sort = function (movements) {
  const movArray = [...movements];
  const unSortedArray = movArray;
  if (!sorted) {
    const sortedArr = movArray.sort((a, b) => a > b);
    sorted = true;
    console.log(sorted);
    return sortedArr;
  } else {
    sorted = false;
    console.log(sorted);
    return unSortedArray;
  }
};

btnSort.addEventListener('click', _ => {
  displayMovements(sort(currentAccount.movements));
});

// Closing account handler
const closeAccount = function () {
  const userName = inputCloseUsername.value;
  const psswd = Number(inputClosePin.value);
  console.log(userName, psswd);
  accounts.forEach((acc, i) => {
    if (userName === acc.username && psswd === acc.pin) {
      accounts.splice(i, 1);
      containerApp.style.opacity = 0;
    } else {
      return;
    }
  });
};

btnClose.addEventListener('click', e => {
  e.preventDefault();
  closeAccount();
});

const loanHandler = function () {
  const deposits = currentAccount.movements.filter(mov => mov > 0);
  const loanReq = Number(inputLoanAmount.value);
  console.log(loanReq * 0.1);

  for (dep of deposits) {
    if (dep < loanReq * 0.1) {
      console.log('You are not elligible for this loan');
      break;
    } else {
      currentAccount.movements.push(loanReq);
      break;
    }
  }
};

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  loanHandler();
  displayMovements(currentAccount.movements);
});
