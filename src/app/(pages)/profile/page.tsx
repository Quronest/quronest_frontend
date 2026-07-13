import ProfilePage from "@/components/profile/ProfilePage";
import ScrollablePageContainer from "@/components/ui/ScrollablePageContainer";
import { profileMockData } from "@/data/profileMockData";

export default function Page() {
  return (
    <ScrollablePageContainer>
      <ProfilePage profile={profileMockData} />
    </ScrollablePageContainer>
  );
}
