// frontend/js/main.js
document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // 1. Signup Page Validation
  // ===============================
  const signupForm = document.getElementById('signupForm');
  const passwordHelp = document.getElementById('passwordHelp');

  if(signupForm && passwordHelp){
    passwordHelp.style.display = 'none';
    signupForm.addEventListener('submit', (e) => {
      const password = signupForm.password.value;
      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if(!strongPassword.test(password)){
        e.preventDefault();
        passwordHelp.style.display = 'block';
      } else {
        passwordHelp.style.display = 'none';
      }
    });
  }

  // ===============================
  // 2. Login Page Validation
  // ===============================
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if(loginForm && loginError){
    loginError.style.display = 'none';
    loginForm.addEventListener('submit', (e) => {
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value.trim();
      if(!username || !password){
        e.preventDefault();
        loginError.textContent = 'Please enter username and password';
        loginError.style.display = 'block';
      } else {
        loginError.style.display = 'none';
      }
    });
  }

  // ===============================
  // 3. Transactions Table Filter
  // ===============================
  const txSearch = document.getElementById('txSearch');
  const txFilterType = document.getElementById('txFilterType');
  const txTable = document.getElementById('txTable');
  const reloadBtn = document.getElementById('reloadBtn');

  function filterTransactions(){
    if(!txTable) return;
    const query = txSearch ? txSearch.value.trim().toLowerCase() : '';
    const type = txFilterType ? txFilterType.value : '';
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
    alert('Reloaded (frontend demo). Connect backend for real data.');
  });

  // ===============================
  // 4. Dashboard Cards (Optional)
  // ===============================
  // Example placeholder: can update dynamically after fetching API
  const dashboardCards = document.querySelectorAll('.cards .card strong');
  // fetch('/api/dashboard').then(res => res.json()).then(data => {
  //   dashboardCards[0].textContent = '₹ ' + data.balance;
  //   dashboardCards[1].textContent = '₹ ' + data.pending;
  //   dashboardCards[2].textContent = '₹ ' + data.lastTransaction;
  // });
});
