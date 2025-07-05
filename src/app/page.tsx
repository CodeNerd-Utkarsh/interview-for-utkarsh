import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLaunches } from "@/services/spacex";

const SpaceXLogo = () => (
  <svg
    className="h-8 w-auto"
    viewBox="0 0 260 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_1052)">
      <path
        d="M60.5949 11.8312H38.61L37.7954 12.4402V31.9945H43.8814V24.6617L44.4623 24.1413H60.5957C64.6692 24.1413 66.579 23.0455 66.579 20.2339V15.7441C66.5782 12.9278 64.6692 11.8312 60.5949 11.8312ZM60.5949 19.0605C60.5949 20.3851 59.7184 20.6603 57.8087 20.6603H44.529L43.8806 20.0301V15.8413L44.4615 15.3098H57.8087C59.7184 15.3098 60.5949 15.5818 60.5949 16.9128V19.0605Z"
        fill="#005288"
      />
      <path
        d="M77.6768 15.5301L82.9138 23.2015L82.6237 23.9445H71.0421L68.0857 27.5808H85.3253L86.52 28.3082L89.1965 31.9992H96.1613L80.895 11.5811"
        fill="#005288"
      />
      <path
        d="M146.931 28.0275V22.6003L147.557 22.0594H159.208V18.6035H140.742V31.9984H167.982V28.559H147.584"
        fill="#005288"
      />
      <path
        d="M168.27 11.8312H140.742V15.6312H168.27V11.8312Z"
        fill="#005288"
      />
      <path
        d="M110.039 15.4297H132.216C131.875 12.6103 130.125 11.828 125.686 11.828H109.803C104.795 11.828 103.197 12.8055 103.197 16.5953V27.228C103.197 31.0218 104.795 31.9992 109.803 31.9992H125.686C130.19 31.9992 131.915 31.1534 132.032 28.229H110.039L109.387 27.6152V15.8405"
        fill="#005288"
      />
      <path
        d="M22.9963 19.6883H6.86295L6.38787 19.1655V15.7151L6.8606 15.3498H28.6096L28.9067 14.6232C28.1659 12.7177 26.2475 11.8288 22.6851 11.8288H7.57715C2.57149 11.8288 0.971397 12.8063 0.971397 16.5961V18.8253C0.971397 22.6199 2.57149 23.5957 7.57715 23.5957H23.6745L24.1801 24.0394V27.6466L23.7678 28.2094H5.35459V28.1921H0.531588C0.531588 28.1921 -0.0203295 28.4688 0.000837798 28.5982C0.412424 31.2491 2.2187 32 6.54309 32H22.9963C28.0012 32 29.6491 31.0226 29.6491 27.2288V24.4517C29.6491 20.6642 28.0012 19.6883 22.9963 19.6883Z"
        fill="#005288"
      />
      <path
        d="M185.586 11.7481H176.53L176.039 12.6832L186.096 20.0128C188.001 18.91 190.074 17.7922 192.328 16.6894"
        fill="#005288"
      />
      <path
        d="M193.7 25.5553L202.54 32H211.706L212.085 31.1464L198.886 21.4872C197.133 22.7735 195.401 24.1319 193.7 25.5553Z"
        fill="#005288"
      />
      <path
        d="M184.238 31.9851H176.045L175.353 30.9011C180.924 25.5232 205.84 2.46986 260 0C260 0 214.54 1.53318 184.238 31.9851Z"
        fill="#A7A9AC"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_1052">
        <rect width="260" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function getLaunchStatus(launch) {
  if (launch.upcoming) {
    return { text: "Upcoming", variant: "upcoming" };
  }
  if (launch.success) {
    return { text: "Success", variant: "success" };
  }
  return { text: "Failed", variant: "destructive" };
}

export default async function Home({
  searchParams,
}) {
  const page = Number(searchParams?.page) || 1;
  const launchData = await getLaunches({ page, limit: 12 });

  const renderPagination = () => {
    const items = [];
    const currentPage = launchData.page;
    const totalPages = launchData.totalPages;

    if (launchData.hasPrevPage) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious href={`/?page=${launchData.prevPage}`} />
        </PaginationItem>
      );
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={`/?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/?page=${i}`} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`/?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (launchData.hasNextPage) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext href={`/?page=${launchData.nextPage}`} />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center items-center py-8 border-b">
        <SpaceXLogo />
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Past 6 Months
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Past Day</DropdownMenuItem>
                  <DropdownMenuItem>Past Week</DropdownMenuItem>
                  <DropdownMenuItem>Past Month</DropdownMenuItem>
                  <DropdownMenuItem>Past 6 Months</DropdownMenuItem>
                  <DropdownMenuItem>Past Year</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex gap-2">
                    <ListFilter className="h-4 w-4" />
                    All Launches
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Launches</DropdownMenuItem>
                  <DropdownMenuItem>Successful</DropdownMenuItem>
                  <DropdownMenuItem>Failed</DropdownMenuItem>
                  <DropdownMenuItem>Upcoming</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">No:</TableHead>
                      <TableHead>Launched (UTC)</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Mission</TableHead>
                      <TableHead>Orbit</TableHead>
                      <TableHead>Launch Status</TableHead>
                      <TableHead>Rocket</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {launchData.docs.map((launch) => {
                      const status = getLaunchStatus(launch);
                      const formattedDate = new Date(
                        launch.date_utc
                      ).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                        hour12: false,
                      });

                      return (
                        <TableRow key={launch.flight_number}>
                          <TableCell>{launch.flight_number}</TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>{launch.launchpad.name}</TableCell>
                          <TableCell>{launch.name}</TableCell>
                          <TableCell>
                            {launch.payloads[0]?.orbit || "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.text}</Badge>
                          </TableCell>
                          <TableCell>{launch.rocket.name}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>{renderPagination()}</PaginationContent>
              </Pagination>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
