// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
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

accounts.forEach(acc => {
  const username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name.slice(0, 1))
    .join('');
  acc.username = username;
});

console.log(account2.username);

console.log(accounts[1].username);

let currentAccount;

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

  let balance = displayBalance(currentAccount.movements);
  labelBalance.textContent = `${balance}€`;

  displayMovements(currentAccount.movements);

  displaySums(currentAccount.movements, currentAccount.interestRate, balance);
});

const displayBalance = function (movements) {
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
