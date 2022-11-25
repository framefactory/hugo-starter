import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ff-clock")
export class Clock extends LitElement
{
    static styles = css`
        h1 {
            background-color: red;
        }
    `;

    private _handle = null;

    connectedCallback()
    {
        super.connectedCallback();
        this._handle = setInterval(() => this.requestUpdate(), 1000);
    }

    disconnectedCallback()
    {
        clearInterval(this._handle);
        super.disconnectedCallback();
    }

    protected render()
    {
        const time = new Date().toTimeString();
        return html`<h1>${time}</h1>`;
    }
}