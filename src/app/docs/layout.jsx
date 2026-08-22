import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Layers,
  Component,
  Tag,
  SquareSquare,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Component Documentation - Design System",
  description: "Documentation and interactive showcases for UI components",
};

const componentsList = [
  {
    name: "Badge",
    href: "/docs/components/badge",
    status: "Updated",
  },
  { name: "Button", href: "/docs/components/button", status: "Ready" },
  { name: "Input", href: "/docs/components/input", status: "Updated" },
  { name: "Tabs", href: "/docs/components/tabs", status: "Ready" },
  { name: "Dialog", href: "/docs/components/dialog", status: "Ready" },
  { name: "Dropdown", href: "/docs/components/dropdown", status: "Ready" },
  { name: "Select", href: "/docs/components/select", status: "Ready" },
  { name: "Switch", href: "/docs/components/switch", status: "Ready" },
  { name: "Spinner", href: "/docs/components/spinner", status: "Ready" },
];

export default function DocsLayout({ children }) {
  return (
    <div className="bg-canvas text-ink selection:bg-fin-orange/20 selection:text-ink min-h-screen font-sans antialiased">
      {/* Top Header */}
      <header className="border-hairline bg-canvas/90 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-ink flex items-center gap-2 text-sm font-medium tracking-tight transition-opacity hover:opacity-80"
            >
              <span className="bg-ink flex size-7 items-center justify-center rounded-lg text-xs font-semibold text-white shadow-xs">
                ED
              </span>
              <span className="font-semibold tracking-tight">
                Design System
              </span>
            </Link>
            <span className="text-hairline font-light">/</span>
            <span className="text-ink-muted text-xs font-medium">Docs</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="accent-subtle" size="sm" shape="tag">
              <Sparkles className="size-2.5" />
              Fin AI Ready
            </Badge>
            <Link
              href="/"
              className="border-hairline bg-surface-1 text-ink hover:bg-surface-2 flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
            >
              <span>Back to App</span>
              <ArrowRight className="text-ink-muted size-3" />
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
                <h3 className="text-ink-subtle mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                  <BookOpen className="size-3.5" />
                  <span>Overview</span>
                </h3>
                <nav className="space-y-1">
                  <Link
                    href="/docs"
                    className="text-ink-muted hover:bg-surface-1 hover:text-ink flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
                  >
                    <span>Getting Started</span>
                  </Link>
                  <Link
                    href="/docs"
                    className="text-ink-muted hover:bg-surface-1 hover:text-ink flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
                  >
                    <span>Design Tokens</span>
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-ink-subtle mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                  <Component className="size-3.5" />
                  <span>Components</span>
                </h3>
                <nav className="space-y-1">
                  {componentsList.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                        item.active
                          ? "bg-surface-1 text-ink border-hairline border font-semibold shadow-xs"
                          : "text-ink-muted hover:bg-surface-1/70 hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.name === "Badge" ? (
                          <Tag className="text-fin-orange size-3" />
                        ) : (
                          <SquareSquare className="text-ink-subtle group-hover:text-ink size-3" />
                        )}
                        {item.name}
                      </span>
                      {item.status && (
                        <Badge
                          variant={item.active ? "accent" : "secondary"}
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
