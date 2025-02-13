let students = JSON.parse(localStorage.getItem('students')) || [];
let currentStudentId = null;

const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
};

document.getElementById('addStudentForm').addEventListener('submit', e => {
    e.preventDefault();
    const newStudent = {
        id: Date.now(),
        lastName: document.getElementById('lastName').value.trim(),
        firstName: document.getElementById('firstName').value.trim(),
        middleName: document.getElementById('middleName').value.trim(),
        gender: document.getElementById('studentGender').value,
        grades: {}
    };
    
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById('addStudentForm').reset();
    toggleModal('addStudentModal');
    renderStudents();
});

const renderStudents = () => {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const genderFilter = document.getElementById('genderFilter').value;

    students.filter(student => {
        const fullName = `${student.lastName} ${student.firstName} ${student.middleName}`.toLowerCase();
        return fullName.includes(searchTerm) && 
              (genderFilter === 'all' || student.gender === genderFilter);
    }).forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <div class="student-info">
                <h3>${student.lastName} ${student.firstName} ${student.middleName}</h3>
                <p>Пол: ${student.gender === 'male' ? 'Мужской' : 'Женский'}</p>
            </div>
            <button class="grades-btn" data-id="${student.id}">Оценки</button>
        `;
        studentsList.appendChild(studentCard);
    });
};

document.addEventListener('click', e => {
    if (e.target.classList.contains('grades-btn')) {
        currentStudentId = parseInt(e.target.dataset.id);
        showGradesModal(currentStudentId);
    }
});

const showGradesModal = (studentId) => {
    const student = students.find(s => s.id === studentId);
    const subjects = ['Математика', 'Физика', 'Химия', 'Программирование', 'История'];
    const subjectsList = document.getElementById('subjectsList');
    
    subjectsList.innerHTML = '';
    subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject-item';
        div.innerHTML = `
            <span>${subject}</span>
            <input type="number" 
                   min="1" 
                   max="5" 
                   value="${student.grades[subject] || ''}"
                   class="grade-input"
                   data-subject="${subject}"
                   oninput="this.value = this.value.replace(/[^1-5]/g, '')">
        `;
        subjectsList.appendChild(div);
    });
    
    toggleModal('gradesModal');
};

document.getElementById('saveGrades').addEventListener('click', () => {
    const student = students.find(s => s.id === currentStudentId);
    const inputs = document.querySelectorAll('.grade-input');
    
    inputs.forEach(input => {
        const subject = input.dataset.subject;
        const value = input.value.trim();
        student.grades[subject] = value ? parseInt(value) : null;
    });
    
    localStorage.setItem('students', JSON.stringify(students));
    toggleModal('gradesModal');
});

document.getElementById('expelBtn').addEventListener('click', () => {
    students = students.filter(s => s.id !== currentStudentId);
    localStorage.setItem('students', JSON.stringify(students));
    toggleModal('gradesModal');
    renderStudents();
});

document.querySelector('.add-student-btn').addEventListener('click', () => toggleModal('addStudentModal'));
document.getElementById('searchInput').addEventListener('input', renderStudents);
document.getElementById('genderFilter').addEventListener('change', renderStudents);
renderStudents();