const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');





// localstorage - api do browser = permite que armazene e persista os dados do usuário

const localstorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
// resulta no valor da propriedade transactions do objeto armazenado na localstorage 

let transactions = localStorage
    .getItem('transactions') !== null ? localstorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID);
        init();
    updateLocalStorage();

}



const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+';
    const cssClass = amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');
    li.classList.add(cssClass);
    li.innerHTML = `
    ${name}
    <span>${operator} R$ ${amountWithoutOperator}</span
    ><button class="delete-btn" onclick="removeTransaction(${id})">x</button>
    `
    transactionsUl.append(li)


}

const getExpenses = transactionsAmounts =>
    Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((acumulator, value) => acumulator + value, 0))
        .toFixed(2);


const getIncomes = transactionsAmounts =>
    transactionsAmounts
        .filter(value => value > 0)
        .reduce((acumulator, value) => acumulator + value, 0)
        .toFixed(2)

const getTotal = transactionsAmounts => 
    transactionsAmounts
        .reduce((acumulator, transaction) => acumulator + transaction, 0)
        .toFixed(2);

        


const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(({amount}) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncomes(transactionsAmounts);
    const expense = getExpenses(transactionsAmounts);

    
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


const addTransactionsArray = (transactionName, transactionAmount) => {

    transactions.push({
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    });


}

const clearInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}



const handleFormSubmit = event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';
    if (isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return
    }
    addTransactionsArray(transactionName, transactionAmount)
    init();
    updateLocalStorage();
    clearInputs();

}


form.addEventListener('submit', handleFormSubmit)

