/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';

// TODO - remove, just example
export const c: FC<{ text1: string }> = ({ text1 }) => <button>{text1}</button>;

export type IMetadataForComponent<
    COMP extends React.ComponentType,
    COMPONENT_METADATA extends Record<string, any> = Record<string, any>,
    PROPS_ANNOTAIONS extends Record<string, any> = Record<string, any>
> = {
    componentRef: COMP;
    componentMetadata?: COMPONENT_METADATA;
    propsAnnotations?: {
        [key in keyof React.PropsWithChildren<React.ComponentProps<COMP>>]: PROPS_ANNOTAIONS;
    };
};

export type IMetadata<Entity, Metadata> = Entity extends React.ComponentType<any>
    ? IMetadataForComponent<Entity, Metadata>
    : never;

export function createMetadata<Entity, Metadata>(metadata: IMetadata<Entity, Metadata>): IMetadata<Entity, Metadata> {
    return metadata;
}

// TODO - remove, just example
export type WCS_COMPONENT_METADATA = { tags?: string[] };

// TODO - remove, just example
export function wcsCreateMetadata(
    metadata: IMetadata<any, WCS_COMPONENT_METADATA>
): IMetadata<any, WCS_COMPONENT_METADATA> {
    return createMetadata<React.ComponentType, WCS_COMPONENT_METADATA>(metadata);
}

import type '@wixc3/wcs-core/comments'

// TODO - remove, just example
const k = wcsCreateMetadata({
    ref: c,
    metadata: {
        tags: ['hello'],
    }
});

.sim.tsx
.meta.tsx


_wcs/metadata/userProfileInterface.meta.tsx

import { a } from ...
import type '@wixc3/wcs-comments'

createMetadata<Entity, [CommentExtension, TagsExtension]>({
    ref: a,
    ...
})