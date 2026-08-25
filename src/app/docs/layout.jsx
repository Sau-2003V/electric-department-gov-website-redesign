import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Component,
  Tag,
  SquareSquare,
  ArrowRight,
  ToggleLeft,
  Layers,
  MessageSquare,
  ListFilter,
  ChevronsUpDown,
  Loader2,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Component Documentation - Design System",
  description: "Documentation and interactive showcases for UI components",
};

const componentsList = [
  { name: "Badge", href: "/docs/components/badge", status: "Updated" },
  { name: "Button", href: "/docs/components/button", status: "Ready" },
  { name: "Input", href: "/docs/components/input", status: "Updated" },
  { name: "Switch", href: "/docs/components/switch", status: "Updated" },
  { name: "Tabs", href: "/docs/components/tabs", status: "Updated" },
  { name: "Dialog", href: "/docs/components/dialog", status: "Updated" },
  { name: "Dropdown", href: "/docs/components/dropdown", status: "Updated" },
  { name: "Select", href: "/docs/components/select", status: "Updated" },
  { name: "Spinner", href: "/docs/components/spinner", status: "Updated" },
];

export default function DocsLayout({ children }) {
  return (
    <div className="bg-canvas text-ink selection:bg-brand-accent/20 selection:text-ink min-h-screen font-sans antialiased">
      {/* Top Header */}
      <header className="border-hairline bg-canvas/90 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-ink flex items-center gap-2 text-sm font-medium tracking-tight transition-opacity hover:opacity-80"
            >
              <span className="bg-ink shadow-subtle flex size-7 items-center justify-center rounded-lg text-xs font-medium text-white">
                ED
              </span>
              <span className="font-medium tracking-tight">Design System</span>
            </Link>
            <span className="text-hairline font-light">/</span>
            <span className="text-muted-text text-xs font-medium">Docs</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="accent-subtle" size="sm" shape="tag">
              <Sparkles className="size-2.5" />
              Design Tokens 2.0
            </Badge>
            <Link
              href="/"
              className="border-hairline bg-surface-card text-ink hover:bg-surface-strong flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
            >
              <span>Back to App</span>
              <ArrowRight className="text-muted-text size-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Docs Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="text-muted-soft mb-2.5 flex items-center gap-2 text-xs font-medium tracking-wider uppercase">
                  <BookOpen className="size-3.5" />
                  <span>Overview</span>
                </h3>
                <nav className="space-y-1">
                  <Link
                    href="/docs"
                    className="text-muted-text hover:bg-surface-card hover:text-ink flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
                  >
                    <span>Getting Started</span>
                  </Link>
                  <Link
                    href="/docs/components"
                    className="text-muted-text hover:bg-surface-card hover:text-ink flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
                  >
                    <span>All Components</span>
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-muted-soft mb-2.5 flex items-center gap-2 text-xs font-medium tracking-wider uppercase">
                  <Component className="size-3.5" />
                  <span>Components</span>
                </h3>
                <nav className="space-y-1">
                  {componentsList.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group text-muted-text hover:bg-surface-card/70 hover:text-ink flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all"
                    >
                      <span className="flex items-center gap-2">
                        {item.name === "Badge" ? (
                          <Tag className="text-badge-orange size-3" />
                        ) : item.name === "Switch" ? (
                          <ToggleLeft className="text-brand-accent size-3" />
                        ) : item.name === "Tabs" ? (
                          <Layers className="text-brand-accent size-3" />
                        ) : item.name === "Dialog" ? (
                          <MessageSquare className="text-brand-accent size-3" />
                        ) : item.name === "Dropdown" ? (
                          <ListFilter className="text-brand-accent size-3" />
                        ) : item.name === "Select" ? (
                          <ChevronsUpDown className="text-brand-accent size-3" />
                        ) : item.name === "Spinner" ? (
                          <Loader2 className="text-brand-accent size-3 animate-spin" />
                        ) : (
                          <SquareSquare className="text-muted-text group-hover:text-ink size-3" />
                        )}
                        {item.name}
                      </span>
                      {item.status && (
                        <Badge
                          variant={
                            item.status === "Updated" ? "accent" : "secondary"
                          }
                          size="sm"
                          shape="rounded"
                        >
                          {item.status}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
