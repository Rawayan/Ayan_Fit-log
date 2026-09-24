import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">FitLog</h1>

          <p className="mt-2 text-gray-600">
            Component architecture is ready.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>Strength</Badge>
            <Badge>Gym</Badge>
          </div>

          <div className="mt-6 flex gap-3">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}