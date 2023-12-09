// Navbar Drop-Downs Variables

const navbarListButtons = document.querySelectorAll(".drop-down__open-section.drop-down__open-section_list");

// Documentation Drop-Downs Variables

const documentationDropDownButtons = document.querySelectorAll(".documentation__navigation-link_drop-down");

// Select Input Variables

const selectInputButtons = document.querySelectorAll(".select-input-2__open-section");

// Modal Windows Variables

const modalWindows = document.querySelectorAll(".modal-window");
const modalWindowsButtons = document.querySelectorAll("button, a");
const modalWindowsCloseButtons = document.querySelectorAll(".modal-window__skip-btn");

// Submodal Variables

// const subModalWindows = document.querySelectorAll(".install-modal__step-section");
const subModalButtons = document.querySelectorAll(".btn[data-submodal]");
const endModalButtons = document.querySelectorAll("[data-reset]");

// Drop-down Variables

const dropDownButtons = document.querySelectorAll(".select-drop-down__value");

// Pop-up Variables

const popUpButtons = document.querySelectorAll(".pop-up-open-btn");

// Drop-downs Methods

function toggleElement(currentEl, el, cl) {
    el?.classList.toggle("hidden");
    currentEl?.classList.toggle(cl);
}

// Filter Variables

const filterDropDownBtn = document.querySelector(".filter__open-content-btn");
const resetFiltersBtn = document.querySelector(".filter__delete-btn");

// Password Toggle Buttons Variables

const passwordToggleButtons = document.querySelectorAll(".password-toggle-btn");

// Copy Value Buttons Variables

const copyButtons = document.querySelectorAll(".copy-btn");

// Clear Value Buttons Variables

const clearButtons = document.querySelectorAll(".clear-btn");

// Calendare Variables

const calendareNextBtn = document.querySelector(".calendare__next-btn");
const calendarePrevBtn = document.querySelector(".calendare__prev-btn");
const currentDate = document.querySelector(".calendare__current-month");
const saveDiapasonBtn = document.querySelector(".select-diapason__save-btn");
const selectDiapasonButtons = document.querySelectorAll(".select-diapason__btn");
let cellsSingle;

let currentMonth = currentDate?.getAttribute("data-date").split(".")[1];
let currentYear = currentDate?.getAttribute("data-date").split(".")[0];

let currentDiapason = 7;
let isDiapason;

// Diapason Variables

const checkboxes = document.querySelectorAll(".checkbox-quadro__input");

// Table Variables

const tableDropDownButtons = document.querySelectorAll(".table__drop-down-btn");

// Files Select Variables

const fileInputs = document.querySelectorAll(".files__input");

// Modal Windows Methods

function closeAllModals(modalWindows) {
    Array.from(modalWindows).forEach(item => item.classList.add("hidden"));
}

function modalOpen(currentBtn, modalWindows, attr) {
    if (currentBtn.getAttribute(attr)) {

        closeAllModals(modalWindows);

        Array.from(modalWindows).forEach(item => {
            if (item.getAttribute(attr)) {
                if (currentBtn.getAttribute(attr) == item.getAttribute(attr)) {
                    item.classList.remove("hidden");
                    event.preventDefault();
                }
            }
        });

    }
}

function modalClose(modalWindows) {
    closeAllModals(modalWindows);
}

// Diapason Methods

function toggleDiapason(el) {
    const diapason = `${el.getAttribute("data-min-diapason")} - ${el.getAttribute("data-max-diapason")}`;
    const isDiapason = document.querySelector("#" + el.getAttribute("data-question")).checked;
    const fieldType = el.getAttribute("data-field-type");
    const baseValue = el.getAttribute("data-base-value");
    const resultValue = isDiapason ? diapason : baseValue;

    if (fieldType == "placeholder") {
        el.placeholder = resultValue;
    }   else {
        el.value = resultValue;
    }
}

// Calendare Methods

function getDay(date) {
    let trueDate = date.getDay();

    if (trueDate == 0) {
        trueDate = 7;
    }

    return trueDate - 1;
}

function generateMonth(tbody, year, month) {
    let trueMonth = month - 1;
    let date = new Date(year, trueMonth);
    let table = document.querySelector(tbody);
    let tableBody = "";
    let previousMonthDate = new Date(year, trueMonth - 1);
    let lastDayPrevMonth = 0;
    let tableParent = table.closest(".calendare");
    isDiapason = !!(tableParent.getAttribute("data-is-diapason"));

    table.innerHTML = "";

    tableBody += "<tr class='calendare__table-row'>";

    while (previousMonthDate.getMonth() == trueMonth - 1) {
        lastDayPrevMonth += 1;
        previousMonthDate.setDate(previousMonthDate.getDate() + 1);
    }

    for (let i = 0; i < getDay(date); i++) {
        let startDate = lastDayPrevMonth - (getDay(date) - 1);

        tableBody += `<td class="calendare__cell calendare__cell_out-month" data-date="${currentYear}.${currentMonth - 1}.${startDate + i}">
            ${startDate + i}
        </td>`;
    }

    while (date.getMonth() == trueMonth) {
        tableBody += `<td class="calendare__cell" data-date="${currentYear}.${currentMonth}.${date.getDate()}">
            ${date.getDate()}
        </td>`;

        if (getDay(date) == 6) {
            tableBody += `</tr><tr class='calendare__table-row'>`;
        }

        date.setDate(date.getDate() + 1);
    }

    if (getDay(date) != 0) {
        while (getDay(date) != 0) {
            tableBody += `<td class="calendare__cell calendare__cell_out-month" data-date="${currentYear}.${currentMonth + 1}.${date.getDate()}">
                ${date.getDate()}
            </td>`;

            date.setDate(date.getDate() + 1);
        }
    }

    table.innerHTML = tableBody;
    Array.from(table.querySelectorAll(".calendare__cell")).forEach(item => {
        let itemDateArray = item.getAttribute("data-date").split(".");
        let itemDate = new Date(itemDateArray[0], itemDateArray[1] - 1, itemDateArray[2]);
        let currentDate = new Date();

        item.setAttribute("data-order", `${Math.round((((itemDate - currentDate) / 1000) / 3600) / 24) + currentDate.getDate() + 1}`);
    });

    if (isDiapason) {
        interpretateDiapason(currentDiapason);

        let start = new Date();
        let end = new Date();

        end.setDate((new Date()).getDate() - currentDiapason);

        const currentDateInput = table.closest(".select-input-2").querySelector(".input__select-value");

        currentDateInput.textContent = `${end.getFullYear()}.${end.getMonth()}.${end.getDate() < 10 ? "0" + end.getDate() : end.getDate()} - ${start.getFullYear()}.${start.getMonth()}.${start.getDate() < 10 ? "0" + start.getDate() : start.getDate()}`;
    }

    cellsSingle = document.querySelectorAll(".calendare__cell:not(.calendare__cell_title)");

    if (!isDiapason) {
        cellsSingle.forEach(item => {
                item.addEventListener("click", (event) => {
                let currentCell = event.currentTarget;

                cellsSingle.forEach(item => item.classList.remove("calendare__cell_active"));
                currentCell.classList.add("calendare__cell_active");
            });
        })
    }
}

function toggleDate(direction, dateElem) {

    if (direction == "next") {

        if (currentMonth >= 12) {
            currentYear++;
            currentMonth = 1;
        }   else {
            currentMonth++;
        }

        generateMonth(".calendare__table-body", currentYear, currentMonth);
    }   else {

        if (currentMonth <= 1) {
            currentYear--;
            currentMonth = 12;
        }   else {
            currentMonth--;
        }

        generateMonth(".calendare__table-body", currentYear, currentMonth);
    }

    dateElem.setAttribute("data-date", `${currentYear}.${currentMonth}`);
    dateElem.textContent = `${translateMonth(currentMonth)} ${currentYear}`;
}

function translateMonth(month) {
    switch (month) {
        case 1:
            return "Январь"
            break;

            case 2:
            return "Февраль"
            break;

            case 3:
            return "Март"
            break;

            case 4:
            return "Апрель"
            break;

            case 5:
            return "Май"
            break;

            case 6:
            return "Июнь"
            break;

            case 7:
            return "Июль"
            break;

            case 8:
            return "Август"
            break;

            case 9:
            return "Сентябрь"
            break;

            case 10:
            return "Октябрь"
            break;

            case 11:
            return "Ноябрь"
            break;

            case 12:
            return "Декабрь"
            break;
    }
}

function setDiapasonCalendare(start, end, cells) {
    Array.from(cells).forEach(cell => {
        const value = +(cell.getAttribute("data-order"));

        if (value > start && value < end) {
            cell.classList.add("calendare__cell_active");
        }   else if (value == start) {
            cell.classList.add("calendare__cell_active-start");
        }   else if (value == end) {
            cell.classList.add("calendare__cell_active-end");
        }
    });
}

function interpretateDiapason(length) {
    const date = new Date();
    const cells = Array.from(document.querySelectorAll(".calendare__cell")).filter(item => !(item.classList.contains("calendare__cell_title")));

    setDiapasonCalendare(date.getDate() - length, date.getDate(), cells);
}

// Calendare Events

if (currentDate) {

    generateMonth(".calendare__table-body", currentYear, currentMonth);

    calendareNextBtn?.addEventListener("click", (event) => {
        const dateElem = event.currentTarget.closest(".calendare__header").querySelector(".calendare__current-month");

        toggleDate("next", dateElem);
    });

    calendarePrevBtn?.addEventListener("click", (event) => {
        const dateElem = event.currentTarget.closest(".calendare__header").querySelector(".calendare__current-month");

        toggleDate("prev", dateElem);
    });

    saveDiapasonBtn?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const diapasonButtons = currentBtn.closest(".select-diapason").querySelectorAll(".select-diapason__btn");
        const diapasonActiveBtnValue = Array.from(diapasonButtons).find(item => item.classList.contains("select-diapason__btn_active"))
                                    .getAttribute("data-diapason");
        const diapasonInput = currentBtn.closest(".select-diapason").querySelector(".select-diapason__input-value");

        if (diapasonInput.value) {
            currentDiapason = +diapasonInput.value;
            generateMonth(".calendare__table-body", currentYear, currentMonth);
        }   else {
            currentDiapason = +diapasonActiveBtnValue;
            generateMonth(".calendare__table-body", currentYear, currentMonth);
        }
    });

    selectDiapasonButtons.forEach(item => {
        item?.addEventListener("click", (event) => {
            const currentBtn = event.currentTarget;
            const diapasonButtons = currentBtn.closest(".select-diapason").querySelectorAll(".select-diapason__btn");

            diapasonButtons.forEach(item => item.classList.remove("select-diapason__btn_active"));

            currentBtn.classList.add("select-diapason__btn_active");
        });
    });

}

// Navbar Events

navbarListButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentElement = event.currentTarget;
        const nextElement = currentElement.nextElementSibling;

        toggleElement(currentElement, nextElement, "drop-down__open-section_active");
    });
});

// Documentation Events

documentationDropDownButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentElement = event.currentTarget;
        const nextElement = currentElement.nextElementSibling;

        toggleElement(currentElement, nextElement, "documentation__navigation-link_active");
    });
});

// Select Input 2 Events

selectInputButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentElement = event.currentTarget;
        const nextElement = event.currentTarget.nextElementSibling;
        const parentElement = currentElement.parentElement;

        if (!(parentElement.classList.contains("disabled"))) {
            toggleElement(currentElement, nextElement, "active");
        }
    });
});


// Modal Windows Events

modalWindowsButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        modalOpen(currentBtn, modalWindows, "data-modal");
    });
});

modalWindowsCloseButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        closeAllModals(modalWindows);

        event.preventDefault();
    });
});

modalWindows.forEach(item => {
    item?.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-window__container")) {
            closeAllModals(modalWindows);
        }
    });
});

// Submodal Events

subModalButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const subModalWindows = currentBtn.closest("[data-group]").children;

        let currentIndex = Array.from(subModalWindows).findIndex(item => !(item.classList.contains("hidden")) );
        
        subModalWindows[0].parentElement.previousElementSibling.children[currentIndex].classList.add("progress__item_passed");
        modalOpen(currentBtn, subModalWindows, "data-submodal");

        currentIndex = Array.from(subModalWindows).findIndex(item => !(item.classList.contains("hidden")) );
        subModalWindows[0].parentElement.previousElementSibling.children[currentIndex].classList.add("progress__item_current");

        event.preventDefault();
    });
});

endModalButtons.forEach(item => {
   item?.addEventListener("click", (event) => {
      const currentGroup = event.currentTarget.getAttribute("data-reset");
      const resetPagination = event.currentTarget.getAttribute("data-reset-pagination");
      const submodalsGroup = document.querySelector(`[data-group=${currentGroup}`).children;

      closeAllModals(submodalsGroup);
      submodalsGroup[0].classList.remove("hidden");

      if (resetPagination) {
        const pagination =  document.querySelector(`[data-pagination=${resetPagination}`).children;

        Array.from(pagination).forEach(item => item.className = "progress__item");
        pagination[0].classList.add("progress__item_current");

        event.preventDefault();
      }
   });
});

// Drop Down Events

dropDownButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const inputValue = currentBtn.closest(".select-input-2").querySelector(".input__select-value");

        if (inputValue) {
            inputValue.textContent = currentBtn.textContent;
        }
    });
});

// Filter Drop-Down Events

filterDropDownBtn?.addEventListener("click", (event) => {
    const currentBtn = event.currentTarget;
    const filterContent = currentBtn.closest(".filter__header").nextElementSibling;

    toggleElement(currentBtn, filterContent, "filter__open-content-btn_active");
});

// Password Toggle Events

passwordToggleButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const input = currentBtn.closest(".input").querySelector(".input__input");

        if (currentBtn.classList.contains("icon-ic-eye")) {
            input.type = "text";
            currentBtn.classList.remove("icon-ic-eye");
            currentBtn.classList.add("icon-ic-eye-closed");
        }   else if (currentBtn.classList.contains("icon-ic-eye-closed")) {
            input.type = "password";
            currentBtn.classList.remove("icon-ic-eye-closed");
            currentBtn.classList.add("icon-ic-eye");
        }
    });
});

// Copy Events

copyButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const input = currentBtn.closest(".input, .modal-window__content, .license-info__input-wrapper").querySelector(".input__input");

        navigator.clipboard.writeText(input.value);
    });
});

// Clear Events

clearButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const input = currentBtn.closest(".input, .modal-window__content, .license-info__input-wrapper").querySelector(".input__input");

        input.value = "";
    });
});

// Reset Filters Events

resetFiltersBtn?.addEventListener("click", (event) => {
    const currentBtn = event.currentTarget;
    const filterBlock = currentBtn.closest(".filter");
    const filterInputs = filterBlock.querySelectorAll(".input__input");
    const filterCheckboxes = filterBlock.querySelectorAll(".checkbox-quadro__input");
    const filterDiapasons = document.querySelectorAll(`.input__input[data-question]`);
    const filterCells = cellsSingle;

    filterInputs.forEach(item => item.value = "");
    filterCheckboxes.forEach(item => item.checked = false);

    filterDiapasons.forEach(item => toggleDiapason(item));
    filterCells.forEach(item => item.classList.remove("calendare__cell_active"));
});

// Table Events

tableDropDownButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const nextRow = currentBtn.closest(".table__row").nextElementSibling;
        const cell = currentBtn.parentElement;

        nextRow.classList.toggle("hidden");
        
        if (nextRow.classList.contains("hidden")) {
            currentBtn.textContent = "Посмотреть";
            cell.classList.remove("table__cell_drop-down-active");
        }   else {
            currentBtn.textContent = "Свернуть";
            cell.classList.add("table__cell_drop-down-active");
        }
    });
});

// Diapason Events

checkboxes.forEach(item => {
    item?.addEventListener("input", (event) => {
        const input = document.querySelector(`.input__input[data-question=${event.currentTarget.id}]`);

        if (input) {
            toggleDiapason(input);
        }
    });
});

// File Events

fileInputs.forEach(item => {
    item?.addEventListener("change", (event) => {
        const currentInput = event.currentTarget;
        const fileNames = Array.from(currentInput.files).map(item => item.name);
        const filesWrapper = currentInput.closest(".files").querySelector(".files__dragn-drop-files");
        const fileMessage = currentInput.closest(".files").querySelector(".files__file_message");

        if (fileMessage) {
            fileMessage.remove();
        }

        fileNames.forEach(item => {
            filesWrapper.innerHTML += `
            <div class="files__file">
                <p class="files__file-text">${item}</p>
            </div>
            `;
        });
    });
});

// Pop-Up Events

popUpButtons.forEach(item => {
    item?.addEventListener("click", (event) => {
        const popUp = event.currentTarget.closest(".pop-up-wrapper").querySelector(".pop-up");

        if (popUp.getAttribute("data-hidden-delay")) {
            popUp.classList.remove("hidden");
            setTimeout(() => popUp.classList.add("hidden"), +popUp.getAttribute("data-hidden-delay"));
        }   else {
            popUp.classList.toggle("hidden");
        }
    });
});

// Chart Scripts

const ctx1 = document.querySelector(".statistic__graphic-1");
const ctx2 = document.querySelector(".statistic__graphic-2");
const ctx3 = document.querySelector(".information__graphic-1");
const ctx4 = document.querySelector(".information__graphic-2");
const ctx5 = document.querySelector(".components-use__graphic-1");
const ctx6 = document.querySelector(".components-use__graphic-2");

if (ctx1) {

    const chart1 = new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["31", "Sep", "02", "03", "04", "05", "06", "07"],
            datasets: [
            {
                label: "Сканирование",
                data: [0, 0, 0, 0, 1, 0, 1, 1],
                borderWidth: 3,
                borderColor: "#FF6157",
                fill: {
                    target: 'origin',
                    above: 'rgba(255, 97, 87, 0.1)',
                }
            },
        
            {
                label: "Соединение",
                data: [0, 2, 1, 1, 3, 0, 0, 0],
                borderWidth: 3,
                borderColor: "#F9CF3D",
                fill: {
                    target: 'origin',
                    above: 'rgba(249, 207, 61, 0.1)',
                }
            },

            {
                label: "Аутентификация",
                data: [0, 1, 2, 2, 2, 0, 1, 1],
                borderWidth: 3,
                borderColor: "#69C85A",
                fill: {
                    target: 'origin',
                    above: 'rgba(105, 200, 90, 0.1)',
                }
            },

            {
                label: "Эксплуатация",
                data: [0, 3, 2, 3, 6, 4, 7, 2],
                borderWidth: 3,
                borderColor: "#0085FF",
                fill: {
                    target: 'origin',
                    above: 'rgba(0, 133, 255, 0.1)',
                }
            },
        ]
        },
        options: {
            elements: {
                line: {
                    tension: 0.5,
                },
                point: {
                    borderWidth: 3,
                    borderColor: "#000000",
                },
                bar: {
                    borderwidth: 5,
                },
            },
            scales: {
                x: {
                    display: true,
                    border: {
                        dash: [8, 8],
                    }
                },
                y: {
                    display: false,
                },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
        },
    });

    const chart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["5-", "6-", "7-", "8-", "9-", "10-", "11-", "12-"],
            datasets: [
            {
                label: "Эксплуатация",
                data: [0, 3, 2, 3, 6, 4, 7, 2],
                borderWidth: 3,
                borderColor: "#0085FF",
                fill: {
                    target: 'origin',
                    above: 'rgba(0, 133, 255, 0.1)',
                }
            },
        ]
        },
        options: {
            elements: {
                line: {
                    tension: 0.5,
                },
                point: {
                    borderWidth: 3,
                    borderColor: "#000000",
                },
                bar: {
                    borderwidth: 5,
                },
            },
            scales: {
                x: {
                    display: true,
                    border: {
                        dash: [8, 8],
                    }
                },
                y: {
                    display: false
                },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
        },
    });

    const chart3 = new Chart(ctx3, {
        type: "doughnut",
        data: {
            labels: ["31", "Sep", "02", "03", "04", "05", "06", "07"],
            datasets: [
            {
                label: "Сканирование",
                data: [3, 3, 5, 6, 1],
                borderRadius: 5,
                cutout: 45,
                backgroundColor: [
                    "rgba(255, 97, 87, 0.3)",
                    "rgba(249, 207, 61, 0.3)",
                    "rgba(138, 90, 200, 1)",
                    "rgba(0, 133, 255, 0.3)",
                    "rgba(105, 200, 90, 0.3)",
                ]
            },
        ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
        },
    });

    const chart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
            {
                axis: "y",
                label: "Эксплуатация",
                data: [1, 3, 2, 3, 6],
                borderWidth: 2,
                borderRadius: 7,
                fill: false,
                backgroundColor: [
                    "rgba(255, 97, 87, 0.3)",
                    "rgba(249, 207, 61, 0.3)",
                    "rgba(138, 90, 200, 0.3)",
                    "rgba(0, 133, 255, 0.3)",
                    "rgba(105, 200, 90, 0.3)",
                ],
                borderColor: [
                    "rgba(255, 97, 87, 1)",
                    "rgba(249, 207, 61, 1)",
                    "rgba(138, 90, 200, 1)",
                    "rgba(0, 133, 255, 1)",
                    "rgba(105, 200, 90, 1)",
                ]
            },
        ]
        },
        options: {
            elements: {
                line: {
                    tension: 0.5,
                },
                point: {
                    borderWidth: 3,
                    borderColor: "#000000",
                },
                bar: {
                    borderwidth: 5,
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            indexAxis: "y",
        },
    });

}

if (ctx5) {

    const chart5 = new Chart(ctx5, {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", ""],
            datasets: [
            {
                label: "Эксплуатация",
                data: [0, 2, 3, 1, 2, 1, 1, 1],
                borderWidth: 5,
                borderColor: "#0085FF",
                fill: {
                    target: 'origin',
                    above: 'rgba(0, 133, 255, 0.1)',
                }
            },
        ]
        },
        options: {
            elements: {
                point: {
                    pointStyle: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    border: {
                        dash: [8, 8],
                    }
                },
                y: {
                    display: false
                },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            maintainAspectRatio: false,
        },
    });

    const chart6 = new Chart(ctx6, {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", ""],
            datasets: [
            {
                label: "Эксплуатация",
                data: [0, 2, 3, 1, 2, 1, 1, 1],
                borderWidth: 5,
                borderColor: "#69C85A",
                fill: {
                    target: 'origin',
                    above: 'rgba(105, 200, 90, 0.1)',
                }
            },
        ]
        },
        options: {
            elements: {
                point: {
                    pointStyle: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    border: {
                        dash: [8, 8],
                    }
                },
                y: {
                    display: false
                },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            maintainAspectRatio: false,
        },
    });

}