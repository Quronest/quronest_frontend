import ProfilePage from "@/components/profile/ProfilePage";
import { profileMockData } from "@/data/profileMockData";

export default function Page() {
  return <ProfilePage profile={profileMockData} />;
}