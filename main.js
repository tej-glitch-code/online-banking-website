document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // USER SESSION / WELCOME
  // ===========================
  const userNameSpan = document.getElementById('userName');
  let currentUser = localStorage.getItem('currentUser') || 'Guest';
  if (userNameSpan) userNameSpan.textContent = currentUser;

  // ===========================
  // LOGIN FORM
  // ===========================
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value.trim();

      if(!username || !password){
        alert('Enter both username and password');
        return;
      }

      // Demo login: username 'demo', password 'Demo@123'
      if(username === 'demo' && password === 'Demo@123'){
        alert('Login successful!');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials!');
      }
    });
  }

  // ===========================
  // SIGNUP FORM
  // ===========================
  const signupForm = document.getElementById('signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = signupForm.username.value.trim();
      const password = signupForm.password.value.trim();

      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if(!pattern.test(password)){
        alert('Password must be 8+ chars, include uppercase, lowercase, number & symbol');
        return;
      }

      alert('Signup successful! Redirecting to login...');
      window.location.href = 'login.html';
      signupForm.reset();
    });
  }

  // ===========================
  // TRANSFER FORM
  // ===========================
  const transferForm = document.getElementById('transferForm');
  if(transferForm){
    transferForm.addEventListener('submit', e => {
      e.preventDefault();
      const from = transferForm.fromAccount.value.trim();
      const to = transferForm.toAccount.value.trim();
      const amount = parseFloat(transferForm.amount.value);

      if(!from || !to || !amount || amount <= 0){
        alert('Please fill valid details!');
        return;
      }

      if(from === to){
        alert('From and To account cannot be the same.');
        return;
      }

      alert(`₹${amount} transferred from ${from} to ${to} successfully!`);
      transferForm.reset();
    });
  }

  // ===========================
  // TRANSACTIONS SEARCH & FILTER
  // ===========================
  const txSearch = document.getElementById('txSearch');
  const txTable = document.getElementById('txTable');
  const txFilterType = document.getElementById('txFilterType');
  const reloadBtn = document.getElementById('reloadBtn');

  function filterTransactions(){
    if(!txTable) return;
    const query = txSearch.value.toLowerCase();
    const type = txFilterType.value;

    Array.from(txTable.tBodies[0].rows).forEach(row => {
      const cells = Array.from(row.cells).map(c => c.textContent.toLowerCase());
      const matchesQuery = cells.join(' ').includes(query);
      const matchesType = !type || row.cells[4].textContent === type;
      row.style.display = (matchesQuery && matchesType) ? '' : 'none';
    });
  }

  if(txSearch) txSearch.addEventListener('input', filterTransactions);
  if(txFilterType) txFilterType.addEventListener('change', filterTransactions);
  if(reloadBtn) reloadBtn.addEventListener('click', () => {
    filterTransactions();
    alert('Transactions reloaded.');
  });

});
