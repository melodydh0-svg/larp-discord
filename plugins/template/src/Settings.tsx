import React from "react";
import { forms } from "@vendetta/ui/components";
import { pluginStorage } from "./index";
import { useProxy } from "@vendetta/storage";

const { FormSection, FormInput, FormRow } = forms;

export const registerSettings = () => {
    return () => {
        useProxy(pluginStorage);
        return (
            <FormSection title="LARP Engine Settings">
                {Object.keys(pluginStorage.spoofs).map(id => (
                    <FormSection key={id} title={`Spoof ID: ${id}`}>
                        <FormInput 
                            title="Spoofed Username" 
                            value={pluginStorage.spoofs[id].username}
                            onChange={(v: string) => pluginStorage.spoofs[id].username = v}
                        />
                        <FormInput 
                            title="Badges Bitmask" 
                            value={String(pluginStorage.spoofs[id].badges)}
                            onChange={(v: string) => pluginStorage.spoofs[id].badges = Number(v)}
                        />
                        <FormInput 
                            title="Member Since (Timestamp)" 
                            value={String(pluginStorage.spoofs[id].memberSince)}
                            onChange={(v: string) => pluginStorage.spoofs[id].memberSince = Number(v)}
                        />
                    </FormSection>
                ))}
            </FormSection>
        );
    };
};