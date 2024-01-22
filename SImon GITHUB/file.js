class Bank {
  constructor() {
    this.accounts = {};
  }

  createAccount(name, initialBalance) {
    const accountNumber = Math.floor(Math.random() * 9000) + 1000;
    const account = new Account(name, accountNumber, initialBalance);
    this.accounts[accountNumber] = account;
    return account;
  }

  authenticateUser(accountNumber, pin) {
    if (accountNumber in this.accounts) {
      const account = this.accounts[accountNumber];
      if (account.validatePin(pin)) {
        return account;
      }
    }
    return null;
  }
}

class Account {
  constructor(name, accountNumber, balance) {
    this.name = name;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.pin = Math.floor(Math.random() * 9000) + 1000;
    this.transactionHistory = [];
  }

  validatePin(pin) {
    return this.pin == pin;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.addToTransactionHistory("Deposit", amount);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.addToTransactionHistory("Withdrawal", amount);
    }
  }

  getBalance() {
    return this.balance;
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  addToTransactionHistory(transactionType, amount) {
    const timestamp = new Date().toLocaleString();
    const transaction = `${timestamp} - ${transactionType}: ${amount} INR`;
    this.transactionHistory.push(transaction);
  }
}

function main() {
  const bank = new Bank();

  // Creating sample accounts
  const account1 = bank.createAccount("Alice", 5000);
  const account2 = bank.createAccount("Bob", 3000);

  while (true) {
    console.log("\nBanking System Menu:");
    console.log("1. Log in");
    console.log("2. Exit");

    const choice = prompt("Enter your choice: ");

    if (choice === "1") {
      const accountNumber = parseInt(prompt("Enter your account number: "));
      const pin = prompt("Enter your PIN: ");

      const account = bank.authenticateUser(accountNumber, pin);

      if (account) {
        console.log(`Welcome, ${account.name}!`);
        while (true) {
          console.log("\nAccount Menu:");
          console.log("1. Deposit");
          console.log("2. Withdraw");
          console.log("3. Check Balance");
          console.log("4. View Transaction History");
          console.log("5. Log Out");

          const userChoice = prompt("Enter your choice: ");

          if (userChoice === "1") {
            const amount = parseFloat(prompt("Enter the amount to deposit: "));
            account.deposit(amount);
            console.log(`Deposit successful. New balance: ${account.getBalance()} INR`);
          } else if (userChoice === "2") {
            const amount = parseFloat(prompt("Enter the amount to withdraw: "));
            account.withdraw(amount);
            console.log(`Withdrawal successful. New balance: ${account.getBalance()} INR`);
          } else if (userChoice === "3") {
            console.log(`Current balance: ${account.getBalance()} INR`);
          } else if (userChoice === "4") {
            const history = account.getTransactionHistory();
            if (history.length > 0) {
              console.log("\nTransaction History:");
              history.forEach(transaction => console.log(transaction));
            } else {
              console.log("No transactions yet.");
            }
          } else if (userChoice === "5") {
            console.log("Logging out...");
            break;
          } else {
            console.log("Invalid choice. Please try again.");
          }
        }
      } else {
        console.log("Invalid account number or PIN. Please try again.");
      }
    } else if (choice === "2") {
      console.log("Exiting the Banking System. Goodbye!");
      break;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
}

main();
