const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');






const localstorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
// resulta no valor da propriedade transactions do objeto armazenado na localstorage 

let transactions = localStorage
    .getItem('transactions') !== null ? localstorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID);
    updateLocalStorage();
    init();
}



const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const cssClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');
    li.classList.add(cssClass);
    li.innerHTML = `
    ${transaction.name}
    <span>${operator} R$ ${amountWithoutOperator}</span
    ><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    transactionsUl.append(li)


}


const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)


    const total = transactionsAmounts
        .reduce((acumulator, transaction) => acumulator + transaction, 0)
        .toFixed(2);

    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((acumulator, value) => acumulator + value, 0)
        .toFixed(2)

    const expense = Math.abs(transactionsAmounts.filter(value => value < 0)
        .reduce((acumulator, value) => acumulator + value, 0))
        .toFixed(2);

    balanceDisplay.textContent = `R$ ${total.replace('.', ',')}`
    incomeDisplay.textContent = `R$ ${income.replace('.', ',')}`
    expenseDisplay.textContent = `R$ ${expense.replace('.', ',')}`

}





const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues()
}

init();


const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = () => Math.round(Math.random() * 1000);



form.addEventListener('submit', event => {
    event.preventDefault();
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    if (transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return
    }
    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction);
    init();
    updateLocalStorage();
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';

})


// localstorage - api do browser = permite que armazene e persista os dados do usuário