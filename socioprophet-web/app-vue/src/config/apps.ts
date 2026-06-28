// Workspace/one app registry — drives the apps waffle launcher + routing. Each app maps to an existing backend
// (we embed/wire OSS rather than rebuild editors). status: 'live' wired | 'foundation' scaffolded | 'planned'.
export interface WorkspaceApp {
  id: string;
  name: string;
  icon: string;     // Tabler icon name (no ti- prefix)
  color: string;    // launcher tile color (Google-launcher feel)
  route: string;
  backend: string;  // what powers it
  status: "live" | "foundation" | "planned";
}

export const APPS: WorkspaceApp[] = [
  { id: "mail",     name: "Mail",      icon: "mail",         color: "#ea4335", route: "/mail",     backend: "prophet-workspace (Postfix/Dovecot)", status: "foundation" },
  { id: "calendar", name: "Calendar",  icon: "calendar",     color: "#1a73e8", route: "/calendar", backend: "Radicale CalDAV",                     status: "planned" },
  { id: "chat",     name: "Chat",      icon: "message",      color: "#0b8043", route: "/chat",     backend: "Matrix/XMPP (tbd)",                   status: "planned" },
  { id: "meet",     name: "Meet",      icon: "video",        color: "#00897b", route: "/meet",     backend: "Jitsi",                               status: "planned" },
  { id: "drive",    name: "Drive",     icon: "folder",       color: "#1e8e3e", route: "/drive",    backend: "object storage",                      status: "planned" },
  { id: "docs",     name: "Docs",      icon: "file-text",    color: "#1a73e8", route: "/docs",     backend: "Collabora (WOPI)",                    status: "planned" },
  { id: "sheets",   name: "Sheets",    icon: "table",        color: "#0f9d58", route: "/sheets",   backend: "Collabora (WOPI)",                    status: "planned" },
  { id: "slides",   name: "Slides",    icon: "presentation", color: "#f4b400", route: "/slides",   backend: "Collabora (WOPI)",                    status: "planned" },
  { id: "contacts", name: "Contacts",  icon: "users",        color: "#1a73e8", route: "/contacts", backend: "CardDAV",                             status: "planned" },
  { id: "forms",    name: "Forms",     icon: "forms",        color: "#7627bb", route: "/forms",    backend: "platform",                            status: "planned" },
  { id: "aistudio", name: "AI Studio", icon: "sparkles",     color: "#7b3ff2", route: "/ai-studio", backend: "sovereign choir",                    status: "planned" },
];
