"use client";

import ProfilePage from "@/components/profile/ProfilePage";
import ScrollablePageContainer from "@/components/ui/ScrollablePageContainer";
import { useGetProfileQuery } from "@/store/features/user/userApi";
import { SocialLinkType } from "@/types/SocialLinkType.enum";
import type { UserProfile } from "@/types/ProfileType";

export default function Page() {
  const { data, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return (
      <ScrollablePageContainer>
        <div className="flex h-64 items-center justify-center">
          Loading profile...
        </div>
      </ScrollablePageContainer>
    );
  }

  if (isError || !data) {
    return (
      <ScrollablePageContainer>
        <div className="flex h-64 items-center justify-center">
          Failed to load profile.
        </div>
      </ScrollablePageContainer>
    );
  }

  const profile: UserProfile = {
    id: data.id,
    name: data.fullname,
    username: data.username,
    email: data.email,
    avatar: data.avatar,

    location: data.personal_data?.description ?? "Not provided",

    joinedAt: "-",

    skills: data.personal_data?.skills ?? [],

    social:
      data.other_data?.social_links?.map((item: any) => ({
        type: item.type as SocialLinkType,
        link: item.link,
        title: item.title,
      })) ?? [],

    stats: {
      group: data.current_summary?.group ?? "-",
      level: data.current_summary?.phase ?? 0,
      streak: 0,
      techStack: "-",
    },

    contributions: [],

    activityTimeline: [],
  };

  return (
    <ScrollablePageContainer>
      <ProfilePage profile={profile} />
    </ScrollablePageContainer>
  );
}
