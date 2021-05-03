import type { IRenderable } from './renderable';

export interface ISimulation<C = any, P = {}> {
    /** Simulation name */
    name: string;

    /** The simulated component type. */
    componentType: C;

    /** Properties to provide during this simulation. */
    props: P;

    /** Customize canvas and/or window */
    environment?: IRenderableEnvironment;

    /**
     * Runs once before the renderable is rendered.
     * Callback gets API to add external scripts or stylesheets
     */
    setup?: SetupCallback | SetupCallback[];
}

/**
 * A component simulation that can be rendered.
 */
export interface IRenderableSimulation<C = any, P = {}> extends ISimulation<C, P>, IRenderable {}

export type SetupCallback = (actions: ISetupActions) => Promise<void> | void;

export interface ISetupActions {
    addScript(scriptUrl: string): Promise<void>;
    addStylesheet(stylesheetUrl: string): Promise<void>;
}

export type LayoutSize = number | undefined | null;

export type LayoutSizeWithAuto = LayoutSize | 'auto';

export interface LayoutSpacing {
    /** @visualizer spacing */
    top?: LayoutSize;
    /** @visualizer spacing */
    right?: LayoutSize;
    /** @visualizer spacing */
    bottom?: LayoutSize;
    /** @visualizer spacing */
    left?: LayoutSize;
}

export interface IRenderableEnvironment extends IWindowStyle, ICanvasStyle {}

export interface IWindowStyle {
    /** @visualizer spacing */
    windowWidth?: number | undefined;
    /** @visualizer spacing */
    windowHeight?: number | undefined;
    /** @visualizer color */
    windowBackgroundColor?: string | undefined;
}

export interface ICanvasStyle {
    /** @visualizer spacing */
    canvasWidth?: LayoutSizeWithAuto;
    /** @visualizer spacing */
    canvasHeight?: LayoutSizeWithAuto;
    /** @visualizer color */
    canvasBackgroundColor?: string;
    /** @visualizer canvasMargin */
    canvasMargin?: LayoutSpacing;
    /** @visualizer canvasPadding */
    canvasPadding?: LayoutSpacing;
}
