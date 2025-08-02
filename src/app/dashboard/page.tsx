"use client";

import { AppSidebar } from "@/components/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FilterIcon, SearchIcon } from "lucide-react";

// import datas from "./data.json"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type prediksiResponse = {
    id: number;
    cust_no: string;
    total_cair: number;
    rata_rata_penggunaan: number;
    rasio_telat: number;
    total_transaksi: number;
    plafon_sekarang: number;
    rekomendasi: string;
    plafon_rekomendasi: number;
    tanggal_trans_terakhir: string;
};

type analyticResponse = {
    id:number;
    no_trans_lending:string;
    cust_no:string;
    plafon:number;
    total_cair:number;
    biaya_admin:number;
    tanggal_trans:string;
    tanggal_jttmp:string;
    total_bayar:number;
    tanggal_bayar:string;
};

type dataCardResponse = {
    total_platform: number;
    total_pengguna: number;
    total_naik: number;
    total_rekomendasi: number;
};

export default function Page() {
    useEffect(() => {
        if (!localStorage.getItem("on")) redirect("/");
    }, []);

    const [data, setData] = useState<prediksiResponse[]>([]);
    const [dataAnalytic, setDataAnalytic] = useState<analyticResponse[]>([]);
    const [custNo, setCustNo] = useState<string>("");
    const [dataCard, setDataCard] = useState<dataCardResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let url = "rekomendasi-plafon";

            if(custNo !== "") url = url+"?cust_no="+custNo

            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + url
            );
            const result = await res.json();
            console.log(result);
            setData(result);

            let total_platform = 0;
            const total_pengguna = result.length;
            const total_naik = result.filter((i: prediksiResponse) =>
                i.rekomendasi.toLowerCase().includes("naik")
            ).length;
            let total_rekomendasi = 0;

            for (const i of result as prediksiResponse[]) {
                total_platform += i.total_cair;
                total_rekomendasi += i.plafon_rekomendasi;
            }

            setDataCard([
                {
                    total_platform,
                    total_pengguna,
                    total_naik,
                    total_rekomendasi,
                },
            ]);

            setIsLoading(false);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const fetchDataAnalytic = async () => {
        try {
            setIsLoading(true);
            let url = "analytic";

            if(custNo !== "") url = url+"?cust_no="+custNo

            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + url
            );
            const result = await res.json();
            console.log(result);
            setData(result);

            let total_platform = 0;
            const total_pengguna = result.length;
            const total_naik = result.filter((i: prediksiResponse) =>
                i.rekomendasi.toLowerCase().includes("naik")
            ).length;
            let total_rekomendasi = 0;

            for (const i of result as prediksiResponse[]) {
                total_platform += i.total_cair;
                total_rekomendasi += i.plafon_rekomendasi;
            }

            setDataCard([
                {
                    total_platform,
                    total_pengguna,
                    total_naik,
                    total_rekomendasi,
                },
            ]);

            setIsLoading(false);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    useEffect(() => {
        // fetchData()
        console.log(data);
    }, []);

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards loading={isLoading} data={dataCard} />
                            <div className="px-4 lg:px-6">
                                {/* <ChartAreaInteractive /> */}
                            </div>
                            <div className="px-4 lg:px-6 flex justify-end">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="size-4 sm:flex hover:cursor-pointer">
                                            <FilterIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="leading-none font-medium">
                                                    Find Data Customer By
                                                </h4>
                                                <p className="text-muted-foreground text-sm"></p>
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="width">
                                                        Customer Id
                                                    </Label>
                                                    <Input
                                                        id="width"
                                                        defaultValue=""
                                                        className="col-span-2 h-8"
                                                        onChange={(e)=>setCustNo(e.target.value)}
                                                    />
                                                    <Button
                                                        size="default"
                                                        className=" sm:flex hover:cursor-pointer"
                                                        onClick={() =>
                                                            fetchData()
                                                        }>
                                                        <SearchIcon /> Find
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {isLoading ? (
                                <TableSkeleton />
                            ) : (
                                <DataTable data={data} />
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
