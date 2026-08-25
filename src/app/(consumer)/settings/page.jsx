"use client";

import { useState } from "react";
import { User, Sparkles, Bell, CreditCard, Shield } from "lucide-react";
import { useGetUser } from "@/database/query/getUser";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";
import SettingsHeader from "./_components/SettingsHeader";
import ProfileCard from "./_components/ProfileCard";
import PersonalDetailsTab from "./_components/PersonalDetailsTab";
import PersonalizationTab from "./_components/PersonalizationTab";
import NotificationsTab from "./_components/NotificationsTab";
import BillingTab from "./_components/BillingTab";
import SecurityTab from "./_components/SecurityTab";

export default function SettingsPage() {
  const { data: user, isLoading } = useGetUser();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        {/* Page Title & Breadcrumb Header */}
        <SettingsHeader />

        {/* User Details Profile Card */}
        <ProfileCard user={user} isLoading={isLoading} />

        {/* Settings Navigation Tabs & Content Panes */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Tab Switcher */}
            <div className="scrollbar-none overflow-x-auto pb-2">
              <TabsList
                variant="nav-pill-group"
                size="default"
                className="min-w-max"
              >
                <TabItem
                  value="profile"
                  icon={User}
                  label="Profile & Contact"
                />
                <TabItem
                  value="appearance"
                  icon={Sparkles}
                  label="Personalization"
                />
                <TabItem
                  value="notifications"
                  icon={Bell}
                  label="Alerts & Outages"
                  badge="5"
                />
                <TabItem
                  value="billing"
                  icon={CreditCard}
                  label="Billing & Subsidies"
                />
                <TabItem
                  value="security"
                  icon={Shield}
                  label="Security & Access"
                />
              </TabsList>
            </div>

            {/* Tab 1: Profile & Contact */}
            <TabPanel value="profile" className="mt-6">
              <PersonalDetailsTab user={user} />
            </TabPanel>

            {/* Tab 2: Personalization (Theme, Font Size, Language) */}
            <TabPanel value="appearance" className="mt-6">
              <PersonalizationTab />
            </TabPanel>

            {/* Tab 3: Alerts & Outages */}
            <TabPanel value="notifications" className="mt-6">
              <NotificationsTab />
            </TabPanel>

            {/* Tab 4: Billing & Subsidies */}
            <TabPanel value="billing" className="mt-6">
              <BillingTab />
            </TabPanel>

            {/* Tab 5: Security & Access */}
            <TabPanel value="security" className="mt-6">
              <SecurityTab />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
