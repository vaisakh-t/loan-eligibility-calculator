function calculateEMI() {
  const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
  const annualRate = parseFloat(document.getElementById('interestRate').value) || 0;
  const years = parseFloat(document.getElementById('loanTenure').value) || 0;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = loanAmount;
  let resultHTML = `<strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}<br><br><table border="1"><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>`;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;
    resultHTML += `<tr>
      <td>${i}</td>
      <td>₹${principal.toFixed(2)}</td>
      <td>₹${interest.toFixed(2)}</td>
      <td>₹${Math.max(balance, 0).toFixed(2)}</td>
    </tr>`;
  }

  resultHTML += `</table>`;
  document.getElementById('emiResult').innerHTML = `<strong>EMI:</strong> ₹${emi.toFixed(2)}`;
  document.getElementById('schedule').innerHTML = resultHTML;
  document.getElementById('emiResult').style.display = 'block';
  document.getElementById('schedule').style.display = 'block';
}