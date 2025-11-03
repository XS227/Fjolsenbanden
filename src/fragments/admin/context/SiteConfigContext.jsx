import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cloneConfig, createDefaultSiteState, generateId } from "@/fragments/admin/data/defaultSiteState";

const SiteConfigContext = createContext(undefined);

const ROLE_PRESETS = {
    owner: {
        id: "user_owner",
        name: "Odin Owner",
        role: "owner",
    },
    moderator: {
        id: "user_moderator",
        name: "Mona Moderator",
        role: "moderator",
    },
    admin: {
        id: "user_admin",
        name: "Astrid Admin",
        role: "admin",
    },
    partner: {
        id: "user_partner",
        name: "Per Partner",
        role: "partner",
    },
};

function ensureConfigStatus(config, status) {
    const next = cloneConfig(config);
    next.status = status;
    return next;
}

export function SiteConfigProvider({ children }) {
    const defaults = useMemo(() => createDefaultSiteState(), []);
    const [sites, setSites] = useState(defaults.sites);
    const [siteData, setSiteData] = useState(defaults.siteData);
    const [activeSiteId, setActiveSiteId] = useState(defaults.activeSiteId);
    const [roleKey, setRoleKey] = useState("admin");
    const [uploadState, setUploadState] = useState({ isUploading: false, error: null });

    const currentUser = useMemo(() => ROLE_PRESETS[roleKey] ?? ROLE_PRESETS.admin, [roleKey]);

    const activeSite = useMemo(
        () => sites.find((site) => site.id === activeSiteId) ?? sites[0],
        [activeSiteId, sites],
    );

    const activeSiteState = siteData[activeSite?.id];

    const mergeSiteData = useCallback(
        (siteId, mutator) => {
            setSiteData((previous) => {
                const current = previous[siteId];
                const nextState = mutator(current, siteId);
                return {
                    ...previous,
                    [siteId]: nextState,
                };
            });
        },
        [],
    );

    const updateSiteMeta = useCallback(
        (updater) => {
            setSites((current) =>
                current.map((site) => {
                    if (site.id !== activeSiteId) {
                        return site;
                    }
                    const nextValue = typeof updater === "function" ? updater(site) : updater;
                    return { ...site, ...nextValue, updatedAt: new Date().toISOString() };
                }),
            );
        },
        [activeSiteId],
    );

    const updateDraftConfig = useCallback(
        (updater) => {
            const timestamp = new Date().toISOString();
            mergeSiteData(activeSiteId, (current) => {
                const draftCopy = cloneConfig(current.draft);
                const updated = typeof updater === "function" ? updater(draftCopy) : updater;
                const nextDraft = {
                    ...updated,
                    updatedAt: timestamp,
                    status: current.workflow.status === "pending" ? "draft" : updated.status ?? "draft",
                };
                const nextWorkflow = {
                    ...current.workflow,
                    status: "editing",
                    lastEditor: currentUser.name,
                    lastEditedAt: timestamp,
                };
                const nextChangeLog = [
                    {
                        id: generateId("log"),
                        action: "edit",
                        summary: "Oppdaterte kladd",
                        by: currentUser.name,
                        at: timestamp,
                        status: nextDraft.status,
                    },
                    ...current.changeLog,
                ];
                return {
                    ...current,
                    draft: nextDraft,
                    workflow: nextWorkflow,
                    changeLog: nextChangeLog,
                };
            });
            setSites((current) =>
                current.map((site) =>
                    site.id === activeSiteId
                        ? {
                              ...site,
                              status: site.status === "published" ? "draft" : site.status,
                              updatedAt: timestamp,
                          }
                        : site,
                ),
            );
        },
        [activeSiteId, currentUser.name, mergeSiteData],
    );

    const requestPreview = useCallback(() => {
        const timestamp = new Date().toISOString();
        mergeSiteData(activeSiteId, (current) => ({
            ...current,
            workflow: {
                ...current.workflow,
                status: "preview",
                lastPreviewAt: timestamp,
                lastEditor: currentUser.name,
            },
            changeLog: [
                {
                    id: generateId("log"),
                    action: "preview",
                    summary: "Genererte forhåndsvisning",
                    by: currentUser.name,
                    at: timestamp,
                    status: current.draft.status,
                },
                ...current.changeLog,
            ],
        }));
    }, [activeSiteId, currentUser.name, mergeSiteData]);

    const submitForApproval = useCallback(
        (note) => {
            const timestamp = new Date().toISOString();
            mergeSiteData(activeSiteId, (current) => {
                const nextDraft = ensureConfigStatus(current.draft, "pending");
                return {
                    ...current,
                    draft: nextDraft,
                    workflow: {
                        ...current.workflow,
                        status: "pending",
                        lastEditor: currentUser.name,
                        lastEditedAt: timestamp,
                    },
                    changeLog: [
                        {
                            id: generateId("log"),
                            action: "submit",
                            summary: note ?? "Sendt til godkjenning",
                            by: currentUser.name,
                            at: timestamp,
                            status: "pending",
                        },
                        ...current.changeLog,
                    ],
                };
            });
            setSites((current) =>
                current.map((site) =>
                    site.id === activeSiteId
                        ? {
                              ...site,
                              status: "pending",
                              updatedAt: timestamp,
                          }
                        : site,
                ),
            );
        },
        [activeSiteId, currentUser.name, mergeSiteData],
    );

    const publishDraft = useCallback(
        (note) => {
            const timestamp = new Date().toISOString();
            mergeSiteData(activeSiteId, (current) => {
                const snapshot = ensureConfigStatus(current.draft, "published");
                snapshot.updatedAt = timestamp;
                const version = {
                    id: generateId("ver"),
                    label: `Publisering ${new Date(timestamp).toLocaleDateString("nb-NO")}`,
                    createdAt: timestamp,
                    author: currentUser.name,
                    note: note ?? "Publiserte kladden",
                    config: cloneConfig(snapshot),
                };
                return {
                    ...current,
                    draft: cloneConfig(snapshot),
                    published: snapshot,
                    workflow: {
                        ...current.workflow,
                        status: "published",
                        lastEditor: currentUser.name,
                        lastPublishAt: timestamp,
                    },
                    versions: [version, ...current.versions],
                    changeLog: [
                        {
                            id: generateId("log"),
                            action: "publish",
                            summary: note ?? "Publiserte kladden",
                            by: currentUser.name,
                            at: timestamp,
                            status: "published",
                        },
                        ...current.changeLog,
                    ],
                };
            });
            setSites((current) =>
                current.map((site) =>
                    site.id === activeSiteId
                        ? {
                              ...site,
                              status: "published",
                              updatedAt: timestamp,
                          }
                        : site,
                ),
            );
        },
        [activeSiteId, currentUser.name, mergeSiteData],
    );

    const discardDraftChanges = useCallback(() => {
        mergeSiteData(activeSiteId, (current) => ({
            ...current,
            draft: cloneConfig(current.published),
            workflow: {
                ...current.workflow,
                status: "published",
                lastEditor: currentUser.name,
            },
        }));
    }, [activeSiteId, currentUser.name, mergeSiteData]);

    const restoreVersion = useCallback(
        (versionId) => {
            mergeSiteData(activeSiteId, (current) => {
                const version = current.versions.find((entry) => entry.id === versionId);
                if (!version) {
                    return current;
                }
                const timestamp = new Date().toISOString();
                const restored = cloneConfig(version.config);
                restored.status = "draft";
                restored.updatedAt = timestamp;
                return {
                    ...current,
                    draft: restored,
                    workflow: {
                        ...current.workflow,
                        status: "editing",
                        lastEditor: currentUser.name,
                        lastEditedAt: timestamp,
                    },
                    changeLog: [
                        {
                            id: generateId("log"),
                            action: "restore",
                            summary: `Tilbakestilte til ${version.label}`,
                            by: currentUser.name,
                            at: timestamp,
                            status: "draft",
                        },
                        ...current.changeLog,
                    ],
                };
            });
        },
        [activeSiteId, currentUser.name, mergeSiteData],
    );

    const toggleApprovalRequirement = useCallback(
        (value) => {
            mergeSiteData(activeSiteId, (current) => ({
                ...current,
                workflow: {
                    ...current.workflow,
                    requireApproval: value,
                },
            }));
        },
        [activeSiteId, mergeSiteData],
    );

    const setSectionVisibility = useCallback(
        (sectionKey, visible) => {
            mergeSiteData(activeSiteId, (current) => ({
                ...current,
                moderation: {
                    ...current.moderation,
                    sections: {
                        ...current.moderation.sections,
                        [sectionKey]: {
                            hidden: !visible,
                            updatedAt: new Date().toISOString(),
                            updatedBy: currentUser.name,
                        },
                    },
                },
            }));
        },
        [activeSiteId, currentUser.name, mergeSiteData],
    );

    const updateDomainSettings = useCallback(
        (updater) => {
            let computed;
            mergeSiteData(activeSiteId, (current) => {
                const nextDomain = typeof updater === "function" ? updater(current.domain) : updater;
                computed = {
                    ...current.domain,
                    ...nextDomain,
                    lastCheckedAt: nextDomain.lastCheckedAt ?? current.domain.lastCheckedAt,
                };
                return {
                    ...current,
                    domain: computed,
                };
            });
            if (computed) {
                updateSiteMeta((meta) => ({ ...meta, domain: computed.customDomain ?? meta.domain }));
            }
        },
        [activeSiteId, mergeSiteData, updateSiteMeta],
    );

    const checkDns = useCallback(() => {
        const timestamp = new Date().toISOString();
        const states = ["connected", "pending", "error"];
        const nextState = states[Math.floor(Math.random() * states.length)];
        updateDomainSettings({ dnsStatus: nextState, lastCheckedAt: timestamp });
        return nextState;
    }, [updateDomainSettings]);

    const simulateUpload = useCallback(
        async (file) => {
            if (!file) {
                throw new Error("Ingen fil valgt");
            }
            const sizeLimit = 2 * 1024 * 1024;
            const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
            if (file.size > sizeLimit) {
                throw new Error("Filen er større enn 2MB");
            }
            if (!allowedTypes.includes(file.type)) {
                throw new Error("Ugyldig filtype");
            }
            setUploadState({ isUploading: true, error: null });
            const uploadedPath = `/uploads/${activeSiteId}/${Date.now()}-${file.name}`;
            await new Promise((resolve) => setTimeout(resolve, 350));
            mergeSiteData(activeSiteId, (current) => ({
                ...current,
                uploads: [
                    {
                        id: generateId("upload"),
                        name: file.name,
                        path: uploadedPath,
                        size: file.size,
                        type: file.type,
                        uploadedAt: new Date().toISOString(),
                    },
                    ...current.uploads,
                ],
            }));
            setUploadState({ isUploading: false, error: null });
            return uploadedPath;
        },
        [activeSiteId, mergeSiteData],
    );

    const contextValue = useMemo(
        () => ({
            sites,
            siteData,
            activeSite,
            activeSiteState,
            selectSite: setActiveSiteId,
            currentUser,
            currentRole: currentUser.role,
            setCurrentRole: setRoleKey,
            updateDraftConfig,
            updateSiteMeta,
            requestPreview,
            publishDraft,
            submitForApproval,
            discardDraftChanges,
            restoreVersion,
            toggleApprovalRequirement,
            setSectionVisibility,
            updateDomainSettings,
            checkDns,
            simulateUpload,
            uploadState,
        }),
        [
            activeSite,
            activeSiteState,
            currentUser,
            publishDraft,
            requestPreview,
            restoreVersion,
            setSectionVisibility,
            sites,
            siteData,
            submitForApproval,
            discardDraftChanges,
            toggleApprovalRequirement,
            updateDraftConfig,
            updateSiteMeta,
            updateDomainSettings,
            checkDns,
            simulateUpload,
            uploadState,
        ],
    );

    return React.createElement(SiteConfigContext.Provider, { value: contextValue }, children);
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (!context) {
        throw new Error("useSiteConfig must be used inside SiteConfigProvider");
    }
    return context;
}
