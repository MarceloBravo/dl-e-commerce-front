import styles from './style.css?inline';

export class Render {
    private root: ShadowRoot;
    private totalPages: number;
    private activePage: number;

    constructor(root: ShadowRoot, totalPages: number, activePage: number) {
        this.root = root;
        this.totalPages = totalPages;
        this.activePage = activePage;
    }

    private normalize() {
        const total = Math.max(0, Math.floor(this.totalPages));
        let active = Math.max(1, Math.floor(this.activePage));

        if (total > 0) {
            active = Math.min(active, total);
        } else {
            active = 1;
        }

        return { total, active };
    }

    private getPageNumbers(total: number, active: number) {
        if (total <= 5) {
            return Array.from({ length: total }, (_, index) => index + 1);
        }

        const maxStart = total - 4;
        let start = active - 2;

        if (start < 1) {
            start = 1;
        }

        if (start > maxStart) {
            start = maxStart;
        }

        return Array.from({ length: 5 }, (_, index) => start + index);
    }

    private attachListeners() {
        const buttons = Array.from(this.root.querySelectorAll<HTMLButtonElement>('button[data-page]'));

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetPage = Number(button.dataset.page);

                if (!Number.isNaN(targetPage)) {
                    const host = this.root.host as HTMLElement;
                    host.setAttribute('active-page', String(targetPage));

                    const event = new CustomEvent('page-change', {
                        detail: { page: targetPage },
                        bubbles: true,
                        composed: true
                    });

                    host.dispatchEvent(event);
                }
            });
        });
    }

    render() {
        const { total, active } = this.normalize();
        const pageNumbers = this.getPageNumbers(total, active);
        const firstDisabled = active === 1 || total === 0;
        const lastDisabled = active === total || total === 0;
        const lastPage = total > 0 ? total : 1;

        const pageButtons = pageNumbers
            .map((page) => {
                const isActive = page === active;
                return `<button class="page-button${isActive ? ' active' : ''}" type="button" data-page="${page}" aria-current="${isActive ? 'page' : 'false'}">${page}</button>`;
            })
            .join('');

        const htmlString = `
            <div class="pagination">
                <button class="nav-button" type="button" data-page="1" ${firstDisabled ? 'disabled' : ''} aria-label="Ir a la primera página">«</button>
                <div class="page-list">
                    ${pageButtons}
                </div>
                <button class="nav-button" type="button" data-page="${lastPage}" ${lastDisabled ? 'disabled' : ''} aria-label="Ir a la última página">»</button>
            </div>
        `;

        const fragment = document.createRange().createContextualFragment(htmlString);
        this.root.replaceChildren(fragment);

        const style = document.createElement('style');
        style.textContent = styles;
        this.root.appendChild(style);

        this.attachListeners();

        return this.root;
    }
}
