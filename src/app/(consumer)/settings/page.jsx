"use client";

import { useState } from "react";
import { User, Sparkles, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUser, useGetUserProfile, useInvalidateUser } from "@/database/query/getUser";
import { supabase } from "@/database/supabase/supabase";
import { Tabs, TabsList, TabItem, TabPanel } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
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
  const [signOutOpen, setSignOutOpen] = useState(false);
  const router = useRouter();
  const invalidateUser = useInvalidateUser();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      invalidateUser();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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

        <div className="mt-12 flex justify-start">
          <Dialog open={signOutOpen} onOpenChange={setSignOutOpen}>
            <DialogTrigger
              render={
                <Button variant="ghost" className="text-error hover:bg-error/10 hover:text-error">
                  <LogOut size={16} className="mr-2" />
                  Sign out of Vidhyut Portal
                </Button>
              }
            />
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Sign out</DialogTitle>
                <DialogDescription>
                  Are you sure you want to sign out? You will need to log back in to access your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost">Cancel</Button>} />
                <Button variant="destructive" onClick={handleSignOut}>
                  Sign out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
