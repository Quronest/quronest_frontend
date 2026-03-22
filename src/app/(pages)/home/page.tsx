import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/pageContainer";
import React from "react";

const HomePage = () => {
  return (
    <PageContainer className="space-y-3">
      <Card border="transparent" hoverEffect="move" className="max-w-100">
        <h1>Welcome User!!</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quis facilis fugit consequatur corporis vero voluptatum, sit cupiditate officia nihil deserunt rerum asperiores ipsam nesciunt corrupti assumenda tenetur, laborum, adipisci inventore. Odio, facilis possimus harum architecto animi minus mollitia aspernatur voluptatum, provident nihil tenetur deleniti, magni ipsa voluptas? Assumenda, ipsum?</p>
      </Card>
    </PageContainer>
  );
};

export default HomePage;
