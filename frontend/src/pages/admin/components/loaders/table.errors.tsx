import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableError({ error }: { error: ErrorResponse }) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead colSpan={4} className="h-10 px-4">
              There was an Error!!
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-2">Error</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2">{error?.status}</TableCell>
            <TableCell className="px-4 py-2">{error?.message}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
