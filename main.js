document.addEventListener('DOMContentLoaded', () => {

  // Transactions filter
  const txSearch = document.getElementById('txSearch');
  const txTable = document.getElementById('txTable');
  const txFilterType = document.getElementById('txFilterType');
  const reloadBtn = document.getElementById('reloadBtn');

  function filterRows() {
    if(!txTable) return;
    const q = txSearch.value.toLowerCase();
    const type = txFilterType.value;
    Array.from(txTable.tBodies[0].rows).forEach(row => {
      const cells = Array.from(row.cells).map(c => c.textContent.toLowerCase());
      const matchesQ = cells.join(' ').includes(q);
      const matchesType = !type || row.cells[4].textContent === type;
      row.style.display = (matchesQ && matchesType) ? '' : 'none';
    });
  }

  if(txSearch) txSearch.addEventListener('input', filterRows);
  if(txFilterType) txFilterType.addEventListener('change', filterRows);
  if(reloadBtn) reloadBtn.addEventListener('click', () => { filterRows(); alert('Frontend reload demo.'); });

  // Signup validation
  const signupForm = document.getElementById('signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const password = signupForm.password.value;
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if(!pattern.test(password)){
        alert('Password must be 8+ chars, include uppercase, lowercase, number & symbol');
        return;
      }
      alert('Signup successful! (Demo)');
      signupForm.reset();
    });
  }

  // Login validation
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
      if(username === '' || password === ''){
        alert('Enter both username and password');
        return;
      }
      // Demo: wrong login
      if(username !== 'demo' || password !== 'Demo@123'){
        alert('Invalid credentials!');
        return;
      }
      alert('Login successful!');
      loginForm.reset();
      window.location.href = 'dashboard.html';
    });
  }

});
