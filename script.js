
function clearInputs() {
  document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
  document.getElementById("total").textContent = "0.0000";
}
