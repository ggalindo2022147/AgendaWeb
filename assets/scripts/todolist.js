document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#addForm input");
    const altoCheckbox = document.getElementById("altoCheckbox");
    const bajoCheckbox = document.getElementById("bajoCheckbox");
    const addBtn = document.querySelector("#addForm .btn-add");
    const ul = document.querySelector(".li-container ul");
    const empty = document.querySelector(".empty");
    const editForm = document.getElementById("editForm");

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const text = input.value;
        const priority = altoCheckbox.checked ? "Alto" : "Baja";

        if (text !== "") {
            const li = document.createElement("li");
            li.setAttribute("data-priority", priority);

            const p = document.createElement("p");
            p.textContent = text + " - Prioridad: " + priority;

            li.appendChild(p);
            li.appendChild(addDeleteBtn());
            li.appendChild(editValueBtn());

            ul.appendChild(li);

            const items = Array.from(ul.children);

            items.sort((a, b) => {
                const priorityA = a.getAttribute("data-priority");
                const priorityB = b.getAttribute("data-priority");
                return priorityA.localeCompare(priorityB);
            });

            ul.innerHTML = "";
            items.forEach(item => ul.appendChild(item));

            input.value = "";
            altoCheckbox.checked = false;
            bajoCheckbox.checked = false;
            empty.style.display = "none";
        }
    });

    function addDeleteBtn() {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "btn-delete";

        deleteBtn.addEventListener("click", (e) => {
            const item = e.target.parentElement;
            ul.removeChild(item);

            const items = document.querySelectorAll("li");

            if (items.length === 0) {
                empty.style.display = "block";
            }
        });

        return deleteBtn;
    }

    function editValueBtn() {
        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.className = "btnEdit";

        editBtn.addEventListener("click", (e) => {
            const item = e.target.parentElement;

            editForm.classList.remove("hide");

            document.getElementById("addForm").classList.add("hide");

            const textWithPriority = item.querySelector("p").textContent;

            const altoCheckbox = editForm.querySelector("[value='alto']");
            const bajoCheckbox = editForm.querySelector("[value='Baja']");
            altoCheckbox.checked = textWithPriority.includes("Alto");
            bajoCheckbox.checked = textWithPriority.includes("Baja");

            altoCheckbox.checked = false;
            bajoCheckbox.checked = false;
            const text = textWithPriority.replace(/ - Prioridad: .*/, '');

            editForm.querySelector("input").value = text;

            const updateFunction = (event) => {
                event.preventDefault();

                const editedText = editForm.querySelector("input").value;

                const newPriority = altoCheckbox.checked ? "Alto" : "Baja";

                updateTodo(item, editedText, newPriority);

                editForm.classList.add("hide");

                document.getElementById("addForm").classList.remove("hide");

                editForm.reset();

                editForm.removeEventListener("submit", updateFunction);
            };

            editForm.addEventListener("submit", updateFunction);
        });

        return editBtn;
    }

    function updateTodo(item, text, priority) {
        item.querySelector("p").textContent = text + " - Prioridad: " + priority;
        item.setAttribute("data-priority", priority);
    }
});
