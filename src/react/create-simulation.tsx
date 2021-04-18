/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import { getPluginsWithHooks } from '../render-helpers';
import { createSimulationBase, OmitSimulation } from '../create-simulation-base';
import type { IPROPS, IRenderableHooks, IRenderableMetaDataBase, ISimulation } from '../types';
import { baseRender } from '../create-renderable-base';

export type OmitReactSimulation<DATA extends IReactSimulation> = Omit<OmitSimulation<DATA>, 'renderer' | 'cleanup'>;

export type UnknownProps = Record<string, unknown>;
export type CompProps<COMP extends React.ComponentType<any>> = React.ComponentProps<COMP>;

export function createSimulation<COMP extends React.ComponentType<any>>(
    input: OmitReactSimulation<IReactSimulation<CompProps<COMP>, COMP>>
): IReactSimulation<CompProps<COMP>, COMP> {
    const res = createSimulationBase<IReactSimulation<CompProps<COMP>, COMP>>({
        ...input,
        renderer(target) {
            baseRender(
                res,
                () => {
                    let element = this.wrapper ? (
                        <this.wrapper
                            renderSimulation={(props) => {
                                const mergedProps: React.ComponentProps<COMP> = { ...this.props, ...props };
                                return <res.componentType {...mergedProps} />;
                            }}
                        />
                    ) : (
                        <res.componentType {...this.props} />
                    );
                    const wrapRenderPlugins = getPluginsWithHooks(res, 'wrapRender');
                    for (const plugin of wrapRenderPlugins) {
                        if (plugin.key.plugin?.wrapRender) {
                            const el = plugin.key.plugin?.wrapRender(plugin.props as never, res, element, target);
                            element = el || element;
                        }
                    }
                    ReactDOM.render(element, target);
                },
                target
            );
        },
        cleanup(target) {
            ReactDOM.unmountComponentAtNode(target);
        },
    });
    return res;
}

export interface ISimulationWrapperProps<P> {
    /**
     * Call this function to render the simulated component with the simulated props.
     * @param overrides Allows you to override some of the simulated props with custom values.
     */
    renderSimulation: (overrides?: Partial<P>) => React.ReactElement<P>;
}

export interface IReactSimulationHooks<PLUGINPROPS extends IPROPS> extends IRenderableHooks<PLUGINPROPS> {
    wrapRender?: (
        props: PLUGINPROPS,
        renderable: IRenderableMetaDataBase,
        renderableElement: JSX.Element,
        canvas: HTMLElement
    ) => null | JSX.Element;
}
export interface IReactSimulation<
    PROPS extends UnknownProps = any,
    ComponentType extends React.ComponentType<PROPS> = React.ComponentType<any>
> extends ISimulation<ComponentType, PROPS, IReactSimulationHooks<never>> {
    /** The simulated component type. */
    componentType: ComponentType;

    /** The name of the simulation. */
    name: string;

    /**
     * A map between a component property name and its simulated value.
     */
    // TODO - change props to be optional field (props?: ...)

    /**
     * Allows to wrap the simulated component in another component. Useful for providing context,
     * rendering controlled components, or rendering the simulated component multiple times - for
     * example a radio button as a radio group.
     */
    wrapper?: React.ComponentType<ISimulationWrapperProps<PROPS>>;
}

/**
 * @deprecated
 * use simulation.render instead
 */
export const simulationToJsx = (simulation: IReactSimulation): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { componentType: Comp, props, wrapper: Wrapper } = simulation;
    const renderWithPropOverrides = (overrides?: Record<string, unknown>) => <Comp {...props} {...overrides} />;
    return Wrapper ? <Wrapper renderSimulation={renderWithPropOverrides} /> : <Comp {...props} />;
};