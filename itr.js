function calculateITR() {
  const pyIncome = parseFloat(document.getElementById('pyIncome').value) || 0;
  const pyDep = parseFloat(document.getElementById('pyDep').value) || 0;
  const pyOther = parseFloat(document.getElementById('pyOther').value) || 0;
  const pyTax = parseFloat(document.getElementById('pyTax').value) || 0;

  const lyIncome = parseFloat(document.getElementById('lyIncome').value) || 0;
  const lyDep = parseFloat(document.getElementById('lyDep').value) || 0;
  const lyOther = parseFloat(document.getElementById('lyOther').value) || 0;
  const lyTax = parseFloat(document.getElementById('lyTax').value) || 0;

  const existingEmi = parseFloat(document.getElementById('existingEmiI').value) || 0;
  const foir = parseFloat(document.getElementById('foirI').value) || 0;
  const rate = parseFloat(document.getElementById('rateI').value) || 0;
  const tenure = parseFloat(document.getElementById('tenureI').value) || 0;

  const pyFinal = pyIncome + pyDep + pyOther - pyTax;
  const lyFinal = lyIncome + lyDep + lyOther - lyTax;

  let eligibleIncome;
  if (lyFinal >= 1.5 * pyFinal) {
    eligibleIncome = pyFinal + 1.5 * pyFinal;
  } else if (lyFinal <= pyFinal) {
    eligibleIncome = (lyFinal + pyFinal) / 2;
  } else {
    eligibleIncome = lyFinal;
  }

  const netIncome = eligibleIncome - 15000;
  const eligibleEmi = Math.max(((netIncome * foir) / 100) - existingEmi, 0);

  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;
  const loanAmount = (eligibleEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
                     (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));

  const result = `
    <strong>Eligible Income:</strong> ₹${eligibleIncome.toFixed(2)}<br>
    <strong>Take Home Deducted:</strong> ₹15000<br>
    <strong>Net Income for FOIR:</strong> ₹${netIncome.toFixed(2)}<br>
    <strong>FOIR Used:</strong> ${foir}%<br>
    <strong>Existing EMI:</strong> ₹${existingEmi}<br>
    <strong>Eligible EMI:</strong> ₹${eligibleEmi.toFixed(2)}<br>
    <strong>Eligible Loan Amount:</strong> ₹${loanAmount.toFixed(0)}
  `;
  const resultDiv = document.getElementById('resultI');
  resultDiv.innerHTML = result;
  resultDiv.style.display = 'block';
}