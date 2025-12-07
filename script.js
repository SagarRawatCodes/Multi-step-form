 const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
    let currentStep = 0;
    const stepBox1 = document.getElementById('stepBox1');
    const stepBox2 = document.getElementById('stepBox2');
    const stepBox3 = document.getElementById('stepBox3');
    const fill1 = document.getElementById('fill1');
    const fill2 = document.getElementById('fill2');

    function updateProgress() {
      stepBox1.classList.toggle('active', currentStep >= 0);
      stepBox2.classList.toggle('active', currentStep >= 1);
      stepBox3.classList.toggle('active', currentStep >= 2);
      fill1.style.width = (currentStep >= 1) ? '100%' : '0%';
      if (fill2) fill2.style.width = (currentStep >= 2) ? '100%' : '0%';
    }

   function showStep(step) {
  steps[currentStep].classList.add("hidden");
  steps[step].classList.remove("hidden");
  currentStep = step;


  const progressBar = document.getElementById("progressBarContainer");
  const downloadText = document.getElementById("downloadResumeText");

  if (step === 3) {  
    
    header.classList.add("hidden");
    progressBar.classList.add("hidden");
    if (downloadText) downloadText.classList.remove("hidden");
  } else {
   
    header.classList.remove("hidden");
    progressBar.classList.remove("hidden");
    if (downloadText) downloadText.classList.add("hidden");
  }

  updateProgress();
}


    
    function markInvalid(el, msgId, message) {
      if (!el) return;
      el.classList.add('border-red-400');
      const err = document.getElementById(msgId);
      if (err) { err.textContent = message; err.classList.remove('hidden'); }
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 400);
    }
    function clearInvalid(el, msgId) { if (!el) return; el.classList.remove('border-red-400'); if (msgId) { const err = document.getElementById(msgId); if (err) { err.textContent = ''; err.classList.add('hidden'); } } }
    function hasInvalidSpaces(str) { if (!str) return false; if (/^\s|\s$/.test(str)) return true; if (/\s{2,}/.test(str)) return true; return false; }

    function validateStep1() {
      let ok = true;
      const fullName = document.getElementById('fullName'); clearInvalid(fullName,'errFullName');
      if (!fullName.value || fullName.value.trim()==='') { markInvalid(fullName,'errFullName','Full name is required'); ok=false; }
      else if (hasInvalidSpaces(fullName.value)) { markInvalid(fullName,'errFullName','Remove leading/trailing or multiple spaces'); ok=false; }

      const email = document.getElementById('email'); clearInvalid(email,'errEmail');
      const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email.value || email.value.trim()==='') { markInvalid(email,'errEmail','Email is required'); ok=false; }
      else if (hasInvalidSpaces(email.value)) { markInvalid(email,'errEmail','Invalid spaces in email'); ok=false; }
      else if (!emailRe.test(email.value.trim())) { markInvalid(email,'errEmail','Invalid email format'); ok=false; }

      const phone = document.getElementById('phone'); clearInvalid(phone,'errPhone');
      const digits = phone.value.replace(/[^0-9]/g,'');
      const phoneRe = /^[6-9][0-9]{9}$/;
      if (!digits) { markInvalid(phone,'errPhone','Phone is required'); ok=false; }
      else if (!phoneRe.test(digits)) { markInvalid(phone,'errPhone','Enter a valid 10-digit mobile starting with 6-9'); ok=false; }

      const dob = document.getElementById('dob'); clearInvalid(dob,'errDob');
      if (!dob.value) { markInvalid(dob,'errDob','Date of birth is required'); ok=false; }

      const gender = document.getElementById('gender'); clearInvalid(gender,'errGender');
      if (!gender.value) { markInvalid(gender,'errGender','Select gender'); ok=false; }

      const city = document.getElementById('city'); clearInvalid(city,'errCity');
      if (!city.value || city.value.trim()==='') { markInvalid(city,'errCity','City is required'); ok=false; }
      else if (hasInvalidSpaces(city.value)) { markInvalid(city,'errCity','Remove invalid spaces'); ok=false; }

      const state = document.getElementById('state'); clearInvalid(state,'errState');
      if (!state.value || state.value.trim()==='') { markInvalid(state,'errState','State is required'); ok=false; }
      else if (hasInvalidSpaces(state.value)) { markInvalid(state,'errState','Remove invalid spaces'); ok=false; }

      const linkedin = document.getElementById('linkedin'); clearInvalid(linkedin,'errLinkedin');
      if (linkedin.value && linkedin.value.trim()!=='') {
        const ln = linkedin.value.trim();
        const lnRe = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]{3,}(\/)?$/i;
        if (!lnRe.test(ln)) { markInvalid(linkedin,'errLinkedin','LinkedIn URL should be like: https://www.linkedin.com/in/yourname'); ok=false; }
      }
      return ok;
    }

    function validateStep2() {
      const eduBlocks = document.querySelectorAll('#educations .edu-block');
      if (eduBlocks.length === 0) { alert('Add at least one education entry'); return false; }
      let ok = true;
      const selectedLevels = {};
      eduBlocks.forEach((b,idx) => {
        const degreeLevel = b.querySelector('.degree-level');
        const fields = b.querySelectorAll('.edu-field');
        fields.forEach(f => { f.classList.remove('border-red-400'); if (!f.value || f.value.trim()==='') { f.classList.add('border-red-400'); f.classList.add('shake'); ok=false; setTimeout(()=>f.classList.remove('shake'),400); } if (hasInvalidSpaces(f.value)) { f.classList.add('border-red-400'); ok=false; } });
        if (degreeLevel) {
          const val = degreeLevel.value;
          if (!val) { degreeLevel.classList.add('border-red-400'); ok=false; }
          else {
            if (selectedLevels[val]) {
              // duplicate
              degreeLevel.classList.add('border-red-400');
              selectedLevels[val].classList.add('border-red-400');
              ok = false;
            } else {
              selectedLevels[val] = degreeLevel;
            }
          }
        }
      });
      if (!ok) alert('Please fix highlighted education fields. Degree level should be unique across entries.');
      return ok;
    }

    function validateStep3() {
      let ok = true;
      const jobTitle = document.getElementById('jobTitle'); clearInvalid(jobTitle,'errJobTitle');
      const company = document.getElementById('company'); clearInvalid(company,'errCompany');
      const skills = document.getElementById('skills'); clearInvalid(skills,'errSkills');
      const expRange = document.getElementById('expRange');
      if (!expRange.value) { expRange.classList.add('border-red-400'); ok=false; }
      
      if (expRange.value !== 'fresher') {
        if (!jobTitle.value || jobTitle.value.trim()==='') { markInvalid(jobTitle,'errJobTitle','Job title is required for experienced candidates'); ok=false; }
        if (!company.value || company.value.trim()==='') { markInvalid(company,'errCompany','Company is required for experienced candidates'); ok=false; }
      }
      if (!skills.value || skills.value.trim()==='') { markInvalid(skills,'errSkills','Add at least one skill'); ok=false; }
      return ok;
    }

   
    document.getElementById('toStep2').addEventListener('click', () => { if (!validateStep1()) return; showStep(1); });
    document.getElementById('backTo1').addEventListener('click', () => showStep(0));
    document.getElementById('toStep3').addEventListener('click', () => { if (!validateStep2()) return; showStep(2); });
    document.getElementById('backTo2').addEventListener('click', () => showStep(1));

    
    const educations = document.getElementById('educations');
    const tpl = document.getElementById('eduTpl');

    function renderEduIndexes() {
      document.querySelectorAll('#educations .edu-block').forEach((b,i) => {
        const header = b.querySelector('.edu-header');
        if (header) header.textContent = `Education ${i+1}`;
      });
    }


function attachEduEvents(block) {
     if (!block) return; 

     const removeBtn = block.querySelector('.remove-edu');
     if (removeBtn) removeBtn.addEventListener('click', () => { block.remove(); renderEduIndexes(); });

     const degreeLevel = block.querySelector('.degree-level');
     if (degreeLevel) degreeLevel.addEventListener('change', () => {
      
       const val = degreeLevel.value;
       if (!val) return;
       const others = Array.from(document.querySelectorAll('#educations .degree-level')).filter(d=>d!==degreeLevel);
       const dup = others.find(o=>o.value === val);
       
       others.forEach(o=>o.classList.remove('border-red-400'));
       degreeLevel.classList.remove('border-red-400');
       if (dup) {
         degreeLevel.classList.add('border-red-400');
         dup.classList.add('border-red-400');
         alert('You have already selected this degree level in another entry. Each education entry must have a unique degree level.');
       }
     });
}


function addEducation() {
     if (educations.children.length >= 3) { alert('Maximum 3 education entries allowed'); return; }
     
     
     const tempDiv = document.createElement('div');
     tempDiv.appendChild(tpl.content.cloneNode(true));
     const node = tempDiv.firstElementChild; 
     
     if (!node) return; 
     
     educations.appendChild(node);
     attachEduEvents(node);
     renderEduIndexes();
}
    document.getElementById('addEdu').addEventListener('click', addEducation);
   
    addEducation();

   const skillPool = ['HTML','CSS','JavaScript','TypeScript','React','Angular','Vue','Node.js','Express','MongoDB','PostgreSQL','MySQL','Python','Django','Flask','Java','Spring','C++','C#','AWS','Azure','Docker','Kubernetes','Git','SASS','TailwindCSS'];
    const skillsInput = document.getElementById('skills');
    const skillsList = document.getElementById('skillsList');

    function showSkillSuggestions(query) {
        if (!query) { skillsList.classList.add('hidden'); return; }
        const q = query.toLowerCase();
        const filtered = skillPool.filter(s => s.toLowerCase().includes(q) && !currentSkills().includes(s));
        if (filtered.length === 0) { skillsList.classList.add('hidden'); return; }
        skillsList.innerHTML = filtered.map(s=>`<div class="suggestion-item" data-val="${s}">${s}</div>`).join('');
        skillsList.classList.remove('hidden');
        
        skillsList.querySelectorAll('.suggestion-item').forEach(it => it.addEventListener('click', () => {
            replaceLastToken(it.dataset.val);
            skillsList.classList.add('hidden');
            skillsInput.focus();
        }));
    }

    function currentSkills() {
        return skillsInput.value.split(',').map(s=>s.trim()).filter(Boolean).map(s => {
            const poolMatch = skillPool.find(p=>p.toLowerCase()===s.toLowerCase());
            return poolMatch || s;
        });
    }
    
    function replaceLastToken(newSkill) {
        let parts = skillsInput.value.split(',');
        parts.pop();
        parts = parts.map(p => p.trim()).filter(Boolean);
        
        if (!parts.includes(newSkill)) {
            parts.push(newSkill);
        }
        
        skillsInput.value = parts.join(', ') + (parts.length > 0 ? ', ' : '');
    }

    skillsInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const last = val.split(',').pop().trim();
        showSkillSuggestions(last);
    });

    skillsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const token = skillsInput.value.split(',').pop().trim();
            
            const match = skillPool.find(s => s.toLowerCase() === token.toLowerCase()) || token;

            if (match) {
                replaceLastToken(match);
            }
            
            skillsList.classList.add('hidden');
            setTimeout(() => { 
                skillsInput.selectionStart = skillsInput.selectionEnd = skillsInput.value.length;
            }, 0);
        }
        if (e.key === 'Escape') skillsList.classList.add('hidden');
    });

    document.addEventListener('click', (e) => { if (!e.target.closest('.suggestions')) skillsList.classList.add('hidden'); });
  
    document.getElementById('submitForm').addEventListener('click', () => { if (!validateStep3()) return; buildResume(); });

    function buildResume() {
      const data = {};
      ['fullName','email','phone','dob','gender','city','state','linkedin','expRange','jobTitle','company','skills','bio'].forEach(id => { const el = document.getElementById(id); data[id] = el ? el.value : ''; });
      
      data.education = [];
      document.querySelectorAll('#educations > .edu-block').forEach(block => {
        const degreeLevel = block.querySelector('select[name="degreeLevel"]').value || '';
        const degreeName = block.querySelector('input[name="degreeName"]').value || '';
        const institute = block.querySelector('input[name="institute"]').value || '';
        const years = block.querySelector('input[name="years"]').value || '';
        const grade = block.querySelector('input[name="grade"]').value || '';
        data.education.push({degreeLevel, degreeName, institute, years, grade});
      });

     const r = document.getElementById("resumeContent");
r.innerHTML = "";


const resume = document.createElement("div");
resume.className =
  "max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-10 border border-gray-300 tracking-wide space-y-10";
 


const header = document.createElement("div");

header.innerHTML = `
  <h1 class="text-4xl font-bold flex justify-center text-gray-900">
    ${escapeHtml(data.fullName || "Unnamed Candidate")}
  </h1>

  <div class="text-gray-600 text-sm flex justify-center gap-6 mt-2">
    <span>${escapeHtml(data.city)}, ${escapeHtml(data.state)}</span>
    <span>•</span>
    <span>${escapeHtml(data.email)}</span>
    <span>•</span>
    <span>${escapeHtml(data.phone)}</span>
  </div>

  <div class="text-gray-600 text-sm flex justify-center gap-6">
    <span>${escapeHtml(data.linkedin)}</span>
    <span>•</span>
    <span>DOB: ${escapeHtml(data.dob)}</span>
  </div>
`;

resume.appendChild(header);



const eduSec = document.createElement("div");
eduSec.innerHTML = `
  <h2 class="text-xl font-semibold text-gray-900 border-b mb-4 pb-1">
    Education
  </h2>
`;

data.education.forEach((ed) => {
  const levelMap = {
    postgrad: "Post Graduation",
    undergrad: "Under Graduation",
    diploma: "Diploma",
    intermediate: "Intermediate",
    other: "Other",
  };

  const item = document.createElement("div");
  item.className = "mb-4";

  item.innerHTML = `
    <div class="flex justify-between items-center">
      <div class="font-semibold text-gray-800 text-lg">
        ${escapeHtml(ed.degreeName)}
      </div>
      <div class="text-gray-500 text-sm">
        ${escapeHtml(ed.years)}
      </div>
    </div>

    <div class="text-gray-700 text-sm mt-1">
      ${escapeHtml(ed.institute)}
    </div>

    <div class="text-gray-500 text-xs mt-1">
      ${escapeHtml(levelMap[ed.degreeLevel] || ed.degreeLevel)}
      ${ed.grade ? " • Grade: " + escapeHtml(ed.grade) : ""}
    </div>
  `;
  eduSec.appendChild(item);
});

resume.appendChild(eduSec);


const expSec = document.createElement("div");
expSec.innerHTML = `
  <h2 class="text-xl font-semibold text-gray-900 border-b mb-4 pb-1">
    Experience
  </h2>

  <div class="flex justify-between items-center">
    <div class="font-semibold text-gray-800 text-lg">
      ${escapeHtml(data.jobTitle)}
    </div>
    <div class="text-gray-500 text-sm">${escapeHtml(data.expRange)}</div>
  </div>

  <div class="text-gray-600 text-sm mb-2">
    ${escapeHtml(data.company)}
  </div>

  <p class="text-gray-700 text-sm leading-relaxed">
    ${escapeHtml(data.bio)}
  </p>
`;

resume.appendChild(expSec);



const skillsSec = document.createElement("div");

const skillArr = data.skills
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

skillsSec.innerHTML = `
  <h2 class="text-xl font-semibold text-gray-900 border-b mb-4 pb-1">
    Skills
  </h2>
  <div class="flex flex-wrap gap-2">
    ${skillArr
      .map(
        (s) => `
      <span class="px-4 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border">
        ${escapeHtml(s)}
      </span>`
      )
      .join("")}
  </div>
`;

resume.appendChild(skillsSec);


r.appendChild(resume);

document.getElementById("previewArea").classList.remove("hidden");
document.getElementById("formContainer").classList.add("hidden");

document.getElementById("progressBarContainer").classList.add("hidden");
document.getElementById("newContainer").classList.add("hidden");



document.getElementById("downloadResumeText").classList.remove("hidden");
window.scrollTo({ top: 0, behavior: "smooth" });
    }
   
    document.getElementById('downloadPdf').addEventListener('click', () => {
      const element = document.getElementById('resumeContent');
      const opt = { margin:0.5, filename: (document.getElementById('fullName').value || 'resume') + '.pdf', html2canvas: { scale:2 }, jsPDF:{ unit:'in', format:'a4', orientation:'portrait' } };
      html2pdf().set(opt).from(element).save();
    });

    document.getElementById('editBtn').addEventListener('click', () => {
      document.getElementById('previewArea').classList.add('hidden');
      document.getElementById('formContainer').classList.remove('hidden');
      showStep(0);
    });

    function escapeHtml(text){ return String(text||'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]; }); }

    updateProgress();
  sc
