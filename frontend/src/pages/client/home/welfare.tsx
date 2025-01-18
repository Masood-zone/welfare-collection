import { useState } from "react";
import {
  useFetchAllWelfarePrograms,
  useFetchUserEnrolledWelfarePrograms,
} from "../services/welfare/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WelfareCard } from "../components/lists/welfare-card";
import { useUserStore } from "@/store/use-user.store";

const MotionCard = motion(Card);

function AnimatedWelfareCard({
  program,
  status,
  index,
  isEnrolled,
}: {
  program: WelfareProgram;
  status?: string;
  index: number;
  isEnrolled?: boolean;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MotionCard
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <WelfareCard program={program} status={status} isEnrolled={isEnrolled} />
    </MotionCard>
  );
}

export default function Welfare() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("available");
  const { data: allWelfarePrograms, isLoading: isLoadingAll } =
    useFetchAllWelfarePrograms();
  const { data: enrolledPrograms, isLoading: isLoadingEnrolled } =
    useFetchUserEnrolledWelfarePrograms(user?.id ?? "");

  const availablePrograms = allWelfarePrograms?.filter(
    (program: {
      id: string;
      name: string;
      description: string;
      paymentCycle: string;
      amount: number;
    }) =>
      !enrolledPrograms?.some(
        (enrolled: {
          welfareProgram: {
            id: string;
          };
        }) => enrolled.welfareProgram.id === program.id
      )
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Programs</TabsTrigger>
            <TabsTrigger value="enrolled">Enrolled Programs</TabsTrigger>
          </TabsList>
          {/* Available programs */}
          <TabsContent value="available">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoadingAll
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-2/3 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))
                : availablePrograms?.map(
                    (program: WelfareProgram, index: number) => (
                      <AnimatedWelfareCard
                        key={program.id}
                        program={program}
                        index={index}
                        isEnrolled={false}
                      />
                    )
                  )}
            </div>
            {!isLoadingAll && availablePrograms?.length === 0 && (
              <p className="text-center mt-6">
                No available welfare programs at the moment.
              </p>
            )}
          </TabsContent>
          {/* Enrolled programs */}
          <TabsContent value="enrolled">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoadingEnrolled
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-2/3 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))
                : enrolledPrograms?.map(
                    (enrollment: Enrollments, index: number) => (
                      <AnimatedWelfareCard
                        key={enrollment.id}
                        program={enrollment.welfareProgram}
                        status={enrollment.status}
                        index={index}
                        isEnrolled={true}
                      />
                    )
                  )}
            </div>
            {!isLoadingEnrolled && enrolledPrograms?.length === 0 && (
              <p className="text-center mt-6">
                You are not enrolled in any welfare programs.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
