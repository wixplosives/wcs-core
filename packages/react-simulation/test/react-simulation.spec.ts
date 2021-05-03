import { expect } from 'chai';
import React from 'react';
import { createSimulation } from '@wixc3/react-simulation';

describe('React simulation', () => {
    interface CompProps {
        name: string;
    }

    it('creates simulations for function components', () => {
        const FnComp: React.FC<CompProps> = () => {
            return null;
        };
        const simulation = createSimulation({
            name: 'sim name',
            componentType: FnComp,
            props: {
                name: 'prop value',
            },
        });

        expect(simulation.name).to.equal('sim name');
        expect(simulation.componentType).to.equal(FnComp);
        expect(simulation.props.name).to.equal('prop value');

        // type check
        createSimulation({
            name: 'test',
            componentType: FnComp,
            // @ts-expect-error should error when "name" is not provided
            props: {},
        });

        // allows passing children
        createSimulation({
            name: 'test',
            componentType: FnComp,
            props: {
                name: 'abc',
                children: 'xyz',
            },
        });
    });

    it('creates simulations for class components', () => {
        class ClassComp extends React.Component<CompProps> {
            render() {
                return null;
            }
        }
        const simulation = createSimulation({
            name: 'sim name',
            componentType: ClassComp,
            props: {
                name: 'prop value',
            },
        });

        expect(simulation.name).to.equal('sim name');
        expect(simulation.componentType).to.equal(ClassComp);
        expect(simulation.props.name).to.equal('prop value');

        // type check
        createSimulation({
            name: 'test',
            componentType: ClassComp,
            // @ts-expect-error should error when "name" is not provided
            props: {},
        });
    });

    it('creates simulations for function components', () => {
        const FnComp: React.FC<CompProps> = () => {
            return null;
        };
        const simulation = createSimulation({
            name: 'sim name',
            componentType: FnComp,
            props: {
                name: 'prop value',
            },
        });

        expect(simulation.name).to.equal('sim name');
        expect(simulation.componentType).to.equal(FnComp);
        expect(simulation.props.name).to.equal('prop value');

        // type check
        createSimulation({
            name: 'test',
            componentType: FnComp,
            // @ts-expect-error should error when "name" is not provided
            props: {},
        });
    });
});
