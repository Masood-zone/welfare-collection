import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welfare Collection System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our software is aimed at providing a centralized, easy-to-approach
            system with ease of accountability between collectors and payers
            across religious organizations, groups, companies, and more.
          </p>
          <h2 className="text-xl font-semibold mb-2">Our Focus</h2>
          <p className="mb-4">
            We strive to simplify the process of welfare collection and
            distribution, making it more transparent and efficient for all
            parties involved.
          </p>
          <h2 className="text-xl font-semibold mb-2">Our Outreach</h2>
          <p>
            We are planning to onboard the Ahmadiyya Muslim Community Ghana to
            this application, solidifying our presence as a religious body
            across the globe. This partnership will serve as a stepping stone
            for expanding our services to other communities and organizations
            worldwide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
