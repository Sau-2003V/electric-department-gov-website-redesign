"use client";

import { useState } from "react";
import { User, Sparkles, Shield } from "lucide-react";
import { useGetUser, useGetUserProfile } from "@/database/query/getUser";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";
import SettingsHeader from "./_components/SettingsHeader";
import ProfileCard from "./_components/ProfileCard";
import PersonalDetailsTab from "./_components/PersonalDetailsTab";
import PersonalizationTab from "./_components/PersonalizationTab";
import SecurityTab from "./_components/SecurityTab";

export default function SettingsPage() {
  const { data: user, isLoading: isAuthLoading } = useGetUser();
  const { data: profile, isLoading: isProfileLoading } = useGetUserProfile(
    user?.id
  );
  const isLoading = isAuthLoading || isProfileLoading;
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <SettingsHeader />
        <ProfileCard user={user} profile={profile} isLoading={isLoading} />

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                <TabItem value="security" icon={Shield} label="Security" />
              </TabsList>
            </div>

            <TabPanel value="profile" className="mt-6">
              <PersonalDetailsTab profile={profile} />
            </TabPanel>

            <TabPanel value="appearance" className="mt-6">
              <PersonalizationTab />
            </TabPanel>

            <TabPanel value="security" className="mt-6">
              <SecurityTab />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
