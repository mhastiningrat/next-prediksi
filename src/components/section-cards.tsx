import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CardSkeleton from "./card-skeleton"
import { formatRupiah } from "@/utils/format"

type DataCardResponse = {
  total_platform : number;
  total_pengguna : number;
  total_naik : number;
  total_rekomendasi: number;
};

type SectionCardType =  {
  loading: boolean
  data: DataCardResponse[];
}

export function SectionCards({loading,data}:SectionCardType) {

  console.log({data})
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {loading ? <CardSkeleton/> : (<Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Plafon</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(data[0]?.total_platform || 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Trending up this month <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            {/* Visitors for the last 6 months */}
          </div>
        </CardFooter>
      </Card>)}
      
      {loading ? <CardSkeleton/> : (
        <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pengguna</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data[0]?.total_pengguna || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Down 20% this period <IconTrendingDown className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            {/* Acquisition needs attention */}
          </div>
        </CardFooter>
      </Card>
      )}
      
      {loading ? <CardSkeleton/> : (
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rekomendasi Naik</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data[0]?.total_naik || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Strong user retention <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            {/* Engagement exceed targets */}
            </div>
        </CardFooter>
      </Card>)}
      
      {loading ? <CardSkeleton/> : (
        <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Plafon Naik</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(data[0]?.total_rekomendasi || 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Steady performance increase <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            {/* Meets growth projections */}
            </div>
        </CardFooter>
      </Card>
      )}
      
    </div>
  )
}
