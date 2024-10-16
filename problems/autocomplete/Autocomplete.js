export class Autocomplete {
    constructor(inputElement, listElement, data) {
        this.inputElement = inputElement;
        this.data = data;
        this.listElement = listElement;
        this.filteredData = [];
    
        this.init();
    }

    init() {
        this.inputElement.addEventListener("input", () => this.onInput());
        document.addEventListener("click", (e) => this.onClickOutside(e));
    }

    onInput() {
        const query = this.inputElement.value.toLowerCase();

        if (query.trim() === "") {
            this.clearList();
            return;
        }

        this.filteredData = this.data.filter(item =>
            item.toLowerCase().startsWith(query)
        );
        this.renderList();
    }

    renderList() {
        this.clearList();

        if (this.filteredData.length === 0) return;

        this.filteredData.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            listItem.classList.add("autocomplete-item");
            listItem.addEventListener("click", () => this.selectItem(item));
            this.listElement.appendChild(listItem);
        });
    }

    selectItem(item) {
        this.inputElement.value = item;
        this.clearList();
    }

    clearList() {
        this.listElement.innerHTML = "";
    }

    onClickOutside(event) {
        if (!this.inputElement.contains(event.target) && !this.listElement.contains(event.target)) {
            this.clearList();
        }
    }
}