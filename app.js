// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Quiz logic
const form = document.getElementById('adhdForm');
const results = document.getElementById('results');

function classifyScore(sum){
  // 6 questions, each 0-4 => total 0-24
  if (sum <= 6) return { label: 'Low', cls: 'badge-low', msg: 'Your responses suggest a lower likelihood of clinically significant ADHD symptoms.' };
  if (sum <= 14) return { label: 'Moderate', cls: 'badge-moderate', msg: 'Your responses suggest some ADHD-like symptoms. Consider monitoring and strategies to manage attention and organization.' };
  return { label: 'High', cls: 'badge-high', msg: 'Your responses suggest frequent symptoms consistent with ADHD. Consider discussing this with a qualified healthcare professional.' };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let sum = 0;
  for (const [key, val] of formData.entries()){
    sum += Number(val);
  }

  const { label, cls, msg } = classifyScore(sum);

  const interpretation = `
    <p class="score">Score: ${sum} / 24
      <span class="badge ${cls}">${label} indication</span>
    </p>
    <p>${msg}</p>
    <p class="muted small">This is a screening tool only and not a diagnosis. If symptoms affect daily functioning at work, school, or relationships, seek a professional assessment. In Sweden, start with your Vårdcentral.</p>
  `;

  results.innerHTML = interpretation;
  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

form.addEventListener('reset', () => {
  results.classList.add('hidden');
  results.innerHTML = '';
});
