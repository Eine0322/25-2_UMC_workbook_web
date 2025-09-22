// 필요한 HTML 요소들을 선택합니다.
const form = document.querySelector(".todo-container__form") as HTMLFormElement;
const input = document.querySelector(
  ".todo-container__input"
) as HTMLInputElement;
const todoList = document.querySelector("#todo-list") as HTMLUListElement;
const completedList = document.querySelector(
  "#completed-list"
) as HTMLUListElement;

// 새 할 일 항목을 생성하는 함수
function createTodoItem(taskText: string): HTMLLIElement {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${taskText}</span>
        <button class="action-button complete-button">완료</button>
    `;

  // '완료' 버튼에 이벤트 리스너를 추가합니다.
  li.querySelector(".complete-button")?.addEventListener("click", () => {
    completeTask(li, taskText);
  });

  return li;
}

// 할 일을 완료된 목록으로 이동시키는 함수
function completeTask(item: HTMLLIElement, taskText: string) {
  // 기존 항목을 DOM에서 제거합니다.
  item.remove();

  // 완료된 항목을 위한 새로운 리스트 아이템을 생성합니다.
  const completedItem = document.createElement("li");
  completedItem.innerHTML = `
        <span>${taskText}</span>
        <button class="action-button delete-button">삭제</button>
    `;

  // '삭제' 버튼에 이벤트 리스너를 추가합니다.
  completedItem
    .querySelector(".delete-button")
    ?.addEventListener("click", () => {
      deleteTask(completedItem);
    });

  // 완료된 목록에 추가합니다.
  completedList.appendChild(completedItem);
}

// 할 일을 목록에서 삭제하는 함수
function deleteTask(item: HTMLLIElement) {
  item.remove();
}

// 폼 제출 이벤트 리스너
form.addEventListener("submit", (e) => {
  e.preventDefault(); // 페이지 새로고침 방지

  const taskText = input.value.trim();

  if (taskText !== "") {
    const newItem = createTodoItem(taskText);
    todoList.appendChild(newItem);
    input.value = ""; // 입력 필드 초기화
  }
});
