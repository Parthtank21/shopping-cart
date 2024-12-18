import AddProductForm from "@/components/forms/AddProductForm";
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">Add Product</h1>
        <p>Please fill in all the details and submit.</p>
      </div>
      <div className="flex justify-center">
        <Card className="w-[500px]">
          <CardContent className="p-6">
            <AddProductForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
