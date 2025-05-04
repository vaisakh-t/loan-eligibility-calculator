function calculateSalaried() {
  const s1 = parseFloat(document.getElementById('salary1').value) || 0;
  const s2 = parseFloat(document.getElementById('salary2').value) || 0;
  const s3 = parseFloat(document.getElementById('salary3').value) || 0;
  const existingEmi = parseFloat(document.getElementById('existingEmiS').value) || 0;
  const foirInput = parseFloat(document.getElementById('foirS').value) || 0;
  const rate = parseFloat(document.getElementById('rateS').value) || 0;
  const tenure = parseFloat(document.getElementById('tenureS').value) || 0;

  const avgSalary = (s1 + s2 + s3) / 3;
  const netIncome = avgSalary - 15000;
  const appliedFoir = Math.min(foirInput, 100); // Cap at 100%
  const eligibleEmi = Math.max(((netIncome * appliedFoir) / 100) - existingEmi, 0);

  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;
  const loanAmount = (eligibleEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
                     (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));

  const result = `
    <strong>Average Salary:</strong> ₹${avgSalary.toFixed(2)}<br>
    <strong>Take Home Deducted:</strong> ₹15000<br>
    <strong>Net Salary for FOIR:</strong> ₹${netIncome.toFixed(2)}<br>
    <strong>FOIR Used:</strong> ${appliedFoir}%<br>
    <strong>Existing EMI:</strong> ₹${existingEmi}<br>
    <strong>Eligible EMI:</strong> ₹${eligibleEmi.toFixed(2)}<br>
    <strong>Eligible Loan Amount:</strong> ₹${loanAmount.toFixed(0)}
  `;
  const resultDiv = document.getElementById('resultS');
  resultDiv.innerHTML = result;
  resultDiv.style.display = 'block';
}