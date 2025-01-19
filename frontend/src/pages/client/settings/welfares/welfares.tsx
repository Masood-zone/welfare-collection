import { useState } from "react";
import { useUserStore } from "@/store/use-user.store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchUserEnrolledWelfarePrograms } from "../../services/welfare/queries";
import { UserWelfaresCard } from "../../components/lists/user-welfares-card";

export default function Welfares() {
  const { user } = useUserStore();
  const { data: welfares, isLoading } = useFetchUserEnrolledWelfarePrograms(
    user?.id ?? ""
  );
  const [activeTab, setActiveTab] = useState("PENDING");

  const filteredWelfares =
    welfares?.filter(
      (welfare: WelfareProgram) => welfare.status === activeTab
    ) || [];
  console.log(filteredWelfares);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Welfares</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="APPROVED">Approved</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
        </TabsList>
        {["PENDING", "APPROVED", "REJECTED"].map((status) => (
          <TabsContent key={status} value={status}>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-[250px] w-full" />
                ))}
              </div>
            ) : filteredWelfares.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredWelfares.map(
                  (welfare: {
                    id: string;
                    status: "PENDING" | "APPROVED" | "REJECTED";
                    welfareProgram: WelfareProgram;
                  }) => (
                    <UserWelfaresCard key={welfare.id} welfare={welfare} />
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No {status.toLowerCase()} welfares found.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
