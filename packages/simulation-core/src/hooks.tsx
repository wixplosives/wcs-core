import type { IGeneralMetadata, PluginInfo, Plugin, HookMap, IPROPS, HOOK } from './types';

export type HookNames<DATA extends IGeneralMetadata<unknown, HookMap>> = keyof NonNullable<DATA['__hooks']> & string;

export function getPluginsWithHooks<DATA extends IGeneralMetadata<unknown, HookMap>>(
    data: DATA,
    hookName: HookNames<DATA>
): PluginInfo<IPROPS, DATA, Plugin<IPROPS, DATA>>[] {
    if (!data.plugins) {
        return [];
    }
    return data.plugins.filter((item) => !!(item.key.plugin as HookMap)[hookName]) as PluginInfo<
        IPROPS,
        DATA,
        Plugin<IPROPS, DATA>
    >[];
}

export type HookParams<DATA extends IGeneralMetadata<unknown, HookMap>, HOOK extends HookNames<DATA>> = NonNullable<
    NonNullable<DATA['__hooks']>[HOOK]
> extends (pluginParams: never, ...args: infer U) => void | unknown
    ? U
    : never;

export function callHooks<DATA extends IGeneralMetadata<unknown, HookMap>, HOOKNAME extends HookNames<DATA>>(
    data: DATA,
    hookName: HOOKNAME,
    ...props: HookParams<DATA, HOOKNAME>
): void {
    const plugins = getPluginsWithHooks(data, hookName);
    for (const pluginInfo of plugins) {
        if ((pluginInfo.key.plugin as HookMap)[hookName]) {
            (((pluginInfo.key.plugin as HookMap)[hookName] as unknown) as HOOK<
                IPROPS,
                HookParams<DATA, HOOKNAME>,
                void
            >)(pluginInfo.props as never, ...props);
        }
    }
}
