import { DocsRenderer } from "./DocsRenderer";
import { mockMarkdown } from "./mockMarkdown";
import { TabContainer } from "../ui/TabContainer";

export const ResourceTab = () => {
  return (
    <TabContainer>
      <DocsRenderer markdown={mockMarkdown} />
    </TabContainer>
  );
};
