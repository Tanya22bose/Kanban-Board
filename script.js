const modal = document.querySelector(".modal-content");
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const mainCont = document.querySelector(".main-content");
const tickets = document.querySelectorAll(".ticket-content");
const lockedTickets = document.querySelectorAll(".ticket-lock");
let addTaskFlag = false;
let removeTaskFlag = false;
const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let selectedColor = colors[0];
let ticketColor = colors[3];
let ticketList = JSON.parse(localStorage.getItem("tickets")) || [];

function init() {
  if (localStorage.getItem("tickets")) {
    ticketList.forEach((ticket) => {
      const { content, color, id } = ticket;
      createTicket(content, color, id);
    });
  }
}

init();

function updateLS() {
  localStorage.setItem("tickets", JSON.stringify(ticketList));
}

function findTicketIdxinLS(ticketId) {
  return ticketList.findIndex((item) => item.id === ticketId);
}

addBtn.addEventListener("click", () => {
  addTaskFlag = !addTaskFlag;
  if (addTaskFlag) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

removeBtn.addEventListener("click", () => {
  removeTaskFlag = !removeTaskFlag;
  if (removeTaskFlag) {
    alert("deletion mode activated");
    removeBtn.style.color = "red";
  } else {
    removeBtn.style.color = "black";
  }
});

modal.addEventListener("keydown", (e) => {
  const textarea = document.querySelector("textarea");
  if (e.key === "Shift" && e.target.value !== "") {
    const ticketId = Math.random().toString(36).substring(2);
    ticketList.push({
      content: textarea.value,
      color: ticketColor,
      id: ticketId,
    });
    updateLS();
    createTicket(textarea.value, ticketColor, ticketId);
    textarea.value = "";
    addTaskFlag = false;
    modal.style.display = "none";
  }
});

function createTicket(ticketTask, ticketColor, ticketId) {
  const ticketCont = document.createElement("div");
  ticketCont.classList.add("ticket-content");
  const divContent = `<div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">${ticketId}</div>
  <div class="ticket-area" contenteditable="false">${ticketTask}</div>
  <div class="ticket-lock">
  <i class="fa-solid fa-lock"></i>
  </div>`;
  ticketCont.innerHTML = divContent;
  mainCont.appendChild(ticketCont);
  handleRemoval(ticketCont);
  lockTicket(ticketCont);
  changeTicketColor(ticketCont.children[0]);
}

const priorityColors = document.querySelectorAll(".priority-color");

priorityColors.forEach((item) => {
  item.addEventListener("click", (e) => {
    ticketColor = e.target.classList[0];
    priorityColors.forEach((ele) => ele.classList.remove("active"));
    e.target.classList.add("active");
  });
});

function lockTicket(ticket) {
  const lockIcon = ticket.querySelector(".ticket-lock").children[0];
  const textAreaCont = ticket.querySelector(".ticket-area");
  const idx = findTicketIdxinLS(ticket.querySelector(".ticket-id").textContent);
  lockIcon.addEventListener("click", () => {
    if (lockIcon.classList.contains("fa-lock")) {
      lockIcon.classList.remove("fa-lock");
      lockIcon.classList.add("fa-unlock");
      textAreaCont.setAttribute("contenteditable", true);
    } else {
      lockIcon.classList.remove("fa-unlock");
      lockIcon.classList.add("fa-lock");
      textAreaCont.setAttribute("contenteditable", false);
      ticketList[idx].content = textAreaCont.textContent;
      updateLS();
    }
  });
}

function handleRemoval(ticket) {
  ticket.addEventListener("click", () => {
    if (removeTaskFlag) {
      ticket.remove();
      const ticketId = ticket.querySelector(".ticket-id").textContent;
      const ticketListIdx = findTicketIdxinLS(ticketId);
      ticketList.splice(ticketListIdx, 1);
      updateLS();
    }
  });
}

function changeTicketColor(ticket) {
  ticket.addEventListener("click", () => {
    const currentColorIdxInColorsArr = colors.findIndex((item) =>
      ticket.classList.contains(item)
    );
    const newColor = colors[(currentColorIdxInColorsArr + 1) % colors.length];
    ticket.classList.remove(colors[currentColorIdxInColorsArr]);
    ticket.classList.add(newColor);
    const ticketId =
      ticket.parentElement.querySelector(".ticket-id").textContent;
    const ticketListIdx = findTicketIdxinLS(ticketId);
    ticketList.splice(ticketListIdx, 1, {
      ...ticketList[ticketListIdx],
      color: newColor,
    });
    updateLS();
  });
}

function filterTicketsOnColor() {
  const ticketColors = document.querySelectorAll(".ticket-color");
  ticketColors.forEach((item) => {
    item.classList.contains(selectedColor)
      ? (item.parentElement.style.display = "block")
      : (item.parentElement.style.display = "none");
  });
}

function resetColorFilter() {
  const ticketColors = document.querySelectorAll(".ticket-color");
  ticketColors.forEach((item) => {
    item.parentElement.style.display = "block";
  });
}

const colorBlocks = document.querySelectorAll(".color");

colorBlocks.forEach((color) => {
  color.addEventListener("click", () => {
    selectedColor = color.classList[0];
    filterTicketsOnColor();
  });
  color.addEventListener("dblclick", () => {
    resetColorFilter();
  });
});
