/** An entity that can be rendered into screen */
export interface IRenderable {
    /**
     * Render into canvas.
     *
     * @param canvas if not provided, default will be created
     * @returns callback to cleanup and restore environment
     */
    render(canvas?: HTMLElement): CleanupCallback | Promise<CleanupCallback>;
}

export type CleanupCallback = () => Promise<void> | void;
