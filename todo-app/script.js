// DOM 요소 가져오기
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

// localStorage에서 Todo 목록 불러오기
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
            addTodoToDOM(todo.text, todo.completed, todo.id);
        });
        updateStats();
    }
}

// localStorage에 Todo 목록 저장하기
function saveTodos() {
    const todos = [];
    
    // 예정 목록의 항목들
    const pendingItems = pendingList.querySelectorAll('.todo-item');
    pendingItems.forEach(item => {
        const text = item.querySelector('.todo-text').textContent;
        const id = item.dataset.id;
        todos.push({
            id: id,
            text: text,
            completed: false
        });
    });
    
    // 완료 목록의 항목들
    const completedItems = completedList.querySelectorAll('.todo-item');
    completedItems.forEach(item => {
        const text = item.querySelector('.todo-text').textContent;
        const id = item.dataset.id;
        todos.push({
            id: id,
            text: text,
            completed: true
        });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
}

// 통계 업데이트
function updateStats() {
    const pending = pendingList.querySelectorAll('.todo-item').length;
    const completed = completedList.querySelectorAll('.todo-item').length;
    
    pendingCount.textContent = `예정: ${pending}`;
    completedCount.textContent = `완료: ${completed}`;
}

// Todo 항목을 DOM에 추가
function addTodoToDOM(text, completed = false, id = null) {
    // 고유 ID 생성
    const todoId = id || Date.now().toString();
    
    // li 요소 생성
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todoId;
    
    if (completed) {
        li.classList.add('completed');
    }
    
    // 체크박스 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = completed;
    
    // 텍스트 생성
    const span = document.createElement('span');
    span.className = 'todo-text';
    if (completed) {
        span.classList.add('completed');
    }
    span.textContent = text;
    
    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    
    // 체크박스 이벤트 리스너
    checkbox.addEventListener('change', function() {
        // 애니메이션 효과
        li.style.animation = 'slideOut 0.3s ease-out';
        
        setTimeout(() => {
            // 현재 목록에서 제거
            li.remove();
            
            // 완료 상태에 따라 다른 목록으로 이동
            if (this.checked) {
                // 예정 -> 완료로 이동
                span.classList.add('completed');
                li.classList.add('completed');
                completedList.appendChild(li);
            } else {
                // 완료 -> 예정으로 이동
                span.classList.remove('completed');
                li.classList.remove('completed');
                pendingList.appendChild(li);
            }
            
            // 다시 표시
            li.style.animation = 'slideIn 0.3s ease-out';
            saveTodos();
        }, 300);
    });
    
    // 삭제 버튼 이벤트 리스너
    deleteBtn.addEventListener('click', function() {
        li.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            li.remove();
            saveTodos();
        }, 300);
    });
    
    // 요소들을 li에 추가
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // 완료 상태에 따라 적절한 리스트에 추가
    if (completed) {
        completedList.appendChild(li);
    } else {
        pendingList.appendChild(li);
    }
}

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', function() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('할 일을 입력해주세요!');
        todoInput.focus();
        return;
    }
    
    addTodoToDOM(text);
    todoInput.value = '';
    todoInput.focus();
    saveTodos();
});

// Enter 키 입력 이벤트
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// 페이지 로드 시 저장된 Todo 불러오기
loadTodos();
