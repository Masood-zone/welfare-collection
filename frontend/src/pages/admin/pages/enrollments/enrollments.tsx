import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useApproveEnrollment,
  useFetchAllEnrollments,
  useRejectEnrollment,
} from "../../services/enrollments/queries";
import { EnrollmentsTable } from "./table/tables";

export default function Enrollments() {
  const {
    data: enrollments,
    isLoading,
    isError,
    error,
  } = useFetchAllEnrollments();
  const { mutateAsync: approveEnrollment } = useApproveEnrollment();
  const { mutateAsync: rejectEnrollment } = useRejectEnrollment();
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  const filteredEnrollments =
    enrollments?.enrollments.filter((enrollment: Enrollments) => {
      if (activeTab === "all") return true;
      return enrollment.status.toLowerCase() === activeTab;
    }) || [];

  const handleApprove = async (id: string) => {
    await approveEnrollment(id);
  };

  const handleReject = async (id: string) => {
    await rejectEnrollment(id);
  };

  return (
    <div className="container mx-auto px-4 pt-2">
      <h1 className="text-3xl font-bold mb-6">Enrollments</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EnrollmentsTable
            data={filteredEnrollments}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </TabsContent>
        <TabsContent value="pending">
          <EnrollmentsTable
            data={filteredEnrollments}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </TabsContent>
        <TabsContent value="approved">
          <EnrollmentsTable
            data={filteredEnrollments}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </TabsContent>
        <TabsContent value="rejected">
          <EnrollmentsTable
            data={filteredEnrollments}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
