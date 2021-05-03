import type { IRenderableSimulation, ISimulation } from '@wixc3/simulation-core';
import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

/** Simulation of React components */
export interface IReactSimulation<C extends ComponentType<any> = ComponentType<any>>
    extends ISimulation<C, PropsWithChildren<ComponentProps<C>>> {
    wrapper?: ComponentType<ISimulationWrapperProps<PropsWithChildren<ComponentProps<C>>>>;
}

export interface IRenderableReactSimulation<C extends ComponentType<any> = ComponentType<any>>
    extends IReactSimulation<C>,
        IRenderableSimulation<C, PropsWithChildren<ComponentProps<C>>> {}

export function createSimulation<C extends ComponentType<any>>(
    simulation: IReactSimulation<C>
): IRenderableReactSimulation<C> {
    const { componentType: Comp, props } = simulation;
    return {
        ...simulation,
        async render(container = document.body.appendChild(document.createElement('div'))) {
            await new Promise<void>((res) => {
                ReactDOM.render(React.createElement(Comp, props), container, res);
            });

            return () => {
                ReactDOM.unmountComponentAtNode(container);
            };
        },
    };
}

export interface ISimulationWrapperProps<P> {
    /**
     * Call this function to render the simulated component with the simulated props.
     * @param overrides Allows you to override some of the simulated props with custom values.
     */
    renderSimulation: (overrides?: Partial<P>) => React.ReactElement<Partial<P>>;
}
