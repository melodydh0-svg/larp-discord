import { patcher, common } from "@vendetta";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "./Settings";

export const pluginStorage = storage as {
    spoofs: Record<string, { username: string, badges: number, memberSince: number }>
};

pluginStorage.spoofs ??= {};

export default {
    onLoad: () => {
        this.unpatchUser = patcher.after("getUser", common.users, (args, ret) => {
            if (!ret || !pluginStorage.spoofs[ret.id]) return ret;
            const s = pluginStorage.spoofs[ret.id];
            ret.username = s.username;
            ret.publicFlags = s.badges;
            return ret;
        });

        this.unpatchDate = patcher.after("default", common.components.MemberSince, (args, ret) => {
            const userId = args[0]?.user?.id;
            if (pluginStorage.spoofs[userId]) {
                ret.props.children = new Date(pluginStorage.spoofs[userId].memberSince).toLocaleDateString();
            }
            return ret;
        });

        this.settingsUnpatch = registerSettings();
    },
    onUnload: () => {
        this.unpatchUser?.();
        this.unpatchDate?.();
        this.settingsUnpatch?.();
    }
};
